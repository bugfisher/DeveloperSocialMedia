const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const User = require('../../models/Users');
const Post = require('../../models/Posts');

//  @route    POST /api/posts
//  @desc     Add a post
//  @access   private

router.post('/',[ auth , [ 
    check('text','Text is required').not().isEmpty()
]],async (req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({error:errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newpost = new Post({
            user:req.user.id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar
        });

        const post = await newpost.save();

        res.json(post);



        
    } catch (err) {
        if(err)
        {
            console.log(err.message);
            res.status(400).send('Server Error');
        }
    }
});

//  @route    GET /api/posts
//  @desc     Get all posts
//  @access   private

router.get('/',auth,async (req,res)=>{

    try {

        const posts = await Post.find().sort({date:-1});

        res.json(posts);
        
    } catch (err) {
        if(err)
        {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
        
    }

});


//  @route    GET /api/posts/:id
//  @desc     Get post by id
//  @access   private

router.get('/:id',auth,async (req,res)=>{

    try {

        const post = await Post.findById(req.params.id);

        if(!post)
        {
            return res.status(400).json({msg:'No post found'});
        }

        res.json(post);
        
    } catch (err) {
        if(err)
        {
            console.log(err.message);
            if(err.kind === 'ObjectId')
            {
                return res.status(400).json({msg:'No post found'});
            }
            res.status(500).send('Server Error');
        }
        
    }

});

//  @route    Delete /api/posts/:id
//  @desc     Delete post by id
//  @access   private

router.delete('/:id',auth,async (req,res)=>{

    try {

        const post = await Post.findById(req.params.id);

        if(!(post.user.toString() === req.user.id))
        {
            return res.status(404).json({msg:'User not authorized'});
        }

        await post.remove();

        res.json({msg:'Post Removed'});
        
    } catch (err) {

        if(err)
        {
            console.log(err.message);
            res.status(400).msg('Server Error');
        }
        
    }
});

//  @route    PUT /api/posts/likes/:id
//  @desc     Add like by user
//  @access   private

router.put('/like/:id',auth,async (req,res)=>{

    try {

        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id ).length > 0)
        {
            return res.status(400).json({msg:'Post Already Liked'});
        }

        post.likes.unshift({
            user:req.user.id
        });

       await post.save();

       res.json(post.likes);


        
    } catch (err) {
    

        if(err)
        {
            console.log(err.message);
           // return res.status(400).send('Server Error');
        }
        
    }
});


//  @route    PUT /api/posts/unlikes/:id
//  @desc     Remove like by user
//  @access   private

router.put('/unlike/:id',auth,async (req,res)=>{

    try {

        

        const post = await Post.findById(req.params.id);

        // Check if the post has not yet been liked
        if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        const removeindex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeindex,1);

        

       await post.save();

       res.json(post.likes);


        
    } catch (err) {
    

        if(err)
        {
            console.log(err.message);
           // return res.status(400).send('Server Error');
        }
        
    }
});

//  @route    POST /api/posts/comment/:id
//  @desc     Add a comment by user
//  @access   private


router.post('/comment/:id',[ auth , [ 
    check('text','Text is required').not().isEmpty()
]],async (req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({error:errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text : req.body.text,
            user : req.user.id,
            avatar : user.avatar,
            name : user.name

        }

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);

        



        
    } catch (err) {
        if(err)
        {
            console.log(err.message);
            res.status(400).send('Server Error');
        }
    }
});



//  @route    Delete /api/posts/comment/:post_id/:comment_id
//  @desc     Delete comment
//  @access   private

router.delete('/comment/:post_id/:comment_id',auth,async (req,res)=>{

    try {

        const post = await Post.findById(req.params.post_id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if(!comment)
        {
            return res.status(404).json({msg:'Comment Does not exist'});
        }

        if(comment.user.toString() !== req.user.id)
        {
            return res.status(401).json({msg:'User not authorized'});
        }

        const removeindex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeindex,1);

        await post.save();
        res.json(post.comments);


        
        
    } catch (err) {

        if(err)
        {
            console.log(err.message);
            res.status(400).msg('Server Error');
        }
        
    }
});
















module.exports = router;
