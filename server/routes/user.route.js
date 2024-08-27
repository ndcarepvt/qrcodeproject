import express from 'express'
import { deleteUser, getUserDetail, loginUser, registerUser, updateUser } from '../controllers/user.controller.js'
import multer from 'multer'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//       return cb(null,`${Date.now()}${file.   }`)
//     }
//   })
  
//   const upload = multer({storage:storage});

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.post('/getuserdetails', authMiddleware  ,getUserDetail)
userRouter.post('/update', authMiddleware  ,updateUser)
userRouter.post('/delete', authMiddleware  ,deleteUser)

export default userRouter;