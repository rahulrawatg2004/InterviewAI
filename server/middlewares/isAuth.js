import jwt from 'jsonwebtoken';

const isAuth = async(req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({success:false,message:"no token provided"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false,message:"User does not have a valid token"});
        }
        req.userId = decoded;
        next();
    } catch (error) {
        return res.status(401).json({success:false,message:"Invalid token"});
    }
}
export default isAuth;