const User = require('../models/user');
const Token = require('../models/token');
const {sendEmail} = require('../utils/index');

// POST route for registering a user
exports.register = async (req, res) => {
    try {
        // Get the email from the body
        const { email } = req.body;

        const user = await User.findOne({ email });

        // Return if the email already exists within the DB
        if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account.'});

        // Create a new user model object
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
        });

        // Save the user to the DB
        const user_ = await newUser.save();

        // Send the user an email asking them to verify their email
        await sendVerificationEmail(user_, req, res);

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// POST route for logging in a user
exports.login = async (req, res) => {
    try {
        // Get the email and password from the body
        const { email, password } = req.body;

        // Find the user object from the DB with the email as the key
        const user = await User.findOne({ email });

        // Return if the email DNE in the DB
        if (!user) return res.status(401).json({msg: 'The email address ' + email + ' is not associated with any account. Double-check your email address and try again.'});

        // Return if the email/password is incorrect
        if (!user.comparePassword(password)) return res.status(401).json({message: 'Invalid email or password'});

        // Return if the account does not have a verified email address
        if (!user.isVerified) return res.status(401).json({ type: 'not-verified', message: 'Your account has not been verified.' });

        // Generate a JWT 
        res.status(200).json({token: user.generateJWT(), user: user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


// Method for verifying a user
exports.verify = async (req, res) => {
    // Return if no token is provided
    if(!req.params.token) return res.status(400).json({message: "We were unable to find a user for this token."});

    try {
        // Find the token object
        const token = await Token.findOne({ token: req.params.token });

        // Return if token DNE in the DB
        if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token may have expired.' });

        // Get the user object given a token
        User.findOne({ _id: token.userId }, (err, user) => {
            // Return if user DNE in the DB given the token
            if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });

            // Return if the user is already verified
            if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) return res.status(500).json({message:err.message});

                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// Method for resending a token
exports.resendToken = async (req, res) => {
    try {
        // Get the email from the body
        const { email } = req.body;

        // Get the user object given email
        const user = await User.findOne({ email });

        // Return if there is no user with said email
        if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

        // Return if the user is already verified
        if (user.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.'});

        // Send verification email
        await sendVerificationEmail(user, req, res);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// Method to send the verification email
async function sendVerificationEmail(user, req, res){
    try{
        // Generate a verification token
        const token = user.generateVerificationToken();

        // Save the verification token
        await token.save();

        // Email data
        let subject = "Account Verification Token";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link="http://"+req.headers.host+"/auth/verify/"+token.token;
        let html = `<p>Hi User<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p>
                    <br><p>If you did not request this, please ignore this email.</p>`;

        // Send the email
        await sendEmail({to, from, subject, html});

        res.status(200).json({message: 'A verification email has been sent to ' + user.email + '.'});
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}
