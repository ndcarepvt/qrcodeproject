import { FBLead } from "../models/facebookLead.model.js";
import nodemailer from 'nodemailer'
import axios from 'axios'

const addFBLead = async (req, res) => {
    
    const {
        name, email, contact, city, message, sheetname,
        fbid, platform, formname, adincharge, 
    } = req.body;

    try {

        // Validate required fields
        if (![name, email, contact, city, message, fbid, formname, adincharge].every(Boolean)) {
            console.error("Missing required fields");
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Email Send
        const leadMail = {
            fbid,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact,
            city: city,
            platform: platform,
            formname,
            adincharge,
        }
        await FBLeadMail(leadMail);

        // Check for existing entry
        const existingEntry = await FBLead.findOne({ fbid });
        if (existingEntry) {
            console.error(`Lead with ID ${fbid} already exists`);
            return res.status(409).json({ success: false, message: `Lead with ID ${fbid} already exists` });
        }

         // set phoneNumber
         let number = contact.slice(-10);
         console.log(number);
        

        // Determine form name and campaign
        const formnameLower = formname.toLowerCase();
        let formnameVal = formname.toLowerCase();
        let campaign = "Ivr_Common";

        if (formnameLower.includes("kidney")) {
            formnameVal = "kidney";
            campaign = "Manual_Calling";
        } else if (formnameLower.includes("autism")) {
            formnameVal = "autism";
        }

        // Send campaign details
        await sendOzentol(number, campaign);

        // Prepare CRM data
        const crmData = {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact:number,
            city: city.toLowerCase(),
        };

        // Submit CRM data
        const CRMResult = await onCRMDataSubmit(crmData);

        // Handle address
        const address = await onAddressHandler(city);

        // Prepare lead data
        const leadData = new FBLead({
            fbid,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact:number,
            city: city.toLowerCase(),
            platform: platform,
            formname: formnameVal,
            adincharge,
            state: address.stateVal,
            country: address.countryVal,
        });

        // save lead
        if (CRMResult) {
            await leadData.save();
            console.log("Patient Lead Data Added Successfully");
            return res.status(201).json({ success: true, message: "Lead data added successfully" });
        } else {
            console.error("CRM data submission failed");
            return res.status(500).json({ success: false, message: "CRM data submission failed" });
        }
    } catch (error) {
        console.error("Error adding lead data:", error);
        return res.status(500).json({ success: false, message: "An error occurred while adding lead data" });
    }
};


const onCRMDataSubmit = async (data) => {
    console.log(data);

    const url = 'https://ndayurveda.info/api/query/facebook'

    try {
        const response = axios.post(url, data)
        if (response) {
            console.log(response);
            console.log({ success: true, message: "Add Patient Lead Data in CRM" });
        } else {
            console.log({ success: false, message: "Error : Add Patient Lead Data in CRM" });
            console.log(response.data);
        }

        return "true"
    } catch (error) {
        console.log({ success: false, message: "Error : Add Patient Lead Data in CRM" });
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
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Message:</strong> ${lead.message}</p>
        <p><strong>PhoneNumber:</strong> ${lead.contact}</p>
        <p><strong>City:</strong> ${lead.city}</p>
        <p><strong>Platform:</strong> ${lead.platform}</p>
        <p><strong>Formname:</strong> ${lead.formname}</p>
        <p><strong>AdIncharge:</strong> ${lead.adincharge}</p>
    `;

let emailList = "githubndcare@gmail.com, leadsfb78@gmail.com, raghav@nirogamusa.in"
    // if(lead.adincharge == "Naman"){
    //     emailList = "githubndcare@gmail.com, leadsfb78@gmail.com, raghav@nirogamusa.in"
    // } else if(lead.adincharge == "Raghav"){
    //     // emailList = "sitedigital4@gmail.com"
    //     emailList = "githubndcare@gmail.com, leadsfb78@gmail.com, raghav@nirogamusa.in"
    // }else {
    //     emailList = "githubndcare@gmail.com, leadsfb78@gmail.com, raghav@nirogamusa.in"
    // }


    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'githubndcare@gmail.com', // sender address
            to: emailList, // list of receivers
            subject: "India Add New Lead", // Subject line
            html: formattedData, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("email send Successfull");

        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

}

const onAddressHandler = async (city) => {
    let stateVal = ""
    let countryVal = ""

    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&addressdetails=1`);
    const data = await response.json();

    if (data.length > 0) {
        let { state, country } = data[0].address;
        // console.log(`State: ${state}, Country: ${country}`);
        stateVal = state
        countryVal = country
        return { stateVal, countryVal };
    } else {
        console.log('No results found');
    }
}

const sendOzentol = async (number, campaign) => {


    const options = {
        method: 'POST',
        url: 'https://in-ccaas.ozonetel.com/cloudAgentRestAPI/index.php/CloudAgent/CloudAgentAPI/addCamapaignData',
        headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="PhoneNumber"\r\n\r\n${number}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="api_key"\r\n\r\nKK21eebdac0087e72bcbae3c8f83c9f658\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="campaign_name"\r\n\r\n${campaign}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="action"\r\n\r\nstart\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="Priority"\r\n\r\n1\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="checkDuplicate"\r\n\r\nfalse\r\n-----011000010111000001101001--`
    };

    await axios
        .request(options)
        .then(function (response) {
            console.log("Success, IVR Started");
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });


}


// INTERNATIONAL FUNCTIONS OR API STARTED

const FBLeadMailInternational = async (lead) => {
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
        <p><strong>PhoneNumber:</strong> ${lead.contact}</p>
        <p><strong>City:</strong> ${lead.city}</p>
        <p><strong>Platform:</strong> ${lead.platform}</p>
        <p><strong>Formname:</strong> ${lead.formname}</p>
        <p><strong>AdIncharge:</strong> ${lead.adincharge}</p>
    `;

let emailList = "githubndcare@gmail.com, internationalfbqueries@gmail.com, raghav@nirogamusa.in"


    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'githubndcare@gmail.com', // sender address
            to: emailList, // list of receivers
            subject: "International New Lead", // Subject line
            html: formattedData, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("email send Successfull");

        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

}

const sendOzentolInternational = async (phoneNumber,campaign_name) =>{

    const options = {
        method: 'POST',
        url: 'https://cx.ozonetel.com/cloudAgentRestAPI/index.php/CloudAgent/CloudAgentAPI/addCamapaignData',
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="action"\r\n\r\nstart\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="Priority"\r\n\r\n1\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="api_key"\r\n\r\nKK4d7f41a640fc1c736f1d36e89212e60f\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="campaign_name"\r\n\r\n${campaign_name}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="PhoneNumber"\r\n\r\n${phoneNumber}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="checkDuplicate"\r\n\r\nfalse\r\n-----011000010111000001101001--`
      };
      
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
}

const getPlainNumber = (number) =>{
    const countryCodes = {
        'USA': '+1',
        'UK': '+44',
        'Canada': '+1',
        'Dubai': '+971'
      };
      
      function detectCountryAndExtractNumber(phoneNumber) {
        for (const [country, code] of Object.entries(countryCodes)) {
          // Check if the phone number starts with the country code
          if (phoneNumber.startsWith(code)) {
            // Remove the country code and return the plain number
            const plainNumber = phoneNumber.slice(code.length);
            return { plainNumber };
          } 
        }
      }
      
      // Test with the UK phone number
      const result = detectCountryAndExtractNumber(number);
      const phoneNumber = result.plainNumber;

      return phoneNumber
}

const addFBLeadInternational = async (req, res) => {
    
    const {
        name, email, contact, city, message,
        fbid, platform, formname, adincharge, 
    } = req.body;

    try {

        // Validate required fields
        if (![name, email, contact, city, message, fbid, formname, adincharge].every(Boolean)) {
            console.error("Missing required fields");
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Email Send
        const leadMail = {
            fbid,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact,
            city: city,
            platform: platform,
            formname,
            adincharge,
        }
        await FBLeadMailInternational(leadMail);

        // Check for existing entry
        const existingEntry = await FBLead.findOne({ fbid });
        if (existingEntry) {
            console.error(`Lead with ID ${fbid} already exists`);
            return res.status(409).json({ success: false, message: `Lead with ID ${fbid} already exists` });
        }

        const number = getPlainNumber(contact)
       

         // Prepare CRM data
         const crmData = {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact:number,
            city: city.toLowerCase(),
        };

        // Submit CRM data and save lead
        const CRMResult = await onCRMDataSubmit(crmData);

        // Determine form name and campaign
        let formnameVal = formname.toLowerCase();
        let campaign = "Progressive_18886256645";

        // Send campaign details
        await sendOzentolInternational(number, campaign);

        // Handle address
        const address = await onAddressHandler(city);
        
       
        // Prepare lead data
        const leadData = new FBLead({
            fbid,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact:number,
            city: city.toLowerCase(),
            platform: platform,
            formname: formnameVal,
            adincharge,
            state: address.stateVal,
            country: address.countryVal,
        });

        // save lead
        if (CRMResult) {
            await leadData.save();
            console.log("Patient Lead Data Added Successfully");
            return res.status(201).json({ success: true, message: "Lead data added successfully" });
        } else {
            console.error("CRM data submission failed");
            return res.status(500).json({ success: false, message: "CRM data submission failed" });
        }
    } catch (error) {
        console.error("Error adding lead data:", error);
        return res.status(500).json({ success: false, message: "An error occurred while adding lead data" });
    }
};



export { addFBLead, addFBLeadInternational }