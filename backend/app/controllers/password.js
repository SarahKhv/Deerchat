const User = require('../models/user');
const { sendEmail } = require('../utils/index');

// POST route to create a password reset link
exports.recover = async (req, res) => {
    try {
        // Get email from the body
        const { email } = req.body;

        // Get user from DB given email
        const user = await User.findOne({ email });

        // Return if user DNE with given email
        if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

        // Generate and set password reset token
        user.generatePasswordReset();

        // Save the updated user object
        await user.save();

        // email data
        let subject = "Password change request";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
        let html = `<p>Hi ${user.username}</p>
                    <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

        // Send email
        await sendEmail({to, from, subject, html});

        res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// GET route to reset a password
exports.reset = async (req, res) => {
    try {
        // Get token from the parameters
        const { token } = req.params;

        // Get user from DB given a token
        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});

        // Return if user DNE given token
        if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

        // Redirect user to form with the email address
        res.render('reset', {user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// POST route for resetting password
exports.resetPassword = async (req, res) => {
    try {
        // Get token from the parameters 
        const { token } = req.params;

        // Get user from DB given a token
        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});

        // Return if user DNE given token
        if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

        // Update user password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.isVerified = true;

        // Save the updated user
        await user.save();

        // Email data
        let subject = "Your password has been changed";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let html = `<p>Hi ${user.username}</p>
                    <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`

        // Send email
        await sendEmail({to, from, subject, html});

        res.status(200).json({message: 'Your password has been updated.'});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};