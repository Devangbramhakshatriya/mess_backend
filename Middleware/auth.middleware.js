const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    let token=req.headers.authorization
    jwt.verify(token,"dev",function(err,decoded){
        console.log(decoded)
        if(decoded){
            req.body.userId=decoded.userId
            next()
        }else{
            res.status(400).send({msg:"Please Login First"})
        }
    })
}

module.exports={auth}