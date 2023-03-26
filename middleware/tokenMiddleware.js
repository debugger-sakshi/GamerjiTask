import jsonwebtoken from "jsonwebtoken";
import { config } from "../config/config.js";

export const verifyToken = async(req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization']
    if(!token){
        return res.status(200).json({message:"A token is required"})
    }
    try{
        const decode = jsonwebtoken.verify(token,config.secretKey)
        
        req.user = decode
        console.log(req.user,decode)
         next()
    }catch(error){
        res.status(400).json({error:"Invalid token"})
    }
}
export const isAdmin = async (req, res, next) => {
    const { user } = req;
    console.log(user)
    if (user.role !== "admin") return res.status(401).json({message: "unauthorized access!"});
  
    next();
  };