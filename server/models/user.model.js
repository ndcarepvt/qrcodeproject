import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    default: "",
    unique:""
  },
  address: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  city: {
    type: String,
    required:true,
  },
  state: {
    type: String,
    required:true,
  },
  country: {
    type: String,
    required:true,
  },
  pincode: {
    type: Number,
    required:true,
  },
  type: {
    type: String,
    required:true,
  },
  kyc:{
    type:String,
    default:"incomplete"
  },
  patientLead: {
    type: Array,
    default: []
  },
  userLead: {
    type: Array,
    default:[]
  },
  delete:{
    type:Boolean,
    default:false
  }

} , { minimize: false, timestamps:true})

export const User = mongoose.models.User || mongoose.model("User", userSchema)