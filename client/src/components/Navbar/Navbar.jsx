import React, { memo, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'
import { MdLogout } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { assests } from '../../assets/assests';
import { FaUser } from "react-icons/fa6";
import { toast } from 'react-toastify';

const Navbar = ({ showSideBar, setShowSideBar }) => {

    const { token, setToken, userData, notification } = useContext(storeContext)
    const [showAccount, setShowAccount] = useState(false)
    const navigate = useNavigate()

    const logOutHandler = () => {
        setToken("")
        localStorage.removeItem("token")
        {notification?toast.info("User LogOut"):""}
        navigate('/')
    }

    return (
        <div>
            <div className='flex justify-between items-center px-4 sm:px-10 h-[70px] w-full text-[#081b2b] bg-white'>
                <div>
                    <p className='text-[#343a40] text-lg cursor-pointer' onClick={() => setShowSideBar(showSideBar ? false : true)}><FaBars /></p>
                </div>
                <div>
                    <img src={assests.logo2} loading='lazy' alt="logo" className='hidden sm:block sm:w-[250px]' />
                </div>
                <div>
                    {!token ? <div>
                        <Link to='/'>
                            <button className='text-center px-4 py-2 bg-[#585d63] hover:bg-[#343a40] hover:text-lg transition-all text-white border-2 border-solid border-white rounded-md'>Login</button>
                        </Link>
                    </div> : <div>
                        <div className='flex flex-col group relative'>
                            <p onClick={()=>setShowAccount(showAccount?false:true)} className='flex cursor-pointer items-center gap-1'><FaUser />{userData?userData.email:""}</p>
                            {/* <img src={assets.profile_icon} alt="" className='cursor-pointer' /> */}
                            <ul className={`absolute z-50 mt-10 bg-[#343a40] text-gray-300 border-2 min-w-[200px] max-w-[250px] border-solid hover:cursor-pointer border-[#081b2b] w-[10rem] rounded-md  child   flex flex-col transition-all right-0 ${showAccount?'visible':'invisible'}`}>
                                <Link to='/vendor' className='flex gap-1 py-4 hover:bg-[#bae0bf] hover:text-[#428b4d] hover:font-semibold'>
                                    {/* <img src={assets.bag_icon} className='w-[25px]' alt="" /> */}
                                    <p className=' px-2  '>My Account</p>
                                </Link>
                                <hr className='h-[2px] bg-[#081b2b]' />
                                <li className='flex gap-1 hover:font-semibold hover:cursor-pointer hover:bg-[#bae0bf] py-4 hover:text-[#428b4d]' onClick={logOutHandler}>
                                    {/* <img src={assets.logout_icon} alt="" className='w-[25px]' /> */}
                                    <p className=' px-2'>Log Out</p>
                                </li>
                            </ul>
                        </div>
                       
                    </div>}


                    {/* <Link to='/login'>
                    <button className='text-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white border-2 border-solid border-white rounded-md'>{token?<div className='flex items-center gap-2'><MdLogout /> Log out</div> : "Login"}</button>

                     <button className='text-center flex items-center gap-2 px-4 py-2 bg-[#585d63] hover:bg-[#343a40] text-white border-2 border-solid border-white rounded-md' onClick={logOutHandler}><MdLogout /> Log out</button>

                </Link> */}
                </div>
            </div>
            {/* <div className='flex justify-center items-center sm:hidden px-4 h-[50px] w-full text-white bg-green-900'>
                <ul className='flex items-center gap-6'>
                <Link to='/'>
                    Home
                </Link>
                <Link to='/myqrcode'>
                    My QR
                </Link>
                <Link to='/mylead'>
                    My Leads
                </Link>
                </ul>
            </div> */}
        </div>
    )
}

export default memo(Navbar)