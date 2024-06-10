const express = require('express');

const Subforum = require('../controllers/subforum');

const router = express.Router();

router.get('/', (req, res) => { 
    res.status(200).json({message: "This is subforum endpoint"});
});

// post subforum route
router.post('/post', Subforum.createSubforum);

// get subforums route
router.get('/posts', Subforum.getSubforums);

// // post comment route
// router.post('/post/:id/comment', Subforum.createComment);

// // get comments route
// router.get('/post/:id/comments', Subforum.getComments);

// post subscriber route
router.post('/post/:id/sub', Subforum.toggleSubscriber);

// post hidden route
router.post('/post/:id/hide', Subforum.toggleHidden);

// post banned route
router.post('/post/:id/ban', Subforum.toggleBan);

// get subforum given name route
router.get("/:name", Subforum.getSubforum)

module.exports = router;