import express from 'express'
import { connectDB } from './config/db.js'
import userRouter from './routes/user.route.js'
import cors from 'cors'
import 'dotenv/config'
import adminRoute from './routes/admin.route.js'
import patientRouter from './routes/patient.route.js'
import FBLeadRouter from './routes/fblead.route.js'
import kycRouter from './routes/kyc.route.js'

// config
const app = express()
const port = process.env.PORT || 3000

// middleWare
app.use(cors())
app.use(express.json())

// Database Connection
connectDB()

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/admin', adminRoute)
app.use('/api/patient', patientRouter)
app.use('/api/fblead', FBLeadRouter)
app.use('/api/kycform', kycRouter)
app.use('/images', express.static('uploads'))


app.get('/',(req,res)=>{
    res.send("Server is Ready")
})


app.listen(port,(req,res)=>{
    console.log(`Server is Running, http://localhost:${port}`)
})