import validator from "validator";
import { EventLead } from "../models/eventLead.model.js";
import axios from "axios";
import nodemailer from 'nodemailer'

const addEventLead = async (req, res) => {
  console.log(req.body);
  
  const { name, email, phonenumber, message, eventname } = req.body;

  try {
    // Find an existing lead by phone number
    const existLead = await EventLead.findOne({ phonenumber });

    // If lead exists
    if (existLead) {
      // Check if the lead status is already active (status = 1)
      if (existLead.status === 1) {
        return res.send({ success: false, message: "Details already exist" });
      }

      // Validate email before proceeding
      if (!validator.isEmail(email)) {
        return res.send({ success: false, message: "Enter a valid email" });
      }

      const leadData = {
        name,
        email,
        phonenumber,
        message,
        eventname
      }

      eventLeadMail(leadData);

      // Update lead details and set status to active
      existLead.name = name;
      existLead.phonenumber = phonenumber;
      existLead.email = email;
      existLead.message = message;
      existLead.eventname = eventname;
      existLead.status = 1;

      // Save the updated lead
      await existLead.save();

      return res.send({ success: true, message: "Information updated" });
    }

    // If no existing lead, create a new one
    const newEventLead = new EventLead({
      name,
      email,
      phonenumber,
      message,
      eventname,
    });

    // Send message to the phone number
    eventLeadMail(newEventLead);

    // Save the new lead
    await newEventLead.save();

    console.log("Success");
    return res.send({ success: true, message: "Information added" });

  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: "Error occurred" });
  }
};


const sendMessage = async (number) =>{

  const apiKey = process.env.EXOTEL_API_KEY
  const apiToken = process.env.EXOTEL_API_TOKEN
  const subDomain = process.env.EXOTEL_SUBDOMAIN
  const accountSid = process.env.EXOTEL_ACCOUNTSID

  const url = `https://${apiKey}:${apiToken}@${subDomain}/v2/accounts/${accountSid}/messages`;


  const data = {
    custom_data: "order12",
    status_callback: "https://leadgen.ndcarenirogam.com/api/whatsappstatus",
    whatsapp: {
      "messages": [
        {
          "from": "917791006006", 
          "to": number,
          "content": {
            "type": "template",
            "template": {
              "name": "puneopd_26",
              "language": {
                "policy": "deterministic",
                "code": "en"
              },
              "components": [
                {
                  "type": "header",       // Use the 'header' component for images
                  "parameters": [
                    {
                      "type": "image",     // 'image' should be lowercase
                      "image": {
                        "link": "https://ndprivatelimited.com/ameo/puneopd.jpg"
                      }
                    }
                  ]
                },
                {
                  "type": "body",          // The body can still contain other text or parameters
                  "parameters": [
                    // Add any body parameters here if needed
                  ]
                }
              ]
            }
          }
        }
      ]
    }
    
  };


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
}

const eventLeadMail = async (lead) => {
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
          user: 'githubndcare@gmail.com',
          pass: 'aenevoxgdfsnpuoi'
      }
  });


  const formattedData = `
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Message:</strong> ${lead.message}</p>
      <p><strong>PhoneNumber:</strong> ${lead.phonenumber}</p>
      <p><strong>City:</strong> ${lead.eventname}</p>
  `;

  let emailList = "info@ndayurveda.com"


  async function main(eventName) {
      // send mail with defined transport object
      const info = await transporter.sendMail({
          from: 'githubndcare@gmail.com', // sender address
          to: emailList, // list of receivers
          subject: `${eventName} Event New Lead`, // Subject line
          html: formattedData, // plain text body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("email send Successfull");

      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  let eventname = lead.eventname

  main(eventname).catch(console.error);

}



export {addEventLead}