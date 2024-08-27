import React, { memo, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { storeContext } from '../../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const VendorEdit = () => {
    const { userData, token, URL, fetchUserData } = useContext(storeContext);
    const [data, setData] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        password: "",
        phoneNumber: userData?.phoneNumber || "",
        address: userData?.address || "",
        city: userData?.city || "",
        state: userData?.state || "",
        country: userData?.country || "",
        pincode: userData?.pincode || "",
    });

    const onChangeHandler = useCallback((event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    }, []);

    const onSubmitHandler = useCallback(async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(URL + '/api/user/update', data, { headers: { token } });
            // Handle success (e.g., navigate to another page, show a success message)
            if (response.data.success) {
                console.log(response.data.message);
                toast.success(response.data.message)
                fetchUserData(token)

            } else {
                toast.error(response.data.message)

            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("There was an error updating the vendor!", error);
        }
    }, [data]);



    return (
        <div className='bg-[#dddfdf] p-8 w-full'>
            <div className='bg-white p-4 shadow-lg my-4 gap-4 rounded-md text-[#081b2b]'>
                <div>
                    <h2 className='text-xl py-4 font-medium'>Edit vendor</h2>
                </div>
                <hr className='bg-gray-200 h-1' />
                <div className='my-6'>
                    <form className='flex justify-center items-center'>
                        <div className='flex flex-col md:flex-row gap-10 '>
                            <div className='flex flex-col gap-2'>
                                <p><label htmlFor="name" className='text-lg font-semibold'>Full Name *</label></p>
                                <input type="text" id='name' placeholder='Full Name' value={data.name} name="name" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />
                                <p><label htmlFor="email" className='text-lg font-semibold'>Email *</label></p>
                                <input type='email' id='email' name='email' readOnly value={userData.email} onChange={(e) => onChangeHandler(e)} placeholder="Enter Email" className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] bg-[#d4d4d4] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />
                                <p><label htmlFor="phone" className='text-lg font-semibold'>Phone Number *</label></p>
                                <input type="text" id='phone' placeholder='Phone Number' readOnly value={userData.phoneNumber} name="phoneNumber" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] bg-[#d4d4d4] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />
                                <p><label htmlFor="address" className='text-lg font-semibold'>Address *</label></p>
                                <input type="text" id='address' placeholder='Address' value={data.address} name="address" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />


                            </div>
                            <div className='mt-[-2rem] md:mt-0 flex flex-col gap-2'>

                                <p><label htmlFor="city" className='text-lg font-semibold'>City *</label></p>
                                <input type="text" id='city' placeholder='city' value={data.city} name="city" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />
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
                                <input type="text" id='pincode' placeholder='pin Code' value={data.pincode} name="pincode" onChange={(e) => onChangeHandler(e)} className='w-[250px] lg:w-[350px] border-2 border-solid border-[#081b2b] text-[#081b2b] py-1 px-2 rounded-sm outline-none bg-transparent' required autoComplete='off' />

                            </div>

                        </div>

                    </form>
                </div>
                <div className='flex gap-4 items-center py-4 px-2 bg-gray-300 rounded-md'>
                    <button type="submit" onClick={onSubmitHandler} className='py-1 px-2 bg-[#081b2b] text-white rounded-md border-2 border-solid border-gray-100'>Update</button>
                    <Link to="/vendor" className="font-medium text-[#428b4d] dark:text-[#428b4d] hover:underline">Back to list</Link>
                </div>
            </div>
        </div>
    );
}

export default memo(VendorEdit);
