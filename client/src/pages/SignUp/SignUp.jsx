import React, { memo, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { storeContext } from '../../Context/StoreContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const SignUp = () => {


    const navigate = useNavigate()
    const { token, setToken, URL, setUserData, userData, fetchUserData, notification } = useContext(storeContext)
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        city: "",
        type: "",
        state: "",
        country: "",
        pincode: "",
        address: "",

    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }))

    }



    const onSubmitHandler = async (event) => {
        event.preventDefault()

        let newUrl = ""
        newUrl = URL + "/api/user/register"

        console.log(data);

        try {
            const response = await axios.post(newUrl, data)
            if (response.data.success) {
                setToken(response.data.authData)
                setData({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    city: "",
                    type: "",
                    state: "",
                    country: "",
                    pincode: "",
                    address: "",
                })
                console.log(userData);

                localStorage.setItem("token", response.data.authData)
                { notification ? toast.success(response.data.message) : "" }
                fetchUserData(response.data.authData)
                navigate("/dashboard")


            } else {
                { notification ? toast.error(response.data.message) : "" }
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error")

        }

    }


    return (
        <div className=' md:h-[100vh]  bg-[#E9ECEF]'>

            <div className='w-full flex flex-col h-full md:justify-center items-center'>
                <div className='flex flex-col '>
                    <h2 className='text-[#081b2b] font-bold text-4xl mb-5'>Affiliate Sign up</h2>
                    <form onSubmit={onSubmitHandler}>
                        <div className='flex flex-col md:flex-row gap-10 '>
                            <div className='flex flex-col gap-2'>
                                <p><label htmlFor="name" className='text-xl font-semibold'>Full Name *</label></p>
                                <input type="text" id='name' placeholder='Full Name' value={data.fullName} name="name" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />
                                <p><label htmlFor="email" className='text-xl font-semibold'>Email *</label></p>
                                <input type='email' id='email' name='email' value={data.email} onChange={(e) => onChangeHandler(e)} placeholder="Enter Email" className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />
                                <p><label htmlFor="phone" className='text-xl font-semibold'>Phone Number *</label></p>
                                <input type="text" id='phone' placeholder='Phone Number' value={data.phoneNumber} name="phoneNumber" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />

                                <p><label htmlFor="address" className='text-xl font-semibold'>Address *</label></p>
                                <input type="text" id='address' placeholder='Address' value={data.address} name="address" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />

                                <p><label htmlFor="city" className='text-xl font-semibold'>City *</label></p>
                                <input type="text" id='city' placeholder='city' value={data.city} name="city" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />
                            </div>
                            <div className='mt-[-2rem] md:mt-0 flex flex-col gap-2'>


                                <p><label
                                    htmlFor="state"
                                    className='text-xl font-semibold'>State *</label></p>
                                <select type="text"
                                    id='state'
                                    placeholder='Select State'
                                    value={data.state}
                                    name="state"
                                    onChange={onChangeHandler} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off'>

                                    <option value=''>
                                        -- Select State --
                                    </option>
                                    <option value='Andhra Pradesh'>Andhra Pradesh</option>
                                    <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                                    <option value='Assam'>Assam</option>
                                    <option value='Bihar'>Bihar</option>
                                    <option value='Chhattisgarh'>Chhattisgarh</option>
                                    <option value='Goa'>Goa</option>
                                    <option value='Gujarat'>Gujarat</option>
                                    <option value='Haryana'>Haryana</option>
                                    <option value='Himachal Pradesh'>Himachal Pradesh</option>
                                    <option value='Jharkhand'>Jharkhand</option>
                                    <option value='Karnataka'>Karnataka</option>
                                    <option value='Kerala'>Kerala</option>
                                    <option value='Madhya Pradesh'>Madhya Pradesh</option>
                                    <option value='Maharashtra'>Maharashtra</option>
                                    <option value='Manipur'>Manipur</option>
                                    <option value='Meghalaya'>Meghalaya</option>
                                    <option value='Mizoram'>Mizoram</option>
                                    <option value='Nagaland'>Nagaland</option>
                                    <option value='Odisha'>Odisha</option>
                                    <option value='Punjab'>Punjab</option>
                                    <option value='Rajasthan'>Rajasthan</option>
                                    <option value='Sikkim'>Sikkim</option>
                                    <option value='Tamil Nadu'>Tamil Nadu</option>
                                    <option value='Telangana'>Telangana</option>
                                    <option value='Tripura'>Tripura</option>
                                    <option value='Uttar Pradesh'>Uttar Pradesh</option>
                                    <option value='Uttarakhand'>Uttarakhand</option>
                                    <option value='West Bengal'>West Bengal</option>
                                </select>
                                <p><label htmlFor="country" className='text-xl font-semibold'>Country *</label></p>
                                <select type="text"
                                    id='country'
                                    placeholder='Select country'
                                    value={data.country}
                                    name="country"
                                    onChange={onChangeHandler} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off'>

                                    <option value=''>
                                        -- Select Country --
                                    </option>
                                    <option value='United States'>United States</option>
                                    <option value='China'>China</option>
                                    <option value='Japan'>Japan</option>
                                    <option value='Germany'>Germany</option>
                                    <option value='India'>India</option>
                                    <option value='United Kingdom'>United Kingdom</option>
                                    <option value='France'>France</option>
                                    <option value='Italy'>Italy</option>
                                    <option value='Canada'>Canada</option>
                                    <option value='Brazil'>Brazil</option>
                                </select>
                                <p><label htmlFor="pincode" className='text-xl font-semibold'>Pin Code *</label></p>
                                <input type="text"
                                    id='pincode'
                                    placeholder='pin code'
                                    value={data.pincode}
                                    name="pincode"
                                    onChange={(e) => onChangeHandler(e)}
                                    className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />
                                <p><label
                                    htmlFor="type"
                                    className='text-xl font-semibold'>Type *</label></p>
                                <select type="text"
                                    id='type'
                                    placeholder='Select Type'
                                    value={data.type}
                                    name="type"
                                    onChange={onChangeHandler} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off'>

                                    <option value=''>
                                        -- Select Type --
                                    </option>
                                    <option value='Affiliate'>
                                        Affilate
                                    </option>
                                </select>

                                <p><label htmlFor="password" value={data.password} className='text-xl font-semibold'>Password</label></p>
                                <div className='flex justify-between items-center w-[250px] lg:w-[350px] mb-6 border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none'>

                                    <input type={showPassword ? 'text' : 'password'} id='password' name='password' onChange={(e) => onChangeHandler(e)} placeholder='enter password' className='outline-none bg-transparent w-[90%]' />

                                    {showPassword ? <FaEye className='cursor-pointer' onClick={() => { setShowPassword(showPassword ? false : true) }} /> : <FaEyeSlash className='cursor-pointer' onClick={() => { setShowPassword(showPassword ? false : true) }} />}


                                </div>

                            </div>

                        </div>
                        <div className='w-full flex flex-col justify-center items-center my-6 gap-2'>
                            <button className='border-1 w-[10rem] border-solid border-[#081b2b] text-white py-1 px-3 bg-[#081b2b] hover:bg-[#081b2b] hover:text-[#b2caef] transition-all rounded-md' type="submit">signUp </button>
                            <p>have an account <span className='text-[#081b2b] cursor-pointer' onClick={() => { navigate('/') }}>login</span></p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default memo(SignUp)