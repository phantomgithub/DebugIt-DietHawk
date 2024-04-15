const jwt=require('jsonwebtoken');
const checkAuth = function(req,res,next){
    const token=req.cookies.payload47;

    if(token){
        jwt.verify(token,process.env.JSONSECRET,function(err,decodedToken){
            if(err){
                console.log(err.message);
                res.redirect('/log-in');
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else
    res.redirect('/log-in');
}

module.exports={checkAuth};