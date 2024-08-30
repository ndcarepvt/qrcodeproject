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
    },
    formname:{
        type:String,
        required:true
    },
    platform:{
        type:String,
        required:true,
    },
    adincharge:{
        type:String,
        required:true
    },
    country:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    }
},{timestamps:true})


export const FBLead = mongoose.models.FBLead || mongoose.model('FBLead',fbLeadSchema)