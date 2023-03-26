import { isValidObjectId } from "mongoose"
import { Category } from "../models/categoryModel.js"
import { SubCategory } from "../models/subCategoryModel.js"
export const addSubCategoryController = async(req,res) => {
    console.log(req.body)
    try{
        const {name, description, CategoryId,brand } = req.body
        // console.log(CategoryId)
        if (!isValidObjectId(CategoryId)) return res.status(500).json({message:"Invalid request!"});
        // console.log("pass")
        const findCategory = await Category.findById({_id:CategoryId})
        console.log("find category",findCategory)
        if(!findCategory){
            return res.status(400).json({message:"Category not found, Create category first"})
        }
        const oldCategory = await SubCategory.findOne({name})
        if(oldCategory){
            return res.status(400).json({message:"Name  is in use, please enter different name"})
        }
        const newCategory = await new SubCategory({name, description, CategoryId,brand}) 
        await newCategory.save()
        return res.status(200).json({message:"Sub Category created", data: newCategory})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

//update
export const updateSubCategoryController = async(req,res) => {
    // console.log("controller called",req.body)
    try{
        const {id} = req.params
        if (!isValidObjectId(id)) return res.status(500).json({message:"Invalid request!"});
        const {name, description, CategoryId } = req.body
        const category = await  Category.findById({_id:CategoryId})
        console.log(category)
        if(!category){
            return res.status(401).json({message:"Invalid Request, record not found"})
        }
        const newCategory = await SubCategory.findById({_id:id})
        console.log()
        if(!newCategory || newCategory.CategoryId.toString() !== CategoryId){
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
export const getSubCategoryController = async(req,res) => {
    try{
        
        const categories = await SubCategory.find() 
        if(categories.length>0){
            return res.status(200).json({message:"Get All SubCategories", data: categories})
        }
        return res.status(401).json({message:"No record is found", data: []})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}
//delete
export const deleteSubCategoryController = async(req,res) => {
   
    try{
        const {id} = req.params
        if (!isValidObjectId(id)) return res.status(500).json({message:"Invalid request!"});
        // console.log(req)
        const newCategory = await  SubCategory.findByIdAndDelete({_id:id}) 
        if(newCategory){
        return res.status(200).json({message:"SubCategory deleted successfully"})
            
        }
        return res.status(200).json({message:"No such sub-category found"})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}