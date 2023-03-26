import express from 'express'
import bodyParser from 'body-parser'
import { isAdmin, verifyToken } from '../middleware/tokenMiddleware.js'
import { addProductController, deleteProductController, getProductByCategoryController, getProductByPriceHighToLowController, getProductByPriceLowToHighController, getProductBySearchController, getProductBySubCategoryController, getProductController, updateProductController } from '../controllers/productController.js'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static)

const productRouter = express.Router() 

productRouter.post('/add-product',verifyToken,isAdmin, addProductController)
productRouter.get('/product',verifyToken, getProductController)
productRouter.get('/product/lowToHigh',verifyToken, getProductByPriceLowToHighController)
productRouter.get('/product/highToLow',verifyToken, getProductByPriceHighToLowController)
productRouter.get('/product/sub-category/:id',verifyToken, getProductBySubCategoryController)
productRouter.get('/product/category/:id',verifyToken, getProductByCategoryController)
productRouter.get('/product/:name',verifyToken, getProductBySearchController)

productRouter.post('/update-product/:id',verifyToken,isAdmin, updateProductController)
productRouter.delete('/delete-product/:id',verifyToken,isAdmin, deleteProductController)


export default productRouter