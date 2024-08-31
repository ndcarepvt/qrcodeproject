import { FBLead } from "../models/facebookLead.model.js";
import nodemailer from 'nodemailer'
import axios from 'axios'

const addFBLead = async (req, res) => {
    const { name, email, contact, city, message, sheetname, fbid, platform, formname, adincharge } = req.body

    // await FBLead.deleteMany({})
    // console.log("Data Delete");

    try {

        if (!name || !email || !message || !contact || !city || !sheetname || !fbid || !platform || !formname || !adincharge) {
            console.log("Missing FbLead Fields");
            return res.send({ success: false, message: "Missing FbLead Fields" })
        }

        const existingEntry = await FBLead.findOne({ fbid });

        if (existingEntry) {
            console.log(`This Id ${fbid} Lead already Exist`);
            return res.send({ success: false, message: `This Id ${fbid} Lead already Exist` })
        }

        let formnameVal = ""
        let campaign = ""

        if (formname.toLowerCase().includes("kidney")) {
            formnameVal = "kidney"
            campaign = "Manual_Calling"
            // sendOzentol(contact, campaign)
        } else if (formname.toLowerCase().includes("autism")) {
            formnameVal = "autism"
            campaign = "Ivr_Common"
            // sendOzentol(contact, campaign)
        } else {
            formnameVal = "others"
            campaign = "Ivr_Common"
            // sendOzentol(contact, campaign)
        }

        const address = await onAddressHandler(city)

        const crmData = {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact: contact,
            city: city.toLowerCase(),
            sheetname: sheetname.toLowerCase(),
        }



        const leadData = new FBLead({
            fbid,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact: contact,
            city: city.toLowerCase(),
            sheetname: sheetname.toLowerCase(),
            platform: platform.toLowerCase(),
            formname: formnameVal.toLowerCase(),
            adincharge,
            state: address.stateVal,
            country: address.countryVal
        })



        const CRMResult = await onCRMDataSubmit(crmData)
        await FBLeadMail(leadData)
        if (CRMResult) {
            await leadData.save()
            console.log({ success: true, message: "Add Patient Lead Data" })
        }
        // await leadData.save()
        // console.log({ success: true, message: "Add Patient Lead Data" })

    } catch (error) {

        console.log(error);
        console.log({ success: false, message: "Error : Add Patient Lead Data" });


    }
}

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
        <p><strong>SheetName:</strong> ${lead.sheetname}</p>
        <p><strong>Platform:</strong> ${lead.platform}</p>
        <p><strong>Formname:</strong> ${lead.formname}</p>
        <p><strong>AdIncharge:</strong> ${lead.adincharge}</p>
    `;

let emailList = ""
    if(lead.adincharge == "Naman"){
        emailList = "sitedigital4@gmail.com, leadsfb78@gmail.com,"
    } else if(lead.adincharge == "Raghav"){
        emailList = "sitedigital4@gmail.com, leadsfb78@gmail.com, raghav@nirogamusa.in"
    }else {
        emailList = "sitedigital4@gmail.com, leadsfb78@gmail.com,"
    }


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


const compareFBLead = async (req, res) => {
    const dataArray = req.body

    let agentName = dataArray.agentName;
    delete dataArray.agentName;

    console.log(dataArray);
    console.log(agentName);



    try {
        // Iterate over each sheet in dataArray
        for (const sheetName in dataArray) {
            const dataArraySheet = dataArray[sheetName];
            // console.log(sheetName);
            // console.log(dataArray);

            // Extract headers from the first row
            const headers = dataArraySheet[0];

            // Iterate over each data row (skipping the first header row)
            for (let i = 1; i < dataArraySheet.length; i++) {
                const row = dataArraySheet[i];

                // Create an object with headers as keys and row values as values
                const rowObject = {};
                for (let j = 0; j < headers.length; j++) {
                    rowObject[headers[j]] = row[j]


                }

                console.log(rowObject);

                const fbid = rowObject.id.toLowerCase();
                const name = rowObject['full name'].toLowerCase();
                const email = rowObject.email.toLowerCase();
                const message = rowObject.message.toLowerCase();

                // convert p:+91xxxxxxxxxx into xxxxxxxxxx
                let str = rowObject.phone_number;
                let number = str.slice(-10);
                const city = rowObject.city.toLowerCase();
                const platform = rowObject.platform.toLowerCase()
                const formname = rowObject.form_name.toLowerCase()
                const sheetname = sheetName;
                const address = await onAddressHandler(city)

                let platformVal = ""

                if (platform == "fb") {
                    platformVal = "facebook"
                  }
                
                  if (platform == "ig") {
                    platformVal = "instagram"
                  }

                let formnameVal = ""

                if (formname.toLowerCase().includes("kidney")) {
                    formnameVal = "kidney"
                } else if (formname.toLowerCase().includes("autism")) {
                    formnameVal = "autism"
                } else {
                    formnameVal = "others"
                }

                if (address) {

                    const addLeadData = new FBLead({
                        fbid,
                        name,
                        email,
                        message,
                        contact: Number(number),
                        city,
                        sheetname,
                        state: address.stateVal,
                        country: address.countryVal,
                        platform:platformVal,
                        formname:formnameVal,
                        adincharge: agentName
                        // Corrected field name
                    });


                    // Check if the entry with the given ID already exists in the database
                    const existingEntry = await FBLead.findOne({ fbid });

                    // If the entry doesn't exist, insert it into the collection
                    if (!existingEntry) {
                        await addLeadData.save(); // Insert addLeadData instead of rowObject
                        console.log(`Inserted data with fbid: ${fbid}`);
                    } else {
                        console.log(`Data with fbid: ${fbid} already exists.`);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }


}

export { addFBLead, compareFBLead }