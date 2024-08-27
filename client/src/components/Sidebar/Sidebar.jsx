import React, { memo, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import { GoCrossReference } from "react-icons/go";
import { MdOutlineSpatialAudioOff } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { storeContext } from '../../Context/StoreContext';
import { FaUserCheck } from "react-icons/fa";
import { toast } from 'react-toastify';


const Sidebar = ({ setShowSideBar, showSideBar }) => {

    const { token, lock, setLock, notification, setNotification } = useContext(storeContext)

    const onNotifyHandler = () => {
        if (notification == true) {
            setNotification(false)
            toast.success("Notification Closed")
        } else {
            setNotification(true)
            toast.success("Notification On")
        }


    }

    return (
        <div>

            <div className={` ${showSideBar ? "w-[60%] sm:w-[30%] md:w-[30%] lg:w-[20%] xl:w-[20%] block" : "hidden sm:block sm:w-[15%] md:w-[12%] lg:w-[12%] xl:w-[8rem]"} h-full ${token ? "flex flex-col justify-between" : ""} sm:fixed overflow-auto bg-[#081b2b] p-4 shadow-xl shadow-blue-gray-900/5  transition-all absolute z-50 md:z-0`}>
                {showSideBar ? <div className="mb-4 flex justify-around items-center">
                    <h2 className='text-2xl text-white'>
                        {/* {notification?"RishtPusht":""} */}
                        RishtPusht
                    </h2>
                    {/* <div onClick={()=>setShowSideBar(false)} >

                    <RxCross2 className='text-lg text-white' />
                    </div> */}
                </div> : <></>}


                <div className={` bg-[#081b2b] ${!showSideBar ? "mt-10" : ""} mb-3 flex flex-col items-center `} >

                    <div className='' >
                        <ul className={`flex flex-col text-md justify-center ${showSideBar ? "items-start" : "items-center"} gap-3 text-gray-400 flex-wrap `} >
                            <NavLink to="/dashboard" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><FaHome /> {showSideBar ? "Dashboard" : ""}</NavLink>
                            {token ? <>
                                <NavLink to="/kyc" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><FaUserCheck /> {showSideBar ? "Kyc" : ""}</NavLink>
                                <NavLink to="/products" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><AiFillProduct /> {showSideBar ? "Products" : ""}</NavLink>

                                <NavLink to="/addtocart" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><IoCart /> {showSideBar ? "Add To Cart" : ""}</NavLink>

                                <NavLink to="/vendorsale" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><FaRegCircleUser />{showSideBar ? "Vendor Sale" : ""}</NavLink>
                                <NavLink to="/bankdetails" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><CiBank />{showSideBar ? "Bank Details" : ""}</NavLink>
                                <NavLink to="/shareandearn" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><IoMdShare />{showSideBar ? "Share and Earn" : ""}</NavLink>
                                <NavLink to="/referuser" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><GoCrossReference />{showSideBar ? "Refer User" : ""}</NavLink>
                                <NavLink to="/allreferredpatient" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><FaUsers />{showSideBar ? "All referred Patient" : ""}</NavLink>
                                <NavLink to={`/referpatient`} className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><MdOutlineSpatialAudioOff />{showSideBar ? "Refer Patient" : ""}</NavLink>
                                <NavLink to="/vendor" className={({ isActive }) => `flex gap-4 px-4 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"} ${isActive ? "bg-[#bae0bf] text-[#428b4d]" : ""} hover:bg-[#bae0bf] rounded-md items-center hover:text-[#428b4d] font-normal`}><FiUser />{showSideBar ? "Vendor" : ""}</NavLink>
                            </> : <></>}
                        </ul>
                    </div>

                </div>
                {token ? <div className={`flex gap-4 px-4 text-gray-400 p-2 w-full ${showSideBar ? "justify-start" : "justify-center"}  rounded-md items-center font-normal`}>{showSideBar ? "Notification" : ""}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onClick={onNotifyHandler}
                            defaultChecked
                        />
                        <div className="w-9 h-5 bg-[#081b2b] border-2 border-solid border-[#428b4d] hover:bg-[#3b3c3d] peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-[#081b2b] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#428b4d] hover:peer-checked:bg-[#428b4d]"></div>
                    </label>

                </div> : <></>}
            </div>

            <div className={`h-full bg-black opacity-65 w-[100%] absolute top-[0%] overflow-auto  ${showSideBar ? 'sm:hidden' : 'hidden'}`} onClick={() => setShowSideBar(false)}></div>
        </div>
    )
}

export default memo(Sidebar)