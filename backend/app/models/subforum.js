const mongoose = require('mongoose');

// Subforum Schema: Structure of a typical subforum
const SubforumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 200,
        trim: true,
    }, 
    // the actual post
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    // threads on the subforum
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thread',
    }],
    // users who have joined the subforum
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    // users who have hidden the subforum
    hidden: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    // users who have been banned from the subforum
    banned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
} , {timestamps: true});

// export subforum model
module.exports = mongoose.model('subforum', SubforumSchema);
