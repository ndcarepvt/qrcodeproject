import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        default:"UnKnown"
        
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    emailId:{
        type:String,
        default:""
    },
    healthType:{
        type:String,
        default:""
    },
    disease:{
        type:String,
        default:""
    },
    country:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    refId:{
        type:String,
        default:""
    },
    status:{
        type:Number,
        default:0
    },
    patientId:{
        type:String,
        default:""
    }


},{minimize:false, timestamps: true})

export const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema)


// const patientVerify = new mongoose.Schema({
//     emailId:{
//         type:String,
//         default:""

//     },
//     phoneNumber:{
//         type:Number,
//         required:true
//     },
//     isVerified:{
//         type:Boolean,
//         default:null
//     }
// },{timestamps:true})


// export const PatientVerify = mongoose.models.PatientVerify || mongoose.model("PatientVerify", patientVerify)