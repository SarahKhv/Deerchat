const mongoose = require('mongoose');

// Thread Schema: Structure of a typical thread
const ThreadSchema = mongoose.Schema({
    // need a title for the schema
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    // usernames are used to display and store
    username: {
        type: String,
        trim: true,
    },
    // the subforum is required to store for database purposes
    subforum: {
        // string because no subforum yet
        type: String,
        required: true,
    },
    // the actual post
    body: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    hearts: {
        type: Number,
        default: 0
    },
    vomit: {
        type: Number,
        default: 0
    },
    crying: {
        type: Number,
        default: 0
    },
    colour: {
        type: String
    },
    user_colours: [{
        type: Object
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    }]
    // timestamp
}, {timestamps: true});

  // used for endpoints
  ThreadSchema.methods.setUsername = function(JWT){
    this.username = JWT;
    return; 
    // let payload = parseJwt(JWT);
    // let email = payload.email;
    // this.username = email;
}

// req is a json object
ThreadSchema.methods.addComment = function(req){
    var username = getUserID(req.token);
    if (!username == null){
        // create comment object

        // add new comment
        this.comments.push()
    }
}


module.exports = mongoose.model('thread', ThreadSchema);