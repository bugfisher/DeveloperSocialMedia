const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const User = require('../../models/Users');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//  @route    POST /api/users
//  @desc     register a user
//  @access   public

router.post('/',[
    check('name','name cannot be empty').not().isEmpty(),
    check('email','Enter valid email').isEmail(),
    check('password','Enter valid password of minimum length 6').isLength({
        min:6
    })
],async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }


    const {name,email,password} = req.body;

    try{

        //See if user Exists
        let user = await User.findOne({email});
        if(user)
        {
           return  res.status(400).json({errors:[{msg:'User Already Exists'}]});
        }

        //Gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        //Encrypt Password

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);

        await user.save();

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
