// app.get('/api/wts', async (req, res) => {

//     const apiKey = process.env.EXOTEL_API_KEY
//     const apiToken = process.env.EXOTEL_API_TOKEN
//     const subDomain = process.env.EXOTEL_SUBDOMAIN
//     const accountSid = process.env.EXOTEL_ACCOUNTSID
  
//     const url = `https://${apiKey}:${apiToken}@${subDomain}/v2/accounts/${accountSid}/messages`;
  
//     const data = {
//       "custom_data": "82VAPYGD",
//       "status_callback": "https://3b8e-112-196-103-210.ngrok-free.app/api/whatsappstatus",
//       "whatsapp": {
//         "messages": [{
//           "from": "+917791006006",
//           "to": "+918556864699",
//           "content": {
//             "type": "template",
//             "template": {
//               "namespace": "caf00410_6458_4997_995a_4673fc93478d",
//               "name": "giloy_tea_off",
//               "language": {
//                 "policy": "deterministic",
//                 "code": "en"
//               },
//               "components": [{
//                 "type": "header",
//                 "parameters": [{
//                   "type": "image",
//                   "image": {
//                     "filename": "nd-image",
//                     "link": "https://ndayurveda.info/uploads/chat/giloy.png"
//                   }
//                 }]
//               },
//               {
//                 "type": "body",
//                 "parameters": [{
//                   "type": "text",
//                   "text": "USE COUPON CODE :- DURINGPACK30",
//                 }, {
//                   "type": "text",
//                   "text": "https://rishtpusht.in/collections/rishtpushts-everyday-wellness-essentials/products/giloy-tea?offerDateTime=2024-11-04T13:12:02"
//                 }]
//               },
//               ]
//             }
//           }
//         }]
//       }
//     }
  
  
//     try {
//       const response = await axios.post(url, data, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log('Message sent successfully:', response.data);
//       res.send({ success: true, message: response.data })
//     } catch (error) {
//       console.error('Error sending message:', error.response ? error.response.data : error.message);
//     }
//   })