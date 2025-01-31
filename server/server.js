import express from 'express'
import { connectDB } from './config/db.js'
import userRouter from './routes/user.route.js'
import cors from 'cors'
import 'dotenv/config'
import adminRoute from './routes/admin.route.js'
import patientRouter from './routes/patient.route.js'
import FBLeadRouter from './routes/fblead.route.js'
import kycRouter from './routes/kyc.route.js'
import eventLeadRouter from './routes/eventLead.route.js'
import axios from 'axios'
import otherRouter from './routes/other.route.js'
import { Server } from 'socket.io'
import http from 'http'

// config
const app = express()
const port = process.env.PORT || 3000

// middleWare
app.use(cors())
app.use(express.json())

// Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});

export const sendMessageToSocketId = (messageObject) => {

  console.log(messageObject);

  if (io) {
    io.emit(messageObject.event, messageObject.data);
  } else {
    console.log('Socket.io not initialized.');
  }
}

// Database Connection
connectDB()

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/admin', adminRoute)
app.use('/api/patient', patientRouter)
app.use('/api/fblead', FBLeadRouter)
app.use('/api/kycform', kycRouter)
app.use('/api/eventLead', eventLeadRouter)
app.use('/api/other', otherRouter)
app.use('/images', express.static('uploads'))


app.get('/', (req, res) => {
  res.send("Working Server")
})

app.post('/api/webhook', (req, res) => {

  return res.send({ success: true, message: "test" })
})


app.post('/api/whatsappstatus', (req, res) => {
  console.log("req.body", req.body);
  console.log("req.body.whatsapp", req.body.whatsapp);
  console.log("req.body.whatsapp.messages", req.body.whatsapp.messages);

  return res.send({ success: true, message: "test" })
})

// app.post('/api/test', async (req, res) => {

//   const { number } = req.body

// })


server.listen(port, (req, res) => {

  console.log(`Server is Running, http://localhost:${port}`)
})
