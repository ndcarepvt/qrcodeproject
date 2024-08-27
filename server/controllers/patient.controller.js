import { Patient } from "../models/patient.model.js";
import { User } from "../models/user.model.js";
import validator from "validator";

// const addPatient = async (req, res) =>{
//     const {name, emailId, phoneNumber, healthType, patientId,city, disease,  state , userId, country } = req.body
//     console.log(userId);
//     try {
      
//         const user = await User.findOne({_id:userId})
//         console.log(user);
        
//         let patientLead = user.patientLead
        
//         if(healthType == "Corporate"){
//             let patientId = await getNextPatientId(healthType)
//             patientLead.push(patientId)
//         } else {
//             patientLead.push(patientId)
//         }


//         if(!validator.isEmail(emailId)){
//             res.send({success:false,message:"Enter valid Email"})
//         }

//         const newPatient = new Patient({
//             name:name,
//             email:emailId,
//             phoneNumber:phoneNumber,
//             city:city,
//             state:state,
//             country:country,
//             disease:disease,
//             patientId:patientId,
//             healthType:healthType
//         })

        
//         const patient = await newPatient.save()
//         await User.findByIdAndUpdate(user._id,{patientLead})
//         res.send({success:true, message:"Patient Added",})
//         // const token = generateToken(user._id)
//     } catch (error) {
//         console.log(error)
//         res.json({success:false ,message:"Error"})
//     }
// }

const addPatient = async (req, res) => {
    const { name, emailId, phoneNumber, healthType, patientId, city, disease, state, userId, country } = req.body;

    if (!userId || !validator.isEmail(emailId)) {
        return res.status(400).send({ success: false, message: "Invalid input data" });
    }

    try {
        // Fetch user and validate if it exists
        const user = await User.findOne({_id:userId});
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        let patientLead = user.patientLead;
        let newPatientId = ""

        // Generate new patientId if healthType is "Corporate"
        if (healthType === "Corporate") {
            newPatientId = await getNextPatientId(healthType);
            patientLead.push(newPatientId);
        } else {
            patientLead.push(patientId);
        }

        // Create new patient instance
        const newPatient = new Patient({
            name: name,
            email: emailId,
            phoneNumber: phoneNumber,
            city: city,
            state: state,
            country: country,
            disease: disease,
            patientId: healthType === "Corporate" ? newPatientId : patientId,
            healthType: healthType
        });

        // Save new patient to database
        await newPatient.save();

        // Update user's patientLead list
        await User.findByIdAndUpdate(userId, { patientLead });

        res.send({ success: true, message: "Patient added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
};


const getNextPatientId = async (healthType) => {
    try {
        // Find the latest patient based on the healthType and sort by patientId in descending order
        const latestPatient = await Patient.findOne({ healthType }).sort({ patientId: -1 });

        // Log the latest patient for debugging
        console.log(latestPatient);

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



const getPatients = async (req, res) =>{

    console.log("start getpatient func");
    
    const userId = req.body.userId

    try {
        console.log("start patient tryCatch");
        
        const user = await User.findOne({_id:userId})

        let patientLeadData = []

        let patientLead = user.patientLead
        
        console.log("start for loop");
        
        for (const patientId of patientLead) {
            const patientData = await Patient.findOne({patientId})
            patientLeadData.push(patientData)
            
        }

        console.log("end for loop");
        

        res.send({success:true,message:"patients data fetch",  patientsData:patientLeadData })

    } catch (error) {
        console.log(error)
        res.send({success:false,message:"Error"})
        
    }
}


const deletePatient = async (req,res) =>{

}

export {addPatient, deletePatient, getPatients}