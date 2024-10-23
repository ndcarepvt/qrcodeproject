import mongoose from "mongoose";

const bookSlotSchema = new mongoose.Schema({
    bookedSlots : {
        type:Object,
        default:{},
        required:true
    },
    bookDates:{
        type:Array,
        default:[],
        required:true
    },
    customId:{
        type:Number,
        default:0,
        unique:true
    }
},{minimize: false})

export const BookSlot = mongoose.models.BookSlot || mongoose.model("BookSlot", bookSlotSchema)