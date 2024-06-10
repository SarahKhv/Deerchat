const passport = require("passport");

// MIDDLEWARE for authenticating the JWT token
module.exports = (req, res, next) => {
    // Authenticate JWT token
    passport.authenticate('jwt', function(err, user, info) {
        // Return if err
        if (err) return next(err);

        // Return if user DNE with given a JWT token
        if (!user) return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});
 
        // Create a user object and return the user
        req.user = user;

        next();

    })(req, res, next);
};