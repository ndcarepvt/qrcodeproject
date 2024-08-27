import React, { memo, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { storeContext } from '../../Context/StoreContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = ({ signUp, setSignUp }) => {

  const navigate = useNavigate()
  const { token, setToken, URL, userData, setUserData, fetchUserData, notification } = useContext(storeContext)
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  })


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    

    setData(data => ({ ...data, [name]: value }))

  }

  useEffect(() => {
    if (token) {
      navigate("/dashboard")
    } else if (!token) {

    }

  }, [token])



  const onSubmitHandler = async (event) => {
    event.preventDefault()
    let newUrl = ""
    newUrl = URL + "/api/user/login"

    try {
      const response = await axios.post(newUrl, data)
      if (response.data.success) {
        setToken(response.data.authData)
        setData({
          email: "",
          password: "",
        })
        
        localStorage.setItem("token", response.data.authData)
        fetchUserData(response.data.authData)
        {notification?toast.success(response.data.message):""}
        navigate("/dashboard")
        
      } else {
        console.log(response.data.message);
        {notification?toast.error(response.data.message):""}
        console.log(error);
        
      }
    } catch (error) {
      console.log(error);

    }

  }

  return (
    <>
      <div className='flex h-[100vh] my-0 bg-[#E9ECEF]'>

        <div className='w-full flex flex-col justify-center items-center'>
          <div className='flex flex-col '>
            <h2 className='text-[#081b2b]  font-bold text-4xl mb-5'>Affiliate Login</h2>
            <form onSubmit={onSubmitHandler}>
              <div className='flex flex-col gap-3 '>

                <p><label htmlFor="email" className='text-xl font-semibold'>Email</label></p>
                <input type='email' id='email' name='email' onChange={(e) => onChangeHandler(e)} placeholder="enter email" className='w-[250px] border-2 border-solid bg-transparent border-[#081b2b]  text-[#081b2b]  py-1 px-2 rounded-sm outline-none' required autoComplete='off' />
                <p><label htmlFor="password" className='text-xl font-semibold'>Password</label></p>
                <div className='flex gap-7 items-center w-[250px] border-2 border-solid border-[#081b2b]  text-[#081b2b] py-1 px-2 rounded-sm outline-none'>

                  <input type={showPassword ? 'text' : 'password'} id='password' name='password' onChange={(e) => onChangeHandler(e)} placeholder='enter password' className='outline-none bg-transparent' />

                  {showPassword ? <FaEye className='cursor-pointer' onClick={() => { setShowPassword(showPassword ? false : true) }} /> : <FaEyeSlash className='cursor-pointer' onClick={() => { setShowPassword(showPassword ? false : true) }} />}


                </div>
                <button className='border-2 border-solid border-[#081b2b]  text-white py-1 px-3 bg-[#081b2b]  hover:bg-[#081b2b]  hover:text-[#b2caef] transition-all rounded-md' type='submit'>{signUp ? "Register" : "Login"}</button>
              </div>
            </form>
            <p>{signUp ? "have an account?" : "don't have a account?"}   <span className='text-[#081b2b]  cursor-pointer' onClick={() => { navigate('/signup') }}>signUp</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Login)