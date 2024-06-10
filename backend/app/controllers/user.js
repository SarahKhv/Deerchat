const User = require('../models/user');
const { sendEmail } = require('../utils/index');

// GET route for returing all users
exports.index = async function (req, res) {
    // Get all users
    const users = await User.find({});
    res.status(200).json({users});
};

// POST route for storing an user as an admin
exports.store = async (req, res) => {
    try {
        // Get email from body
        const {email} = req.body;

        // Get the user from the DB given email
        const user = await User.findOne({email});

        // Return if the user already exists
        if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account. You can change this users role instead.'});

        // Generate a random password
        const password = '_' + Math.random().toString(36).substr(2, 9);

        // Create a new user
        const newUser = new User({email, password});

        // Save user to DB
        const user_ = await newUser.save();

        // Generate and send a password reset link and email
        user_.generatePasswordReset();

        // Save the updated user object to the DB
        await user_.save();

        // Email data
        let domain = "http://" + req.headers.host;
        let subject = "New Account Created";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
        let html = `<p>Hi ${user.username}<p><br><p>A new account has been created for you on ${domain}. Please click on the following <a href="${link}">link</a> to set your password and login.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`

        // Send email
        await sendEmail({to, from, subject, html});

        res.status(200).json({message: 'An email has been sent to ' + user.email + '.'});

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// GET Route getting a specific user
exports.show = async function (req, res) {
    try {
        // Get id from the parameters 
        const { id } = req.params;

        // Get the user from DB with given id
        const user = await User.findById(id);

        // Return if user DNE with given id
        if (!user) return res.status(401).json({message: 'User does not exist'});

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};