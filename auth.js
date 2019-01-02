const passport = require('passport')
const passportJWT = require('passport-jwt')
const cfg = require('./config')
const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const users = require('./users')
const params = {
  secretOrKey: cfg.auth.key,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const init = () => {
  const strategy = new Strategy(params, function (payload, done) {
    console.log(payload);
    const user = users.find(v => v.id === payload.id)
    if (user) {
      const { id, name } = user;
      return done(null, { id, name });
    } else {
      return done(new Error('user not found'));
    }
  })

  passport.use(strategy)

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  return passport.initialize()
}

const authenticate = () => {
  return passport.authenticate('jwt', cfg.auth.session)
}

module.exports = {init, authenticate}
