import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    }
})

export const Category = mongoose.model("Category",categorySchema)