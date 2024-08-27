import { Admin } from "../models/admin.model.js"
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const registerAdmin = async (req, res)=>{
    const {name,email,password} = req.body;
    console.log(req.file);
    
    try {
        const existAdmin = await Admin.findOne({email})
        
        if(existAdmin){
            res.send({success:false, message:"Admin already exist"})
        }

        if(!validator.isEmail(email)){
            res.send({success:false,message:"Enter valid Email"})
        }

        if(!password.length > 8){
            res.send({success:false, message:"Enter Strong Password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newAdmin = new Admin({
            name:name,
            email:email,
            password:hashPassword,
            
        })

        const admin = await newAdmin.save()
        const token = generateToken(admin._id)

        res.send({success:true,message:token})

    } catch (error) {
        console.log(error)
        res.json({success:true,message:"Error"})
    }
}

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1h'})
}


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).send({ success: false, message: "User Does Not Exist" });
        }     

        if (!password || !admin.password) {
            return res.status(400).send({ success: false, message: "Password is missing or incorrect" });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).send({ success: false, message: "Invalid Credentials" });
        }

        // Generate a token (assuming generateToken is a custom function)
        const token = generateToken(admin._id);

        // Send success response with the token
        return res.send({ success: true, message: token });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "Server Error" });
    }
};

export {registerAdmin, loginAdmin}