const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const bcrypt = require('bcrypt');
const UserService = require('./users.service');
const nodemailer = require("nodemailer");
const { use } = require('passport');

const service = new UserService();


class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;
    return user;
  }

  async signToken(user) {

    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = await jwt.sign(payload, config.jwtSecret);

    return {
      user,
      token
    }

  }

  async senPasswordRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '10m' });
    const url = `http://localhost:3000/recovery?${token}`

    await service.update(user.id, {
      recoveryToken: token
    })
    // send mail with defined transport object
    const info = {
      from: '<carlosaazurita@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Reset Password", // Subject line
      html: `<b>Hello ${user.name}, ingresa a este link para reestablecer tu password: <a href="${url}">${url}</a></b>`, // html body
    };
    const res = await this.sendEmail(info)
    return res
  }

  async senEmailRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'carlosaazurita@gmail.com',
        pass: 'xsqu vsmy thaa ryqw'
      }
    });


    // send mail with defined transport object
    const info = {
      from: '"Maddison Foo Koch 👻" <carlosaazurita@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: `Hola ${user.name}`, // plain text body
      html: "<b>Hello world?</b>", // html body
    };


    this.sendEmail(info)

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return {
      message: "email sent successfully"
    }
  }

  async changePassword(token, newPassword) {
    try{
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub)
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: hash
      })
      return {
        message: "password changed successfully"
      }

    }catch(error){
      throw boom.unauthorized();
    }

  }
  async sendEmail(emailInfo) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'carlosaazurita@gmail.com',
        pass: 'xsqu vsmy thaa ryqw'
      }
    });


    // send mail with defined transport object
    const info = await transporter.sendMail(emailInfo);
    return {
      message: "email sent successfully"
    }
  }



}
module.exports = AuthService
