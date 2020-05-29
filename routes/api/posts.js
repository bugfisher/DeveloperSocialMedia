const express = require('express');
const router = express.Router();

//  @route    /api/posts
//  @desc     test
//  @access   public

router.get('/',(req,res)=>res.send('posts api'));

module.exports = router;
