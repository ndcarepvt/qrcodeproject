import React, { memo, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const KycPage = () => {

    const {setKyc, fetchUserData,URL,token, notification} = useContext(storeContext)
    const navigate = useNavigate()
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [data, setData] = useState({
       
        panNumber: "",
        adhaarNumber: "",
        bankAccountNumber: "",
        ifscCode: "",
    })


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }))
        console.log(data);
        
    }

    const onSubmitHandler = async (event) =>{
        event.preventDefault()

        if (data.panNumber == "" || data.adhaarNumber == "" || data.bankAccountNumber == "" || data.ifscCode == "") {
            return  notification ? toast.error("Complete the Form Details") : "" 
        }
        
        if (data.panNumber.length !== 10) {
            const errorMessage = "PAN number must be 10 characters long.";
            return notification ? toast.error(errorMessage) : "";
        }

        if ( data.adhaarNumber.length !== 12) {
            const errorMessage = "Aadhaar number must be 12 characters long.";
            return notification ? toast.error(errorMessage) : "";
        }

        if( image1 == null || image2 == null || image3 == null){
            const errorMessage = "Images are Required";
            return notification ? toast.error(errorMessage) : "";
        }

        const formData = new FormData()

        formData.append("adhaarNumber",data.adhaarNumber)
        formData.append("panNumber",data.panNumber)
        formData.append("bankAccountNumber",data.bankAccountNumber)
        formData.append("ifscCode",data.ifscCode)
        formData.append("panImage", image1)
        formData.append("adhaarFrontImage", image2)
        formData.append("adhaarBackImage", image3)

        console.log(formData);
        
        const response = await axios.post(URL+'/api/kycform/add', formData, {headers:{token}})
        if (response.data.success) {
            
            setData({
                panNumber: "",
                adhaarNumber: "",
                bankAccountNumber: "",
                ifscCode: "",
            })
            setImage1("")
            setImage2("")
            setImage3("")
           fetchUserData(token)
            { notification ? toast.success(response.data.message) : "" }
            navigate("/dashboard")

        } else {
            { notification ? toast.error(response.data.message) : "" }
            console.log(error);
        }

    }

    return (
        <div className='bg-[#dddfdf] p-8 w-full h-full md:h-[84vh]'>
            <div className='bg-white p-4 shadow-lg my-4 gap-4 rounded-md text-[#081b2b] '>

                <div>
                    <h2 className='text-xl py-4 font-medium'>Kyc Complete</h2>
                </div>
                <hr className='bg-gray-200 h-1' />
                <div className='my-6'>
                    <form className='flex justify-center items-center'>
                        <div className='flex flex-col md:flex-row gap-10 '>
                            <div className='flex flex-col gap-2'>
                                <p><label htmlFor="pan" className='text-xl font-semibold'>PAN Number *</label></p>
                                <input type="text" id='pan' placeholder='PAN Number' value={data.panNumber} name="panNumber" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />


                                <p><label htmlFor="adhaar" className='text-xl font-semibold'>Adhaar Number *</label></p>
                                <input type="Number" min={0} id='adhaar' placeholder='Adhaar Number' value={data.adhaarNumber} name="adhaarNumber" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />


                                <p><label htmlFor="bankAccount" className='text-xl font-semibold'>Bank Account Number *</label></p>
                                <input type="Number" id='bankAccount' value={data.bankAccountNumber} placeholder='Bank Account Number' name="bankAccountNumber" min={0} onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />


                                <p><label htmlFor="ifscCode" className='text-xl font-semibold'>IFSC Code Number *</label></p>
                                <input type="text" id='ifscCode' placeholder='IFSC Code Number' value={data.ifscCode} name="ifscCode" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />
                               
                               

                            </div>
                            <div className='flex flex-col gap-2'>

                                <p><label htmlFor="panFile" className='text-xl font-semibold'>PAN Card Image *</label></p>
                                <input type='file' id='panFile' name='panImage' onChange={(e) => setImage1(e.target.files[0])} placeholder="enter email" className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />

                                <p><label htmlFor="adhaarfront" className='text-xl font-semibold'>Adhaar Card Front Image *</label></p>
                                <input type='file' id='adhaarfront' name='adhaarfrontimage' onChange={(e) => setImage2(e.target.files[0])} placeholder="enter email" className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />

                                <p><label htmlFor="adhaarbackimage" className='text-xl font-semibold'>Adhaar Card Back Image *</label></p>
                                <input type='file' id='adhaarbackimage' name='adhaarbackimage' onChange={(e) => setImage3(e.target.files[0])} placeholder="enter email" className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />

                            </div>
                        </div>

                    </form>
                </div>
                <div className='flex gap-4 items-center py-4 px-2 bg-gray-300 rounded-md'>
                    <button className='py-1 px-2 bg-[#081b2b] text-white rounded-md border-2 border-solid border-gray-100' onClick={onSubmitHandler}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default memo(KycPage)