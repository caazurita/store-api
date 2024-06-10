const jwt = require('jsonwebtoken');

//secret key unicamente generado desde el .env
const secret = 'my_secrext';
const options = { expiresIn: '1d' };
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzE3NzA3ODc0fQ.aU3DIrqp_pF_OZjgtlPNljdGbkxFvl8RHx_jYQM7CLQ"

function verifyToken(token, secret){

    return jwt.verify(token, secret);
}
const payload = verifyToken(token, secret)
console.log(payload)
