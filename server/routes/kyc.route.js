import express from 'express'
import { addKYCDetails } from '../controllers/kyc.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const kycRouter = express.Router()

kycRouter.post('/add', upload.fields([
    {
        name: "panImage",
        maxCount: 1
    }, 
    {
        name: "adhaarFrontImage",
        maxCount: 1
    }, 
    {
        name:"adhaarBackImage",
        maxCount:1
    }
]),authMiddleware, addKYCDetails)

export default kycRouter