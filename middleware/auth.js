const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next) => {

    const token = req.header('x-auth-token');

    if(!token)
    {
        return res.status(401).send('unauthorized access');
    }


    try{

        const decoded = jwt.verify(token,config.get('jwtSecret'));

        req.user = decoded.user;
        next();


    }catch(err)
    {
        if(err)
        {
            res.send(err.message);
            res.status(401).json({msg:'token not valid'});
        }
    }

    

};