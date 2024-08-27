import validator from "validator";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res)=>{
    const {name,email,password,phoneNumber, address, city, state, country, pincode, type} = req.body;
    // const panImage =  `${req.files.filename}`;
    console.log(name,email,"type:",type)
    
    try {
        const existUser = await User.findOne({email})
        
        if(existUser){
            res.send({success:false, message:"User already exist"})
        }

        if(!validator.isEmail(email)){
            res.send({success:false,message:"Enter valid Email"})
        }

        if(!password.length > 8){
            res.send({success:false, message:"Enter Strong Password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            name:name,
            email:email,
            password:hashPassword,
            address:address,
            phoneNumber:phoneNumber,
            city:city,
            state:state,
            pincode:pincode,
            country:country,
            type:type
        })

        const user = await newUser.save()
        const token = generateToken(user._id)

        res.send({success:true,authData:token,userData:user, message:"User Registered"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn : '1h'})
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({email});

        if (!user || user.delete == true) {
            return res.send({ success: false, message: "User Does Not Exist" });
        }     

        if (!password || !user.password) {
            return res.send({ success: false, message: "Password is missing or incorrect" });
        }


        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send({ success: false, message: "Invalid Credentials" });
        }

        // Generate a token (assuming generateToken is a custom function)
        const token = generateToken(user._id);

        // Send success response with the token
        res.send({success:true,authData:token,userData:user, message:"User Login"})

    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "Server Error" });
    }
};

const getUserDetail = async (req, res) => {
    const { userId } = req.body;

    try {
        // Use .lean() to get plain JavaScript object instead of Mongoose document
        const userDetail = await User.findById(userId).select('-password').lean();

        if (userDetail) {
            res.send({ success: true, userData: userDetail, message: "Complete Data Fetching" });
        } else {
            res.status(404).send({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Server Error" });
    }
};


const updateUser = async (req, res) => {
    const { userId, name, email, state, pincode, city, address, country } = req.body;
    try {
        // Update user directly using findByIdAndUpdate
        const user = await User.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                state,
                pincode,
                city,
                address,
                country
            },
            { new: true } // Optionally return the updated user
        );

        res.send({ success: true, message: "User Details Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error updating user details" });
    }
};


const deleteUser = async (req, res) => {
    const { userId } = req.body;

    try {
        // Use findByIdAndDelete to remove the user
        const deletedUser = await User.findOne({_id:userId});
        
        let deleteVal = deleteUser.delete
        deleteVal = true

        const user = await User.findByIdAndUpdate(
            userId,
            {
               delete:deleteVal,
            },
            { new: true } 
        );
        if (user) {
            res.send({ success: true, message: "User Deleted Successfully" });
        } else {
            res.status(404).send({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error deleting user" });
    }
};


export {registerUser, loginUser, getUserDetail, updateUser, deleteUser}