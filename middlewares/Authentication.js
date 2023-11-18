var jwt = require('jsonwebtoken');

function Authentication(req,res,next){
    console.log("headers",req.headers.authorization)
    console.log("authentication hits")
    try {
        var decoded = jwt.verify(req.headers.authorization, process.env.NODE_JWT_TOKEN_KEY);
        
        next()
      } catch(err) {
        return res.status(401).json({
            success:false,
            err:err.message,
            message:"token invalid or expired"
        })
      }
    
}

module.exports = Authentication