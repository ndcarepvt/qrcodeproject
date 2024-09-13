import React, { memo, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { storeContext } from '../../Context/StoreContext'
import OtpInput from '../../components/OtpInput/OtpInput'

const ReferPatientVerify = () => {

// Varibles Decleration
    const params = useParams();
    const navigate = useNavigate()
    const [otpVal, setOtpVal] = useState("")
    const [location, setLocation] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [ShowOtpInput, setShowOtpInput] = useState(false)
    const { URL, userData, notification, token } = useContext(storeContext);
    const [data, setData] = useState({
        email:"",
        phoneNumber:"",
        city:"",
        state:"",
        country:"",
    })
    
// catch input data onchange
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        if(name == "phoneNumber"){
          setPhoneNumber(value)
        }
        
      };
    
  
// location Tracking
  function getLocationDetails(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLocation(data.address.country);
        setData({
          email:"",
          phoneNumber:"",
          city:data.address.city,
          state:data.address.state,
          country:data.address.country,
      })
      })
      .catch(error => console.error("Error:", error));
  }

  const locationSuccess = (postion) =>{
    getLocationDetails(postion.coords.latitude, postion.coords.longitude)
    
  }
  const locationError = () =>{
    console.log("User Block his Location");
    
  }

  const getLocation = () =>{
    const result = navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    
  }

// Onload handler useEffect

useEffect(() => {
  
getLocation()
    
}, [])


// OTP Show generate and validate
const onSubmithandler = async (event) => {
  event.preventDefault();

  // phone validations
  const regex = /[^0-9]/g;
  if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
    alert("Invalid Phone Number");
    return;
  }

  const otpUrl = URL+'/api/patient/verify-number'
  // Call BE API
  try {
    const response = await axios.post(otpUrl, {phoneNumber})

  if(response){
    
    setOtpVal(response.data.otp)
  }

  // show OTP Field
  setShowOtpInput(true);
  } catch (error) {
    console.log(error);
    
  }
};

// otp verified
const onOtpSubmit = (otp) => {
  if(otp == otpVal){
    console.log("Number Verify Successful", otp);
    toast.success("OTP Verified")
    setOtpVal("")
    onSubmitDataHandler()

  } else {
    console.log("error otp");
    toast.error("Wrong OTP")
  }
};

// after otp verified send data to database
const onSubmitDataHandler = async () =>{
  const otpUrl = URL+'/api/patient/add'
  const userId = params.userId
  // Call BE API
  try {
    const response = await axios.post(otpUrl, {...data, userId})
    
  if(response){

    navigate(`/referpatient/${userId}?phoneNumber=${phoneNumber}`);
    toast.success(response.data.message);
    toast.info("Please add Some More Information");
  }
  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <>
        {location?<>{!ShowOtpInput?<div className='flex md:h-screen my-0 bg-[#E9ECEF] p-10'>
      <div className='w-full py-5 flex flex-col md:justify-center items-center bg-white rounded-xl'>
        <h1 className='text-[#081b2b] font-bold text-center text-4xl mb-5'>Rishtpusht Contact Form</h1>
        <form onSubmit={onSubmithandler} className='flex flex-col gap-4 w-[40%] md:w-[250px]'>
          <div className='flex flex-col md:flex-row gap-10'>
            <div className='flex flex-col gap-4 w-full'>
             {location == "India" ? <div className='w-full'>
                <input
                  type="text"
                  id='number'
                  required
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={onChangeHandler}
                  placeholder="Enter Mobile Number"
                  className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                />
              </div>: <div className='w-full'>
                <input
                  type="text"
                  id='fullName'
                  required
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={onChangeHandler}
                  placeholder="Enter Mobile Number"
                  className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                />
                <input
                  type="text"
                  id='fullName'
                  required
                  name="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  placeholder="Enter Email"
                  className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                />
              </div>}
            </div>
          </div>
          <button type="submit" className="p-2 my-2 cursor-pointer bg-[#3e454b] border-2 border-solid border-[#3e454b] text-white w-[100%] text-lg rounded-md">Submit</button>
        </form>
      </div>
    </div>:<div>
              <OtpInput length={6} onOtpSubmit={onOtpSubmit} otp/>
      </div>}</>:<></>}
    </>
  )
}

export default ReferPatientVerify