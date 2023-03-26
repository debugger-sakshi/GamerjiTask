import { isValidObjectId } from "mongoose"
import { Category } from "../models/categoryModel.js"
import { Product } from "../models/productModel.js"
import { SubCategory } from "../models/subCategoryModel.js"
export const addCategoryController = async(req,res) => {
    // console.log("controller called",req.body)
    try{
        const {name, description } = req.body
        const oldCategory = await Category.findOne({name})

        if(oldCategory){
            return res.status(400).json({message:"Category is in use"})
        }
        const newCategory = await new Category({name, description}) 
        await newCategory.save()
        return res.status(200).json({message:"Category created", data: newCategory})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

//update
export const updateCategoryController = async(req,res) => {
    // console.log("controller called",req.body)
    try{
        const {id} = req.params
        if (!isValidObjectId(id)) return res.status(500).json({message:"Invalid request!"});
        const {name, description } = req.body
        const newCategory = await  Category.findById(id)
        if(!newCategory){
            return res.status(401).json({message:"Invalid Request, record not found"})
        }
        newCategory.name = name
        newCategory.description = description
        await newCategory.save()
        return res.status(201).json({message:"Category updated successfully", data: newCategory})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}
//get all products
export const getCategoryController = async(req,res) => {
    try{
        
        const categories = await Category.find() 
        if(categories.length>0){
            return res.status(200).json({message:"Get All Categories", data: categories})
        }
        return res.status(200).json({message:"No record is found", data: []})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}
//delete
export const deleteCategoryController = async(req,res) => {
   
    try{
        const {id} = req.params
        if (!isValidObjectId(id)) return res.status(500).json({message:"Invalid request!"});
        // console.log(req)
        const newCategory = await  Category.findByIdAndDelete({_id:id}) 
        const subCategory = await SubCategory.find({CategoryId:id})
        for(let i=0;i<subCategory.length;i++){
            const product = await Product.find({SubCategoryId:subCategory[i]._id})
            const newSubCategory = await  SubCategory.findByIdAndDelete({_id:subCategory[i]._id}) 
        }
        if(newCategory){
        return res.status(200).json({message:"Category deleted successfully"})
            
        }
        return res.status(200).json({message:"No such category found"})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}
