import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
    panNumber:{
        type:String,
        required:true,
    },
    adhaarNumber:{
        type:Number,
        required:true,
    },
    bankAccountNumber:{
        type:Number,
        required:true,
    },
    ifscCode:{
        type:String,
        required:true
    },
    panImage:{
        type:String,
        required:true
    },
    adhaarFrontImage : {
        type:String,
        required:true
    },
    adhaarBackImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

},{timestamps:true})

export const KYC = mongoose.models.KYC || mongoose.model('KYC', kycSchema)