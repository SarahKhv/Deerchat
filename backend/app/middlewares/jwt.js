const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

// JWT KEY OBJECT
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

// MIDDLEWARE for finding the user with given JWT token
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            // Find user in DB given an id found in the JWT token
            User.findById(jwt_payload.id)
                .then(user => {
                    // if a user is found return the user
                    if (user) return done(null, user);
                    // otherwise return false
                    return done(null, false);
                })
                .catch(err => {
                    return done(err, false, {message: err.message});
                });
        })
    );
};