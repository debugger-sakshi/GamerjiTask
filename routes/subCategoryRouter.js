import express from 'express'
import bodyParser from 'body-parser'
import { isAdmin, verifyToken } from '../middleware/tokenMiddleware.js'
import { addSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from '../controllers/subCategoryController.js'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static)

const subCategoryRouter = express.Router() 

subCategoryRouter.post('/add-sub-category',verifyToken,isAdmin, addSubCategoryController)
subCategoryRouter.get('/sub-category',verifyToken, getSubCategoryController)
subCategoryRouter.post('/update-sub-category/:id',verifyToken, isAdmin,updateSubCategoryController)
subCategoryRouter.delete('/delete-sub-category/:id',verifyToken,isAdmin, deleteSubCategoryController)


export default subCategoryRouter