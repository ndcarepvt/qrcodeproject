import mongoose from 'mongoose'

const fbLeadSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    fbid:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    sheetname:{
        type:String,
        required:true
    }
},{timestamps:true})


export const FBLead = mongoose.models.FBLead || mongoose.model('FBLead',fbLeadSchema)