const express = require('express');
const router = express.Router();

//  @route    /api/profile
//  @desc     test
//  @access   public

router.get('/',(req,res)=>res.send('profile api'));

module.exports = router;
