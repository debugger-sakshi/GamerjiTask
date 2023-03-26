import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        default:0
    },
    SubCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required:true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
   
}, { timestamps: true }
)

export const Product = mongoose.model("Product",productSchema)