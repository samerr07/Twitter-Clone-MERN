const jwt = require("jsonwebtoken")

exports.isAuthentnicatd = async(req,res,next)=>{
    try{
        const token = req.cookies.accessToken
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthenticated"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();

    }catch(err){
        return res.status(401).json({
            success:false,
            message:"Unauthenticated"
        })
        // console.log(err)
    }
}