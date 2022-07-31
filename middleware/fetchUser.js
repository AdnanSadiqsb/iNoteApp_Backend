const jwt=require('jsonwebtoken')
const JWT_SECTRET='sectretetoken'

const fetchUsers=(req,res,next)=>{
    //get the user from jwt token and add to req object
    const token=req.header('auth-token')
    if(!token)
    {
        res.status(401).json({error:"please authenticate using valid token"})
    }
    const data= jwt.verify(token,JWT_SECTRET)
    req.user=data.user
    next()
}

module.exports=fetchUsers;