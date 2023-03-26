import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import jsonwebtoken from 'jsonwebtoken'
const create_token = async(id,role)=>{
    try{
        const token = await jsonwebtoken.sign({_id:id,role:role},process.env.SECRETKEY,{expiresIn:"24h"})
        return token
    }catch(err){
        return res.status(401).json({error:err})
    }
}

const registerUser = async(req,res) => {
    try{
        const { name, email, password, contactNumber,image,role} = req.body
    

        const oldUser = await User.findOne({email})
        if (oldUser){
            return res.status(401).json({error:"User is already in use"})
        }

        const newPassword = await bcrypt.hash(password,10)
        const newUser = await new User({name, email,password:newPassword,contactNumber,image,role})
        // console.log("register called")
        await newUser.save()
        
        return res.status(200).json({message:"User is created"})
    }catch(error){
        console.log(error)
        return res.status(400).json({error:error.message})
    }
}
export const userLogin = async(req,res) =>{
    // console.log(req,req.body)
    try{
        const {email, password } = req.body
        const user = await User.findOne({email})
        if(user){
            const pwdMatch = await bcrypt.compare(password,user.password)
            if(pwdMatch){
                const token = await create_token(user._id,user.role)
                console.log("user",req.user)
                return res.status(200).json({message:"Login successfully",token:token,user:user})
            }else{
                return res.status(401).json({error:"Invalid credentials"})
            }
        }
        else{
            return res.status(401).json({error:"Invalid credentials"})
        }
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}
export default registerUser