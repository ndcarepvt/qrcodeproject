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
app.use('/api/eventLead', eventLeadRouter)
app.use('/api/other', otherRouter)
app.use('/images', express.static('uploads'))


app.get('/', (req, res) => {
  res.send("Working Server")
})

app.post('/api/webhook', (req, res) => {

  return res.send({ success: true, message: "test" })
})


app.get('/api/wts', async (req, res) => {

  const apiKey = process.env.EXOTEL_API_KEY
  const apiToken = process.env.EXOTEL_API_TOKEN
  const subDomain = process.env.EXOTEL_SUBDOMAIN
  const accountSid = process.env.EXOTEL_ACCOUNTSID

  const url = `https://${apiKey}:${apiToken}@${subDomain}/v2/accounts/${accountSid}/messages`;

  const data = {
    "custom_data": "82VAPYGD",
    "status_callback": "https://3b8e-112-196-103-210.ngrok-free.app/api/whatsappstatus",
    "whatsapp": {
      "messages": [{
        "from": "+917791006006",
        "to": "+918556864699",
        "content": {
          "type": "template",
          "template": {
            "namespace": "caf00410_6458_4997_995a_4673fc93478d",
            "name": "giloy_tea_off",
            "language": {
              "policy": "deterministic",
              "code": "en"
            },
            "components": [{
              "type": "header",
              "parameters": [{
                "type": "image",
                "image": {
                  "filename": "nd-image",
                  "link": "https://ndayurveda.info/uploads/chat/giloy.png"
                }
              }]
            },
            {
              "type": "body",
              "parameters": [{
                "type": "text",
                "text": "USE COUPON CODE :- DURINGPACK30",
              }, {
                "type": "text",
                "text": "https://rishtpusht.in/collections/rishtpushts-everyday-wellness-essentials/products/giloy-tea?offerDateTime=2024-11-04T13:12:02"
              }]
            },
            ]
          }
        }
      }]
    }
  }


  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Message sent successfully:', response.data);
    res.send({ success: true, message: response.data })
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
  }
})








app.post('/api/whatsappstatus', (req, res) => {
  console.log("req.body", req.body);
  console.log("req.body.whatsapp", req.body.whatsapp);
  console.log("req.body.whatsapp.messages", req.body.whatsapp.messages);

  return res.send({ success: true, message: "test" })
})

app.post('/api/test', async (req, res) => {

  const { number } = req.body

})


app.listen(port, (req, res) => {

  console.log(`Server is Running, http://localhost:${port}`)
})
