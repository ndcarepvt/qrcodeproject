import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () =>{

  try{
    await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
    console.log(`MongoDB Connected `);
  }catch(error){
    console.log("MONGODB Connection Failed : ",  error)
  }

}     

export {connectDB}