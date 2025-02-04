import { FBLead } from "../models/facebookLead.model.js";
import axios from 'axios'
import { checkTimezone } from "../services/fbleadservice.js";
import { sendMessageToSocketId } from "../server.js";
import { FBLeadMail, FBLeadMailInternational, FBLeadMailReport, onCRMDataSubmit, sendOzentol, sendOzentolInternational } from "../helpers/fbleadhelper.js";
import cron from 'node-cron';

const addFBLead = async (req, res) => {

    const {
        name, email, contact, city, message, sheetname,
        fbid, platform, formname, adincharge, emailtitle, disease
    } = req.body;

    try {

        // Email Send
        const leadMail = {
            fbid,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message,
            contact,
            city: city,
            platform: platform,
            formname,
            adincharge,
        }
        await FBLeadMail(leadMail, emailtitle);

        // Validate required fields
        if (![name, email, contact, city, fbid, formname, adincharge].every(Boolean)) {
            console.error("Missing required fields");
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Check for existing entry
        const existingEntry = await FBLead.findOne({ fbid });
        if (existingEntry) {
            console.error(`Lead with ID ${fbid} already exists`);
            return res.status(409).json({ success: false, message: `Lead with ID ${fbid} already exists` });
        }

        // set phoneNumber
        let number = contact

        if (number.toString().length > 10) {
            // console.log(number.toString().length);
            number = number.toString().slice(-10); // Ensure it's sliced from the number's string representation
            console.log(number);
        }


        // Determine form name and campaign
        const formnameLower = formname.toLowerCase();
        let formnameVal = formname.toLowerCase();
        let campaign = "Ivr_Common";
        let callinitiated = 0;

        if (formnameLower.includes("kidney")) {
            formnameVal = "kidney";
            campaign = "Manual_Calling";
        } else if (formnameLower.includes("autism")) {
            formnameVal = "autism";
        }

        // Send campaign details
        const response = await sendOzentol(number, campaign);
        if (response.status == "SUCCESS") {
            callinitiated = 1;
        }

        // Prepare CRM data
        const crmData = {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact: number,
            city: city.toLowerCase(),
            country: "national",
            disease: disease
        };

        // Submit CRM data
        const CRMResult = await onCRMDataSubmit(crmData, formnameLower);

        // Handle address
        const address = await onAddressHandler(city);

        // Prepare lead data
        const leadData = new FBLead({
            fbid,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact: number.toString(),
            city: city.toLowerCase(),
            platform: platform,
            formname: formnameVal,
            adincharge,
            state: address?.stateVal,
            country: address?.countryVal,
            countrysource: "national",
            callinitiated,
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


// INTERNATIONAL FUNCTIONS OR API STARTED


const addFBLeadInternational = async (req, res) => {

    const {
        name, email, contact, city, message,
        fbid, platform, formname, adincharge, emailtitle, disease
    } = req.body;

    try {

        // Validate required fields
        if (![name, email, contact, city, fbid, formname, adincharge].every(Boolean)) {
            console.error("Missing required fields");
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Email Send
        const leadMail = {
            fbid,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message,
            contact,
            city: city,
            platform: platform,
            formname,
            adincharge,
        }
        await FBLeadMailInternational(leadMail, emailtitle);

        // Check for existing entry
        const existingEntry = await FBLead.findOne({ fbid });
        if (existingEntry) {
            console.error(`Lead with ID ${fbid} already exists`);
            return res.status(409).json({ success: false, message: `Lead with ID ${fbid} already exists` });
        }

        // const number = getPlainNumber(contact)
        // Send Message to Socket
        const messageObj = {
            event: "lead-recieved",
            data: emailtitle
        }

        sendMessageToSocketId(messageObj);


        // Prepare CRM data
        const crmData = {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact: contact.toString(),
            city: city.toLowerCase(),
            country: "international",
            disease: disease
        };

        const formnameLower = formname.toLowerCase();

        // Submit CRM data and save lead
        const CRMResult = await onCRMDataSubmit(crmData, formnameLower);

        // Determine form name and campaign
        let formnameVal = formname.toLowerCase();


        // let campaign = "Ivr_Common";
        let campaign = "Common_Ivr"
        let callinitiated = 0;
        const isAllowed = checkTimezone(emailtitle)

        console.log(isAllowed)

        if (isAllowed) {
            // Send campaign details
            const response = await sendOzentolInternational(contact, campaign);
            console.log(response)
            if (response?.status === "SUCCESS") {
                callinitiated = 1;
            }
        }


        // Handle address
        const address = await onAddressHandler(city);


        // Prepare lead data
        const leadData = new FBLead({
            fbid,
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            message: message.toLowerCase(),
            contact: contact.toString(),
            city: city.toLowerCase(),
            platform: platform,
            formname: formnameVal,
            adincharge,
            state: address?.stateVal,
            country: address?.countryVal,
            countrysource: "international",
            callinitiated,
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


const FBLeadNational = async (req, res) => {

    const { userId } = req.body;

    if (userId !== process.env.LEAD_SECRET) {
        return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    const country = "India";
    const limit = parseInt(req.query.limit) || 100;

    try {
        const data = await FBLead.aggregate([
            { $match: { country } }, // Match documents with country "India"
            { $sort: { _id: -1 } },  // Sort by `_id` in descending order (latest first)
            {
                $group: {
                    _id: "$email", // Group by `email` to ensure uniqueness
                    doc: { $first: "$$ROOT" } // Keep the latest document for each unique `email`
                }
            },
            { $replaceRoot: { newRoot: "$doc" } }, // Replace the root with the original document
            { $sort: { _id: -1 } },  // Sort again by `_id` to ensure the latest leads are at the top
            { $limit: limit } // Limit the results to the specified count
        ]);

        return res.send({
            success: true,
            message: "FBLead Fetched Successfully",
            data,
        });
    } catch (error) {
        console.error("Error fetching lead data:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching lead data",
        });
    }
};




const FBLeadInternational = async (req, res) => {
    const { userId } = req.body;

    if (userId !== process.env.LEAD_SECRET) {
        return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    const { limit, } = req.query;
    const parsedLimit = parseInt(limit, 10) || 10;

    try {
        // Fetch documents where country is not "India" or city is not "India", sorted in descending order
        const data = await FBLead.find({
            $and: [
                { country: { $ne: "India" } },
                { city: { $ne: "india" } }
            ]
        })
            .sort({ _id: -1 }) // Sort in descending order by `_id`
            .limit(parsedLimit);

        return res.status(200).json({
            success: true,
            message: "FBLead fetched successfully.",
            data,
        });
    } catch (error) {
        console.error("Error fetching lead data:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching lead data.",
        });
    }
};




const ozentolCall = async (req, res) => {
    const url = "https://api1.getkookoo.com/CAServices/AgentManualDial.php?api_key=KK4d7f41a640fc1c736f1d36e89212e60f&username=ndayurveda&agentID=QCD&campaignName=Tollfree_18886245925&customerNumber=14077770062&UCID=true&uui=%7B3%7D";

    const data = {
        userName: 'ndayurveda',
        agentID: 'QCD',
        campaignName: 'Tollfree_18886245925',
        customerNumber: '14077770062'
    };

    try {
        const response = await axios.post(url);

        console.log('Message sent successfully:', response.data);
        // res.render(response.data);
        res.send({ success: true, message: response.data })
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

const getFBLeadCounts = async (req, res) => {
    res.send("Lead count cron jobs scheduled at 9:00 AM & 9:00 PM.");
}

// Function to get lead counts for the given time range
const getLeadCounts = async (startTime, endTime) => {
    console.log("Fetching lead counts for the given time range:", startTime, endTime);
    try {
        // Adjust createdAt to be in UTC for querying
        const nationalCount = await FBLead.countDocuments({
            createdAt: { $gte: startTime, $lt: endTime },
            countrysource: "national",
        });

        const internationalCount = await FBLead.countDocuments({
            createdAt: { $gte: startTime, $lt: endTime },
            countrysource: "international",
        });

        return { nationalCount, internationalCount };
    } catch (error) {
        console.error("Error fetching lead counts:", error);
        return { nationalCount: 0, internationalCount: 0 };
    }
};

// Schedule the 9:00 AM message (fetching data from 8:00 PM to 8:00 AM IST)
cron.schedule("0 9 * * *", async () => {
    console.log("Fetching lead counts for Day Shift (8:00 AM - 8:00 PM IST)");

    // Get the current time in UTC
    const nowUTC = new Date();

    // Adjust to IST by adding 5 hours 30 minutes
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const nowIST = new Date(nowUTC.getTime() + ISTOffset);

    // Set the start time (8:00 AM IST)
    const startTime = new Date(nowIST);
    startTime.setHours(20, 0, 0, 0); // 8:00 AM IST
    console.log("Start Time:", startTime);
    console.log("Start Time:", startTime.getHours());

    // Set the end time (8:00 PM IST)
    const endTime = new Date(nowIST);
    endTime.setHours(8, 0, 0, 0); // 8:00 PM IST
    console.log("End Time:", endTime);
    console.log("End Time:", endTime.getHours());

    // Convert startTime and endTime to UTC for querying
    const startTimeUTC = new Date(startTime.getTime() - ISTOffset);
    const endTimeUTC = new Date(endTime.getTime() - ISTOffset);

    console.log("Start Time (UTC):", startTimeUTC);
    console.log("End Time (UTC):", endTimeUTC);

    const { nationalCount, internationalCount } = await getLeadCounts(startTimeUTC, endTimeUTC);
    console.log("National Count:", nationalCount);
    console.log("International Count:", internationalCount);
    const counts = { total: nationalCount + internationalCount, national: nationalCount, international: internationalCount };
    const time = { startTime: startTime.getHours(), endTime: endTime.getHours() };
    FBLeadMailReport(counts, time);
    // await sendEmail("Day (8 AM - 8 PM)", nationalCount, internationalCount);
});

// Schedule the 9:00 PM message (fetching data from 8:00 AM to 8:00 PM IST)
cron.schedule("0 21 * * *", async () => {
    console.log("Fetching lead counts for Day Shift (8:00 AM - 8:00 PM IST)");

    // Get the current time in UTC
    const nowUTC = new Date();

    // Adjust to IST by adding 5 hours 30 minutes
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const nowIST = new Date(nowUTC.getTime() + ISTOffset);

    // Set the start time (8:00 PM IST)
    const startTime = new Date(nowIST);
    startTime.setHours(8, 0, 0, 0); // 8:00 PM IST
    console.log("Start Time:", startTime);
    console.log("Start Time:", startTime.getHours());

    // Set the end time (8:00 AM IST)
    const endTime = new Date(nowIST);
    endTime.setHours(20, 0, 0, 0); // 8:00 AM IST
    console.log("End Time:", endTime);
    console.log("End Time:", endTime.getHours());

    // Convert startTime and endTime to UTC for querying
    const startTimeUTC = new Date(startTime.getTime() - ISTOffset);
    const endTimeUTC = new Date(endTime.getTime() - ISTOffset);

    console.log("Start Time (UTC):", startTimeUTC);
    console.log("End Time (UTC):", endTimeUTC);

    const { nationalCount, internationalCount } = await getLeadCounts(startTimeUTC, endTimeUTC);
    console.log("National Count:", nationalCount);
    console.log("International Count:", internationalCount);
    const counts = { total: nationalCount + internationalCount, national: nationalCount, international: internationalCount };
    const time = { startTime: startTime.getHours(), endTime: endTime.getHours() };
    FBLeadMailReport(counts, time);
    // await sendEmail("Day (8 AM - 8 PM)", nationalCount, internationalCount);
});


// const sendWhatsappMessage = async (nationalCount, internationalCount) => {
//     const apiKey = process.env.EXOTEL_API_KEY
//     const apiToken = process.env.EXOTEL_API_TOKEN
//     const subDomain = process.env.EXOTEL_SUBDOMAIN
//     const accountSid = process.env.EXOTEL_ACCOUNTSID

//     let message = `NationalLeads: ${nationalCount} InternationalLeads: ${internationalCount}`;

//     const url = `https://${apiKey}:${apiToken}@${subDomain}/v2/accounts/${accountSid}/messages`;

//     const data = {
//         "custom_data": "82VAPYGD",
//         "status_callback": "https://fd3c-112-196-103-210.ngrok-free.app/api/whatsappstatus",
//         "whatsapp": {
//             "messages": [{
//                 "from": "+917791006006",
//                 "to": ["+918556864699", "+918054237565"],
//                 "content": {
//                     "type": "template",
//                     "template": {
//                         "namespace": "caf00410_6458_4997_995a_4673fc93478d",
//                         "name": "lead_count_template",
//                         "language": {
//                             "policy": "deterministic",
//                             "code": "en"
//                         },
//                         "components": [
//                             {
//                                 "type": "body",
//                                 "parameters": [{
//                                     "type": "text",
//                                     "text": message,
//                                 }]
//                             },
//                         ]
//                     }
//                 }
//             }]
//         }
//     }


//     try {
//         const response = await axios.post(url, data, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         console.log('Message sent successfully:', response);
//         console.log('Message sent successfully:', response.data);
//         // res.send({ success: true, message: response.data })
//     } catch (error) {
//         console.error('Error sending message:', error.response ? error.response.data : error.message);
//     }
// }

export { addFBLead, addFBLeadInternational, FBLeadNational, FBLeadInternational, ozentolCall, getFBLeadCounts }