const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Users = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult} = require('express-validator/check');

//  @route    /api/auth
//  @desc     authorize the user
//  @access   public

router.get('/',auth,async (req,res)=>{

    try
    {
        const user = await Users.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err)
    {

        if(err)
        {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
    

});


router.post('/',[
    check('email','Enter valid email').isEmail(),
    check('password','Enter valid password of minimum length 6').exists()
],async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }


    const {email,password} = req.body;

    try{

        //See if user Exists
        let user = await Users.findOne({email});
        if(!user)
        {
           return  res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return  res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

        const payload = {
            user:{
                id:user.id
            }
        };

        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000 },(err,token)=>{
            if(err)
            {
                throw err;
            }

            res.json({token});
        })






    }catch(err)
    {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }




    
   // res.send('user api');
});

module.exports = router;
