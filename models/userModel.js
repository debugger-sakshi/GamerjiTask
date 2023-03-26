import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    image:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["admin", "user"],
      },
})

const User = mongoose.model("User",userSchema)
export default User