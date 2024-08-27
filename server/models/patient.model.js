import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    emailId:{
        type:String,
        default:true
    },
    healthType:{
        type:String,
        required:true
    },
    disease:{
        type:String,
        default:""
    },
    country:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    patientId:{
        type:String,
        default:""
    }
    



},{minimize:false, timestamps: true})

export const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema)