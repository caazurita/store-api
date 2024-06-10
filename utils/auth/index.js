const passport = require('passport');

const localStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');


passport.use(JwtStrategy);
passport.use(localStrategy);
