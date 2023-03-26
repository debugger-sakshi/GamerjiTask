import express from 'express'
import bodyParser from 'body-parser'
import { isAdmin, verifyToken } from '../middleware/tokenMiddleware.js'
import { addCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static)

const categoryRouter = express.Router() 

categoryRouter.post('/add-category',verifyToken,isAdmin, addCategoryController)
categoryRouter.get('/category',verifyToken, getCategoryController)
categoryRouter.post('/update-category/:id',verifyToken,isAdmin, updateCategoryController)
categoryRouter.delete('/delete-category/:id',verifyToken,isAdmin, deleteCategoryController)


export default categoryRouter