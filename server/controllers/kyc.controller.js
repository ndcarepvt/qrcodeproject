import { KYC } from "../models/kyc.model.js";
import { User } from "../models/user.model.js";
import fs from "fs"


const addKYCDetails = async (req, res) => {
    console.log(req.files);
    
    const { panNumber, adhaarNumber, bankAccountNumber, ifscCode, userId } = req.body
    const panLocalName = req.files?.panImage[0]?.filename;
    const adhaarFrontLocalName = req.files?.adhaarFrontImage[0]?.filename;
    const adhaarBackLocalName = req.files?.adhaarBackImage[0]?.filename;
    
    const panLocalPath = req.files?.panImage[0]?.path;
    const adhaarFrontLocalPath = req.files?.adhaarFrontImage[0]?.path;
    const adhaarBackLocalPath = req.files?.adhaarBackImage[0]?.path;

    const imageUnLink = () => {
        try {
            if (panLocalPath) fs.unlinkSync(panLocalPath);
            if (adhaarFrontLocalPath) fs.unlinkSync(adhaarFrontLocalPath);
            if (adhaarBackLocalPath) fs.unlinkSync(adhaarBackLocalPath);
            console.log('All files successfully deleted');
        } catch (err) {
            console.error('Error deleting files:', err);
        }
    };

    try {

        const existingUserForm = await KYC.findOne({ userId: userId })

        if (existingUserForm) {
            if(panLocalPath && adhaarFrontLocalPath && adhaarBackLocalPath){

                imageUnLink()
            }
            return res.send({ success: false, message: "User already Complete KYC" })
        }

        if (!panNumber || !adhaarNumber || !bankAccountNumber || !ifscCode) {
            if(panLocalPath && adhaarFrontLocalPath && adhaarBackLocalPath){
                imageUnLink()
            }
            return res.send({ success: false, message: "Fill the Complete Form" })
        }

        if (panNumber.length != 10 && adhaarNumber.length != 12) {
            if(panLocalPath && adhaarFrontLocalPath && adhaarBackLocalPath){
                imageUnLink()
            }
            return res.send({ success: false, message: "User already Complete KYC" })
        }

        if (!panLocalName) {
            if(panLocalPath && adhaarFrontLocalPath && adhaarBackLocalPath){
                imageUnLink()
            }
            return res.send({ success: false, message: "Pan Image is Required" })
        }
        if (!adhaarFrontLocalName) {
            if(panLocalPath && adhaarFrontLocalPath && adhaarBackLocalPath){
                imageUnLink()
            }
            return res.send({ success: false, message: "Adhaar Front Image is Required" })
        }
        if (!adhaarBackLocalName) {
            if(panLocalPath && adhaarFrontLocalPath && adhaarBackLocalPath){
                imageUnLink()
            }
            return res.send({ success: false, message: "Adhaar Back Image is Required" })
        }



        const kycForm = new KYC({
            panNumber,
            adhaarNumber,
            bankAccountNumber,
            ifscCode,
            panImage: panLocalName,
            adhaarFrontImage: adhaarFrontLocalName,
            adhaarBackImage: adhaarBackLocalName,
            userId: req.body.userId
        })

        console.log(userId);

        onUpdateKYC(userId)

        await kycForm.save()


        res.send({ success: true, message: "Complete User KYC" })
    } catch (error) {
        if(panLocalPath && adhaarFrontLocalPath && adhaarBackLocalPath){
            imageUnLink()
        }
        console.log(error);
        return res.send({ success: false, message: "Error" })
    }
}

const onUpdateKYC = async (id) => {
    try {
        // Find the user by ID
        const user = await User.findOne({ _id: id });
        console.log(user);

        // Update the kyc field
        const updatedKYCStatus = { kyc: "Completed" };

        // Update the user with the new KYC status
        const updatedUser = await User.findByIdAndUpdate(id, updatedKYCStatus, { new: true });
        console.log("User KYC Updated : ", updatedUser);



    } catch (error) {
        console.log(error);
        return { success: false, message: "User KYC update Error" };
    }
};


const upadateKYCDetails = () => {

}
export { addKYCDetails, upadateKYCDetails }