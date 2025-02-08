import nodemailer from 'nodemailer'
import axios from 'axios'


export const onCRMDataSubmit = async (data, formname) => {
    console.log(data);

    let url = 'https://ndayurveda.info/api/query/facebook'

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


export const FBLeadMail = async (lead, emailtitle) => {
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
        <p><strong>Formname:</strong> ${lead.formname}</p>
        <p><strong>AdIncharge:</strong> ${lead.adincharge}</p>
    `;

    let emailList = "githubndcare@gmail.com, leadsfb78@gmail.com, raghav@nirogamusa.in"
    let formname = lead.formname.toLowerCase();

    if (formname.includes('kidney')) {
        emailList = "githubndcare@gmail.com, leadsfb78@gmail.com, raghav@nirogamusa.in, fbleads05@gmail.com"
    }
    if (formname.includes('autism')) {
        emailList = "githubndcare@gmail.com, raghav@nirogamusa.in"
    }

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
            subject: emailtitle, // Subject line
            html: formattedData, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("email send Successfull");

        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

}


export const sendOzentol = async (number, campaign) => {


    const options = {
        method: 'POST',
        url: 'https://in-ccaas.ozonetel.com/cloudAgentRestAPI/index.php/CloudAgent/CloudAgentAPI/addCamapaignData',
        headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="PhoneNumber"\r\n\r\n${number}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="api_key"\r\n\r\nKK21eebdac0087e72bcbae3c8f83c9f658\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="campaign_name"\r\n\r\n${campaign}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="action"\r\n\r\nstart\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="Priority"\r\n\r\n1\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="checkDuplicate"\r\n\r\nfalse\r\n-----011000010111000001101001--`
    };

    try {
        const response = await axios.request(options)
        console.log("Success, IVR Started");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }


}


export const FBLeadMailInternational = async (lead, emailtitle) => {
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
        <p><strong>Formname:</strong> ${lead.formname}</p>
        <p><strong>AdIncharge:</strong> ${lead.adincharge}</p>
    `;

    const formname = lead.formname.toLowerCase()

    let emailList = "githubndcare@gmail.com, internationalfbqueries@gmail.com, raghav@nirogamusa.in"

    if (formname.includes('kidney')) {
        emailList = "githubndcare@gmail.com, raghav@nirogamusa.in, fbleads05@gmail.com, internationalfbqueries@gmail.com"
    }


    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'githubndcare@gmail.com', // sender address
            to: emailList, // list of receivers
            subject: emailtitle, // Subject line
            html: formattedData, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("email send Successfull");

        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

}

export const sendOzentolInternational = async (phoneNumber, campaign_name) => {

    const options = {
        method: 'POST',
        url: 'https://cx.ozonetel.com/cloudAgentRestAPI/index.php/CloudAgent/CloudAgentAPI/addCamapaignData',
        headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="action"\r\n\r\nstart\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="Priority"\r\n\r\n1\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="api_key"\r\n\r\nKK4d7f41a640fc1c736f1d36e89212e60f\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="campaign_name"\r\n\r\n${campaign_name}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="PhoneNumber"\r\n\r\n${phoneNumber}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="checkDuplicate"\r\n\r\nfalse\r\n-----011000010111000001101001--`
    };

    try {
        const response = await axios.request(options)
        console.log("Success, IVR Started");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }


}


export const FBLeadMailReport = async (counts, time) => {
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

        <Strong>FACEBOOK LEAD REPORT</Strong>
        <br>
        <p>Start Time: ${time.startTime}</p>
        <p>End Time: ${time.endTime}</p>
        <p>Total Leads from Facebook: ${counts.total}</p>
        <p>International Leads: ${counts.international}</p>
        <p>National Leads: ${counts.national}</p>
    `;

    let emailList = "githubndcare@gmail.com,  raghav@nirogamusa.in"

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'githubndcare@gmail.com', // sender address
            to: emailList, // list of receivers
            subject: "Fblead Report", // Subject line
            html: formattedData, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("email send Successfull");

        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

}
