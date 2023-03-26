import express from 'express'
import mongoose from 'mongoose';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
import subCategoryRouter from './routes/subCategoryRouter.js';
import router from './routes/userRouter.js';
import * as dotenv from 'dotenv'
const server = express();
server.use(express.json())
dotenv.config()

server.use('/api/user', router)
server.use('/api/category',categoryRouter)
server.use('/api/sub-category',subCategoryRouter)
server.use('/api/product',productRouter)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Db is connected Successfully"))
.catch((err)=> console.log("Error occured while connecting to DB",err))

server.listen(3000,()=>{
    console.log("Server is running on 3000")
})
