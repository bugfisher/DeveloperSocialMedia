const express = require('express');
const router = express.Router();

//  @route    /api/auth
//  @desc     test
//  @access   public

router.get('/',(req,res)=>res.send('auth api'));

module.exports = router;
