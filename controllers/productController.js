import { isValidObjectId } from "mongoose"
import { Category } from "../models/categoryModel.js"
import { Product } from "../models/productModel.js"
import { SubCategory } from "../models/subCategoryModel.js"

export const addProductController = async(req,res) => {
    try{
        const {name, description, price, SubCategoryId,countInStock } = req.body
        const category = await SubCategory.findOne({_id:SubCategoryId})
        if(!category){
            return res.status(400).json({message:"Category not found"})
        }
        const oldProduct = await Product.findOne({name})

        if(oldProduct){
            return res.status(400).json({message:"Product name is in use"})
        }
        const newProduct = await new Product({name, description, price, SubCategoryId,countInStock }) 
        await newProduct.save()
        return res.status(200).json({message:"Product created successfully", data: newProduct})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

//update
export const updateProductController = async(req,res) => {
    // console.log("controller called",req.body)
    try{
        const {id} = req.params
        if (!isValidObjectId(id)) return res.status(500).json({message:"Invalid request!"});
        const {name, description, price, SubCategoryId,countInStock } = req.body
        const newProduct = await  Category.findById(id)
        if(!newProduct){
            return res.status(401).json({message:"Invalid Request, record not found"})
        }
        newProduct.name = name
        newProduct.description = description
        newProduct.price = price
        newProduct.countInStock = countInStock
        await newProduct.save()
        return res.status(201).json({message:"Product updated successfully", data: newProduct})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}
//get all products
export const getProductController = async(req,res) => {
    try{
        
        const products = await Product.find() 
        if(products.length>0){
            return res.status(200).json({message:"Get All products", data: products})
        }
        return res.status(200).json({message:"No record is found", data: []})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}
//delete
export const deleteProductController = async(req,res) => {
   
    try{
        const {id} = req.params
        if (!isValidObjectId(id)) return res.status(500).json({message:"Invalid request!"});
        // console.log(req)
        const product = await  Product.findByIdAndDelete({_id:id}) 
        if(product){
        return res.status(200).json({message:"product deleted successfully"})
            
        }
        return res.status(200).json({message:"No such product found"})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

//sort by price lowtohigh
export const getProductByPriceLowToHighController = async(req,res) => {
    try{
        
        const products = await Product.find().sort({price:1}) 
        if(products.length>0){
            return res.status(200).json({message:"Get All products by Low To High", data: products})
        }
        return res.status(200).json({message:"No record is found", data: []})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}
//sort by price lowtohigh
export const getProductByPriceHighToLowController = async(req,res) => {
    try{
        
        const products = await Product.find().sort({price:-1}) 
        if(products.length>0){
            return res.status(200).json({message:"Get All products by Low To High", data: products})
        }
        return res.status(200).json({message:"No record is found", data: []})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

//get product by subcategory
export const getProductBySubCategoryController = async(req,res) => {
    try{
        const {id} = req.params
        if(!id) return res.status(401).json({message:"No record is found", data: []})
        const products = await Product.find({SubCategoryId: id}) 
        if(products.length>0){
            return res.status(200).json({message:"Get All products by SubCategory", data: products})
        }
        return res.status(200).json({message:"No record is found", data: []})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

const getProduct = async(item) =>{
    const products = await Product.find({SubCategoryId: item._id}) 
    console.log("product",products)
    return products
    // if(products.length>0){
    //     return products
    // }
}

//get product by Category
export const getProductByCategoryController = async(req,res) => {
    try{
        const {id} = req.params
        if(!id) return res.status(401).json({message:"No record is found", data: []})
        const subCategories = await SubCategory.find({CategoryId: id}) 
        console.log(subCategories)
        if(subCategories.length>0){
            let data = []
            for(let i =0;i<subCategories.length;i++){
                const products = await getProduct(subCategories[i])
                data = [...data,...products]
            }
            console.log(data)
            return res.status(200).json({message:"Get All products by SubCategory", data: data})
            }
        return res.status(200).json({message:"No record is found", data: []})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

export const getProductBySearchController = async(req,res) => {
    try{
        const {name} = req.params
        const data = await Product.find({name:{ $regex: name, $options: "i" }})
        console.log(name,data)
        if(data.length>0)    return res.status(200).json({message:"Get All products by SubCategory", data: data})
            
        return res.status(200).json({message:"No record is found", data: []})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}
