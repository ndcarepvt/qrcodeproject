import React, { memo, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storeContext } from '../../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const VendorDelete = () => {

    const {userData, token, URL, setToken} = useContext(storeContext)
    const navigate = useNavigate()

    const onDeleteHandler = async () =>{
        const deleteURL = URL+'/api/user/delete'
        try {
            const response = await axios.post(deleteURL, {}, { headers: { token } })
            if(response.data.success){
                toast.success(response.data.message)
                console.log(response.data);
                setToken("")
                localStorage.removeItem('token')
                navigate('/')
                
            } else {
                toast.error(response.data.message)
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className='bg-[#dddfdf] p-8 w-full h-screen'>
            <div className='bg-white p-4 shadow-lg my-4 gap-4 rounded-md text-[#081b2b] '>
                <div className='flex gap-4 items-center py-4 px-2 bg-gray-300 rounded-md'>
                    <h2 className='text-xl py-4 px-4 font-medium'>Are you Sure You Want to Do This</h2>
                </div>
                <div className='flex justify-around'>
                    <div className='text-lg font-bold flex flex-col gap-5 py-10'>
                        <p>Name</p>
                        <p>Phone Number</p>
                        <p>Email</p>
                        <p>Company</p>
                        <p>Type</p>
                    </div>
                    <div className='text-lg font-bold flex flex-col gap-5 py-8'>
                        <p>{userData.name}</p>
                        <p>{userData.phoneNumber}</p>
                        <p>{userData.email}</p>
                        <p>Not Discloed</p>
                        <p>{userData.type}</p>
                    </div>
                </div>
                <div className='flex gap-4 items-center py-4 px-2 bg-gray-300 rounded-md'>
                    <button className='py-1 px-2 bg-[#081b2b] text-white rounded-md border-2 border-solid border-gray-100' onClick={onDeleteHandler}>Delete</button>
                    <Link to="/vendor" className="font-medium text-[#428b4d] dark:text-[#428b4d] hover:underline">back to list</Link>
                </div>
            </div>
        </div>
    )
}

export default memo(VendorDelete)