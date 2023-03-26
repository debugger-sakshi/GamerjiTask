import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'

import registerUser, { userLogin } from '../controllers/userController.js'

import url,{ fileURLToPath } from 'url';
import { verifyToken } from '../middleware/tokenMiddleware.js';

let imagePath = url.fileURLToPath(new URL('../', import.meta.url))+'public\\userImages'
// const __dirname = new URL('../public/userImages', import.meta.url).pathname;
// const pathToAdjacentFooFile = new URL('../foo.txt', import.meta.url).pathname;
// console.log(__dirname,pathToAdjacentFooFile,imagePath)
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static)
const router = express.Router() 

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,imagePath,(err,res)=>{
            if(err) throw err
        })
        filename: (req,file,cb)=>{
            console.log("file",file)
            const name = Date.now() + file.originalname+'.jpg';
            cb(null, name, (err,res)=>{
                if(err) throw err
            })
        }
    }
})
let upload = multer({storage:storage});

router.post('/register',upload.single('image'),registerUser)
router.post('/login',userLogin)
router.get('/test',verifyToken,(req,res)=>{
    res.json({message:"successfull"})
})
export default router