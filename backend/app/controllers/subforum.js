const Subforum = require('../models/subforum');
const User = require('../models/user');
const Thread = require('../models/thread');

// POST Request for creating a brand new subforum
exports.createSubforum = async (req, res) => {
    try {
        // Create new subforum Object
        const newSubforum = new Subforum({
            title: req.body.title,
            description: req.body.description
        });
        // Save subforum object to mongoDB
        const subforum_ = await newSubforum.save();
        // res.json(subforum_);
        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};


// GET request for getting all subforum
exports.getSubforums = async (req, res) => {
    try {
        // Find all subforums in the DB 
        const subforums = await Subforum.find();
        // Return the subforums as a json
        res.json(subforums);
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// GET request for getting a specific subforum given an name
exports.getSubforum = async (req, res) => {
    try {
        const { name } = req.params;
        var subforum = await Subforum.find({ title: name });
        if (subforum[0].title === name) {
            const data = {
                _id: subforum[0]._id,
                title: subforum[0].title,
                createdAt: subforum[0].createdAt,
                updatedAt: subforum[0].updatedAt,
                threads: [],
                description: subforum[0].description
            }
            for (var thread of subforum[0].threads){
                var t = await Thread.findById(thread.toString()).lean().exec();
                t['image'] = "https://picsum.photos/720/720";
                data.threads.push(t);
            }
            res.json(data);
        }
        else {
            res.status(500).json({success: false, message: `There does not exist a subforum with name ${req.body.subforum}`})
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

// POST Request for togglign a subscriber to a subforum
exports.toggleSubscriber = async (req, res) => {
    try {
        // Retrieve id from given parameters
        const { id } = req.params;
        // Get Subforum from database
        const subforum = await Subforum.findById(id);
        // Get user from given parameters
        const user = await User.findById(req.user._id.toString());
        // Unsubscribe the user if they are already subscribed
        for (var i = subforum.subscribers.length; i--;) {

            if (subforum.subscribers[i].toString() === user._id.toString()) {
                subforum.subscribers.splice(i, 1);
                subforum.save();
                res.status(200).end();
                return;
            }
        }
        // Check if user is banned from subforum
        if (subforum.banned.indexOf(user._id.toString()) == -1) {
            // Insert subscriber to subscriber list
            subforum.subscribers.push(user);
        } else {
            res.status(400).end();
            return;
        };
        subforum.save();
        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// POST Request for toggling a user from being hidden from a subforum
exports.toggleHidden = async (req, res) => {
    try {
        // Retrieve id from given parameters
        const { id } = req.params;
        // Get Subforum from database
        const subforum = await Subforum.findById(id);
        // Get user from given parameters
        const user = await User.findById(req.user._id.toString());
        // Check if user is banned from subforum
        if (subforum.banned.indexOf(user._id.toString()) == -1) {
            // Unhide the user from subform if already marked as hidden
            for (var i = subforum.hidden.length; i--;) {
                if (subforum.hidden[i].toString() === user._id.toString()) {
                    subforum.hidden.splice(i, 1);
                    subforum.save();
                    res.status(200).end();
                    return;
                }
            }
            // Insert user to hidden list
            subforum.hidden.push(user);
            subforum.save();
            res.status(200).end();
            return;
        };
        res.status(400).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// POST Request for toggling a user from being banned from a subforum
exports.toggleBan = async (req, res) => {
    try {
        // Retrieve id from given parameters
        const { id } = req.params;
        // Get Subforum from database
        const subforum = await Subforum.findById(id);
        // Get user from given parameters
        const user = await User.findById(req.user._id.toString());
        // Check if user is banned from subforum
        if (subforum.banned.indexOf(user._id.toString()) != -1) { // they are banned
            // Unban user from subforum
            for (var i = subforum.banned.length; i--;) {
                if (subforum.banned[i].toString() === user._id.toString()) {
                    subforum.banned.splice(i, 1);
                    subforum.save();
                    res.status(200).end();
                    return;
                }
            }
        }
        // Unsubscribe user from subforum if they are subscribed already
        for (var i = subforum.subscribers.length; i--;) {
            if (subforum.subscribers[i].toString() === user._id.toString()) {
                subforum.subscribers.splice(i, 1);
            }
        }
        // Insert user to banned list
        subforum.banned.push(user);
        subforum.save();
        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};