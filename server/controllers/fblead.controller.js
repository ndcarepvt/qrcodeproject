import { FBLead } from "../models/facebookLead.model.js";
import nodemailer from 'nodemailer'
import axios from 'axios'

const addFBLead = async (req, res) => {
    const { name, email, contact, city, message, sheetname } = req.body

    try {


        if (!name || !email || !message || !contact || !city || !sheetname) {
            res.send({ success: false, message: "Missing FbLead Fields" })
        }

        const data = {
            name,
            email,
            message,
            contact,
            city,
            sheetname,
        }

        const leadData = new FBLead({
            name,
            email,
            message,
            contact,
            city,
            sheetname,
        })

        const CRMResult = onCRMDataSubmit(data)
        FBLeadMail(leadData)
        if(CRMResult){

            await leadData.save()
       

        // res.send({success:true, message:"Add Patient Lead Data"})
        console.log({ success: true, message: "Add Patient Lead Data" })
    }
    } catch (error) {

        // res.send({success:false,message:"Error"})
        console.log(error);


    }
}

const onCRMDataSubmit = async (data) => {
    console.log(data);
    
    const url = 'https://ndayurveda.info/api/query/facebook'

    try {
        const response = axios.post(url, data)
        if (response) {
            console.log(response);
        } else {
            console.log(response.data);
        }

        return "true"
    } catch (error) {
        console.log(error);
        return "false"
    }
}


const FBLeadMail = async (lead) => {
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
    name: "${lead.name}",
    email: "${lead.email}",
    message: "${lead.message}",
    phoneNumber: "${lead.phoneNumber}",
    city: "${lead.city}",
    sheetName: "${lead.sheetName}",
`

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'githubndcare@gmail.com', // sender address
            to: "sitedigital4@gmail.com, leadsfb78@gmail.com ", // list of receivers
            subject: "FB Lead Patient Add Notify", // Subject line
            text: formattedData, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("email send Successfull");

        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

}


const getFBLead = async (req, res) => {

}

export { addFBLead, getFBLead }