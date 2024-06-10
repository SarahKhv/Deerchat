const mongoose = require('mongoose');

// Comment Schema: Structure of a typical comment
const CommentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
        maxLength: 2000,
        trim: true,
    },
    username: {
        type: String,
        required: false,
        default: "admin",
    },
    upvotes: {
        type: Number,
        required: false,
        default: 0,
    },
    downvotes: {
        type: Number,
        required: false,
        default: 0,
    },
    threadID: {
        type: String,
        required: true,
    },
}, {timestamps: true});

// schema method to increment upvote count
CommentSchema.methods.incrementUpvotes = function() {
    this.upvotes += 1;
    // return this.upvotes;
}

// schema method to increment downvote count
CommentSchema.methods.incrementDownvotes = function() {
    this.downvotes += 1;
    // return this.downvotes;
}

// schema method to assign user JWT to comment username
CommentSchema.methods.setUsername = function(JWT) {
    this.username = JWT;
    return; 
    // let payload = parseJwt(JWT);
    // let email = payload.email;
    // this.username = email;
}

// obtained from SO thread:
// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// export comment model
module.exports = mongoose.model('comment', CommentSchema);
