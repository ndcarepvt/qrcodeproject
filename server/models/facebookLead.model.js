import mongoose from 'mongoose'

const fbLeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    fbid: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sheetname: {
        type: String,
        default: ""
    },
    formname: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        default: "facebook",
    },
    adincharge: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    countrysource: {
        type: String,
        default: null
    },
    callinitiated: {
        type: Number,
        default: 0
    },
}, { timestamps: true })


export const FBLead = mongoose.model('FBLead', fbLeadSchema)