import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    description:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
})
export const SubCategory = mongoose.model("SubCategory",subCategorySchema)