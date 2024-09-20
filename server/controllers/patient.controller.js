import { Patient } from "../models/patient.model.js";
import { User } from "../models/user.model.js";
import validator from "validator";
import axios from 'axios'



const addPatient = async (req, res) => {
    const { name, emailId, phoneNumber, healthType, patientId, city, disease, state, userId, country } = req.body;

    try {
        // Find existing patient by phoneNumber
        const existingPatient = await Patient.findOne({ phoneNumber });

        // Find user by userId
        const user = await User.findOne({ _id: userId });

        // Check if user exists
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }



        if (existingPatient) {
            // Check if the patient's status is 1
            if (existingPatient.status === 1) {
                return res.send({ success: false, message: "Details already filled" });
            }

            // Check if phoneNumber already exists in user's patientNumberLead
            if (!(user.patientNumberLead.includes(phoneNumber))) {
                // Update user's patient lead list
                user.patientNumberLead.push(phoneNumber);
                await user.save();
            }


            // Generate new patient ID if healthType is "Corporate"
            let newPatientId = "";
            if (healthType === "Corporate") {
                newPatientId = await getNextPatientId(healthType);
            }

            // Update patient details
            existingPatient.name = name;
            existingPatient.email = emailId;
            existingPatient.city = city;
            existingPatient.state = state;
            existingPatient.country = country;
            existingPatient.disease = disease;
            existingPatient.patientId = healthType === "Corporate" ? newPatientId : patientId;
            existingPatient.healthType = healthType;
            existingPatient.refId = userId;
            existingPatient.status = 1;

            // Save updated patient
            await existingPatient.save();

            return res.send({ success: true, message: "Patient details updated successfully" });

        } else {
            // If patient does not exist, create a new one

            // Update user's patient lead list
            user.patientNumberLead.push(phoneNumber);
            await user.save();

            // Generate new patient ID if healthType is "Corporate"
            let newPatientId = "";
            if (healthType === "Corporate") {
                newPatientId = await getNextPatientId(healthType);
            }

            // Create new patient instance
            const newPatient = new Patient({
                name:name,
                phoneNumber: phoneNumber,
                disease : disease,
                patientId : healthType === "Corporate" ? newPatientId : patientId,
                healthType : healthType,
                city: city,
                state: state,
                country: country,
                refId: userId,
            });

            // Save new patient to database
            await newPatient.save();

            return res.send({ success: true, message: "Patient added successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }


};


const getNextPatientId = async (healthType) => {
    try {
        // Find the latest patient based on the healthType and sort by patientId in descending order
        const latestPatient = await Patient.findOne({ healthType }).sort({ patientId: -1 });

        // Determine the next patientId
        const nextId = latestPatient ? Number(latestPatient.patientId) + 1 : 100000; // Start from 100000 if no documents exist

        // Log the nextId for debugging
        console.log(nextId);

        return nextId;
    } catch (error) {
        console.error('Error getting next patient ID:', error);
        throw new Error('Error getting next patient ID');
    }
};



const getPatients = async (req, res) => {

  
    const userId = req.body.userId

    try {
        console.log("start patient tryCatch");
        const user = await User.findOne({ _id: userId })
        let patientLeadData = []
        let patientLead = user.patientNumberLead

       

        for (const phoneNumber of patientLead) {
            const patientData = await Patient.findOne({ phoneNumber })
            patientLeadData.push(patientData)

        }

        

        res.send({ success: true, message: "patients data fetch", patientsData: patientLeadData })

    } catch (error) {
        console.log(error)
        res.send({ success: false, message: "Error" })

    }
}


const deletePatient = async (req, res) => {

}

const generateOTP = () => {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); // Return as a string
}

const otpSent = async (req, res) => {

    const { phoneNumber } = req.body

    const otp = generateOTP()

    const otpUrl = `https://sms4power.com/api/swsendSingle.asp?username=t1ndayur&password=93457581&sender=NDHEAL&sendto=91${Number(phoneNumber)}&entityID=1201159670876482139&templateID=1207168922725260446&message=Dear%20Sir/Mam%20Your%20OTP%20is%20${otp}%20for%20ndayurveda.info%20Regards%20ND%20Care%20Nirogam`


    try {
        const response = await axios.post(otpUrl)

        if (response) {
            res.send({ success: true, message: "OTP SENT", otp })
        }
    } catch (error) {
        console.log(error);
        res.send({ success: false, message: "OTP ERROR" })

    }

}

// const addPatientVerify = async (req, res) =>{
//     const {emailId, phoneNumber, isVerified} = req.body

//     try {

//         if(!phoneNumber){
//             return res.send({success : false, message : "Please Enter Phone Number"})
//         }

//         const existPhoneNumber = await PatientVerify.find({phoneNumber})

//         if(existPhoneNumber){
//             return res.send({success : false, message : "Phone Number aleady Exist"})
//         }

//         const newPatientVerify = new PatientVerify({
//             emailId,
//             phoneNumber,
//             isVerified
//         })

//         await newPatientVerify.save()

//         return res.send({success : true, message : "Data Added Successfully"})

//     } catch (error) {
//         console.log(error);
//         return res.send({success:false, message:"Error : Patient Verify Data failed"})

//     }

// }

export { addPatient, deletePatient, getPatients, otpSent }