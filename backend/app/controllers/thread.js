const Thread = require('../models/thread');
const Comment = require('../models/comment');
const Subforum = require('../models/subforum');
const { CommandFailedEvent } = require('mongodb');

// POST Request for creating a brand new thread
exports.createThread = async (req, res) => {
    try {
        // Create new thread Object
        const newThread = new Thread({
            title: req.body.title,
            body: req.body.body,
            subforum: req.body.subforum
          });

          // Check if subforum exists
          const subforum = await Subforum.find({ title: req.body.subforum });
          if (subforum[0].title === req.body.subforum) {
            // Save thread object to mongoDB
            const thread_ = await newThread.save();

            // Set thread object username, to admin for now
            newThread.setUsername(req.user.email);

            const randomColour = Math.floor(Math.random()*16777215).toString(16);
            newThread['colour'] = "#" + randomColour;
            
            // Save new version of thread
            await thread_.save();

            // Append the thread to its subforum
            subforum[0].threads.push(thread_);

            subforum[0].save();

            res.status(200).end();
          }
          else {
              res.status(500).json({success: false, message: `There does not exist a subforum with name ${req.body.subforum}`})
          }
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// GET request for getting a thread given a ThreadID
exports.getThread = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given ID
        const thread = await Thread.findById(id).lean().exec();

        var comments = [];
        for (var com of thread.comments){
            var c = await Comment.findById(com.toString()).lean().exec();
            comments.push(c);
        }
        thread.comments = comments;
        // Return the thread as a json
        res.json(thread);
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// POST Request for creating a brand new comment under a thread
exports.createComment = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);
        // Create a comment Object
        const newComment = new Comment({
            body: req.body.body,
            threadID: req.params.id
        });
        // Save comment object to DB
        const comment_ = await newComment.save();

        var threadAuthor = thread['username'];
        var threadAuthorColour = thread['colour'];

        var commentors = thread['user_colours'];
        var exists = false;
        var email = req.user.email;
        var color = "";

        if (email !== threadAuthor){
            // check if user has commented before
            for (var i=0; i < commentors.length; i++){
                if (commentors[i][email]){
                    exists = true;
                    color = commentors[i][email];
                }
            }
            if (exists){
                // set the username to their colour
                newComment.setUsername(color);
            }
            else {
                // create a random colour
                const randomColour = Math.floor(Math.random()*16777215).toString(16);
                var insert = {};
                insert[email] = '#' + randomColour;
                commentors.push(insert);
                // Set comment object username
                newComment.setUsername('#' + randomColour);
            }
        }
        else {
            var insert = {};
            insert[threadAuthor] = threadAuthorColour;
            commentors.push(insert);
            newComment.setUsername(threadAuthorColour);
        }

        // Save new version of thread
        comment_.save();

        // Append the newly created comment to the comment attribute of the Threads
        thread.comments.push(newComment);

        // Save the new thread object
        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// GET request for getting the comments under a Thread
exports.getComments = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);
        // Return the thread's comments as a json
        
        var comments_as_json = [];
        for (var i = 0; i < thread.comments.length; i++){
            const c = await Comment.findById(thread.comments[i].toString());
            comments_as_json.push(c);
        }
        res.json({'threadID': id, 'comments' : comments_as_json});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.like = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

        // Add a like
        var likes = thread['likes'];
        thread['likes'] = likes + 1;
        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.dislike = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

        // Add a dislike
        var dislikes = thread['dislikes'];
        thread['dislikes'] = dislikes + 1;
        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.heart = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

        // Add a heart
        var hearts = thread['hearts'];
        thread['hearts'] = hearts + 1;
        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.vomit = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

        // Add a vomit
        var vomit = thread['vomit'];
        thread['vomit'] = vomit + 1;
        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.cry = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

       
        // Add a cry
        var crying = thread['crying'];
        thread['crying'] = crying + 1;     

        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.unlike = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

        // Add an unlike
        var likes = thread['likes'];
        thread['likes'] = likes - 1;
        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.undislike = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

        // Add an undislike
        var dislikes = thread['dislikes'];
        thread['dislikes'] = dislikes - 1;
        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.unheart = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

        // Add an unheart
        var hearts = thread['hearts'];
        thread['hearts'] = hearts - 1;
        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.unvomit = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

        // Add an unvomit
        var vomit = thread['vomit'];
        thread['vomit'] = vomit - 1;

        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.uncry = async (req, res) => {
    try {
        // Get the id from the parameters
        const { id } = req.params;
        // Find the thread in the DB given id
        const thread = await Thread.findById(id);

        // Add an uncry
        var crying = thread['crying'];
        thread['crying'] = crying - 1;
        thread.save();

        res.status(200).end();
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};