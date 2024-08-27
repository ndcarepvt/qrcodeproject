import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { storeContext } from '../../Context/StoreContext';
import axios from 'axios'

const Home = () => {

  const navigate = useNavigate()
  const { token, setToken, URL } = useContext(storeContext)
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



  const onSubmitHandler = async (event) => {
    event.preventDefault()

    let newUrl = URL + "/api/admin/login"
    

    const response = await axios.post(newUrl, data)
    if (response.data.success) {
      setToken(response.data.message)
      setData({
        email: "",
        password: "",
      })
      navigate("/dashboard")

      localStorage.setItem("token", response.data.message)


    } else {
      console.log(error);
    }

  }

  return (
    <>
      <div className='flex h-[90vh] my-0 '>

        <div className='w-full flex flex-col justify-center items-center'>
          <div className='flex flex-col '>
            <h2 className='text-green-900 font-bold text-4xl mb-5'>Admin Login</h2>
            <form onSubmit={onSubmitHandler}>
              <div className='flex flex-col gap-3 '>
               
                <p><label htmlFor="email" className='text-xl font-semibold'>Email</label></p>
                <input type='email' id='email' name='email' onChange={(e) => onChangeHandler(e)} placeholder="enter email" className='w-[250px] border-2 border-solid border-green-900 text-green-900 py-1 px-2 rounded-md outline-none' required autoComplete='off' />
                <p><label htmlFor="password" className='text-xl font-semibold'>Password</label></p>
                <div className='flex gap-7 items-center w-[250px] border-2 border-solid border-green-900 text-green-900 py-1 px-2 rounded-md outline-none'>

                  <input type={showPassword ? 'text' : 'password'} id='password' name='password' onChange={(e) => onChangeHandler(e)} placeholder='enter password' className='outline-none' />

                  {showPassword ? <FaEye className='cursor-pointer' onClick={() => { setShowPassword(showPassword ? false : true) }} /> : <FaEyeSlash className='cursor-pointer' onClick={() => { setShowPassword(showPassword ? false : true) }} />}


                </div>
                <button className='border-2 border-solid border-green-900 text-white py-1 px-3 bg-green-900 hover:bg-green-900 hover:text-[#b2caef] transition-all rounded-md' type='submit'>Login</button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Home