import mongoose, { Mongoose } from "mongoose";

const eventLeadSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
    },
    phonenumber:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        
    },
    eventname:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:0,
    }
},{
    timeStamps:true
})


export const EventLead = mongoose.models.EventLead || mongoose.model('EventLead',eventLeadSchema)