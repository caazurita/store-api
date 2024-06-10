const jwt = require('jsonwebtoken');

//secret key unicamente generado desde el .env
const secret = 'my_secret';
const options = { expiresIn: '1d' };
const payload = {
  sub: '1',
  name: 'John Doe',
}

const signToken = (payload, secret) => {

    return jwt.sign(payload, secret);
}
const verifyToken = signToken(payload, secret)
console.log(verifyToken)
