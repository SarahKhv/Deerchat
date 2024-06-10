const express = require('express');

const Thread = require('../controllers/thread');

const router = express.Router();

router.get('/', (req, res) => { 
    res.status(200).json({message: "This is thread endpoint"});
});

// post thread route
router.post('/post', Thread.createThread);

// get thread route
router.get('/post/:id', Thread.getThread);

// post comment route
router.post('/post/:id/comment', Thread.createComment);

// get comments route
router.get('/post/:id/comments', Thread.getComments);

// get thread and like 
router.post('/post/:id/like', Thread.like);

// get thread and dislike 
router.post('/post/:id/dislike', Thread.dislike);

// get thread and heart 
router.post('/post/:id/heart', Thread.heart);

// get thread and vomit 
router.post('/post/:id/vomit', Thread.vomit);

// get thread and cry 
router.post('/post/:id/cry', Thread.cry);

// get thread and un-like 
router.post('/post/:id/unlike', Thread.unlike);

// get thread and un-dislike 
router.post('/post/:id/undislike', Thread.undislike);

// get thread and un-heart 
router.post('/post/:id/unheart', Thread.unheart);

// get thread and un-vomit 
router.post('/post/:id/unvomit', Thread.unvomit);

// get thread and un-cry 
router.post('/post/:id/uncry', Thread.uncry);




module.exports = router;