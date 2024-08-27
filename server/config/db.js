import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () =>{

  try{
    await mongoose.connect(`mongodb+srv://githubndcare:qrcode4321@cluster0.cvj61.mongodb.net/${DB_NAME}`);
    console.log(`MongoDB Connected `);
  }catch(error){
    console.log("MONGODB Connection Failed : ",  error)
  }

}     

export {connectDB}