
// frontend data -> create user -> create token -> store in cookie -> send response to frontend
import User from "../models/user.model.js";
import genToken from "../config/token.js";
export const googleAuth = async(req,res) => {
    try{
       const {name,email} = req.body;
       let user = await User.findOne({email});
       if(!user){
        user = await User.create({name,email});
       }
       let token = await genToken(user._id);
       res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge: 24*60*60*1000

       })

       return res.status(200).json({success:true,user});

    }catch(error){
       return res.status(500).json({success:false,message:"Google Auth error",error:error.message});
    }
}

export const logout = async(req,res) => {
    try{
        await res.clearCookie("token");
        return res.status(200).json({success:true});
    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error",error:error.message});
    }   

}
