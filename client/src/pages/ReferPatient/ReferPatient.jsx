import React, { memo, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { storeContext } from '../../Context/StoreContext'

const ReferPatient = () => {

  // variables Decleration
  let params = useParams();
  const [submitLoad, setSubmitLoad] = useState(false)
  const { URL, userData, notification, token } = useContext(storeContext);
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    emailId: "",
    healthType: "",
    disease: "",
    country: "",
    state: "",
    city: "",
  });


  // on change value handle in all input fields
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log(data);

  };

  // fetch user(patient) location
  async function getLocationDetails(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Location Details:", data);
        let country = data.address.country
        let state = data.address.state
        let city = data.address.city
        setData((prev) => ({ ...prev, country, state, city }))
      })
      .catch(error => console.error("Error:", error));
  }

  const locationSuccess = (postion) => {
    getLocationDetails(postion.coords.latitude, postion.coords.longitude)

  }
  const locationError = () => {
    console.log("Patient Block his Location");

  }

  const getLocation = () => {
    const result = navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

  }


  useEffect(() => {
    onLoad()

  }, [data.country, data.state, data.city])

  // onload run functions
  const onLoad = async () => {
    getLocation()
    const phoneNumber = getNumber()
    setData((prev) => ({ ...prev, phoneNumber }))
  }

  // get numbers throw url
  const getNumber = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const getPhoneNumber = urlParams.get('phoneNumber')
    return getPhoneNumber

  }

  // send data to new database
  const onSendHandler = async (patientCode) => {
    const sendURL = `${URL}/api/patient/add`;
    try {
      const userId = token ? userData._id : params.usertoken;

      const response = await axios.post(sendURL, { ...data, patientId: patientCode, userId });

      if (response.data.success) {
        setSubmitLoad(false)
        { token ? notification && toast.success(response.data.message) : toast.success(response.data.message) }
        setData({
          name: "",
          phoneNumber: "",
          emailId: "",
          healthType: "",
          disease: "",
          country: "",
          state: "",
          city: "",
        });
      } else {
        { token ? notification && toast.error(response.data.message) : toast.error(response.data.message) }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // send data to old crm database
  const onSubmithandler = async (event) => {
    event.preventDefault();
    setSubmitLoad(true)

    if (data.healthType === "Corporate") {
      await onSendHandler();
    } else {

      const url = "https://ndayurveda.info/api/query/newpatient";

      try {
        const response = await axios.post(url, data);
        if (response.data.success) {
          onSendHandler(response.data.patientCode);

        } else {
          console.error(response.data.message);
          toast.error(response.data.message)
        }
      } catch (error) {
        console.error(error);
      }
    }

  };

  return (
    <>
      <div className='flex md:h-screen my-0 bg-[#E9ECEF] p-10'>
        <div className='w-full py-5 flex flex-col md:justify-center items-center bg-white rounded-xl'>
          <h1 className='text-[#081b2b] font-bold text-center text-4xl mb-5'>Rishtpusht Contact Form</h1>
          <form onSubmit={onSubmithandler} className='flex flex-col gap-4 w-[70%]'>
            <div className='flex flex-col md:flex-row items-center justify-center gap-10'>
              <div className='flex flex-col gap-4 w-full'>
                <div className='w-full'>
                  <p className='text-lg font-semibold'><label htmlFor="fullName">Full Name</label></p>
                  <input
                    type="text"
                    id='fullName'
                    required
                    name="name"
                    value={data.name}
                    onChange={onChangeHandler}
                    placeholder="Name"
                    className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                  />
                </div>
                <div>
                  <p className='text-lg font-semibold '><label htmlFor="phoneNumber">Phone Number</label></p>
                  <input
                    type="text"
                    id='phoneNumber'
                    required
                    name="phoneNumber"
                    value={data.phoneNumber}
                    onChange={onChangeHandler}
                    placeholder="Contact"
                    className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                  />
                </div>
                {
                  data.country && data.country != "India" ? <div>
                    <p className='text-lg font-semibold'><label htmlFor="Email">Email (optional)</label></p>
                    <input
                      type="email"
                      id='Email'
                      name="emailId"
                      value={data.emailId}
                      onChange={onChangeHandler}
                      placeholder="Enter Your Email"
                      className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                    />
                  </div> : <></>
                }
                <div>
                  <p className='text-lg font-semibold'><label htmlFor="city">City</label></p>
                  <input
                    type="text"
                    id='city'
                    required
                    name="city"
                    value={data.city}
                    onChange={onChangeHandler}
                    placeholder="Enter Your City"
                    className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                  />
                </div>
              </div>
              <div className='flex flex-col gap-4 w-full'>

                <div>
                  <p><label htmlFor="country" className='text-xl font-semibold'>Country *</label></p>
                  <select type="text"
                    id='country'
                    placeholder='Select country'
                    value={data.country}
                    name="country"
                    onChange={onChangeHandler} className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600" required autoComplete='off'>

                    <option value=''>
                      -- Select Country --
                    </option>

                    <option value='India'>India</option>

                  </select>
                </div>
                <div>
                  <p><label
                    htmlFor="state"
                    className='text-xl font-semibold'>State *</label></p>
                  <select type="text"
                    id='state'
                    placeholder='Select State'
                    value={data.state}
                    name="state"
                    onChange={onChangeHandler} className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600" required autoComplete='off'>

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
                </div>
                <div>
                  <p className='text-lg font-semibold'><label htmlFor="healthType">Type</label></p>
                  <select
                    name="healthType"
                    id="healthType"
                    value={data.healthType}
                    onChange={onChangeHandler}
                    className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                  >
                    <option value="">-- Select Option --</option>
                    <option value="Healthy">Healthy</option>
                    <option value="UnHealthy">Un-healthy</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                {data.healthType === "UnHealthy" && (
                  <div>
                    <p className='text-lg font-semibold'><label htmlFor="disease">Disease</label></p>
                    <select
                      name="disease"
                      id="disease"
                      value={data.disease}
                      onChange={onChangeHandler}
                      className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                    >
                      <option value="Anti-Oxidant">Anti-Oxidant</option>
                      <option value="Autism">Autism</option>
                      <option value="Bone-Joint-Health">Bone-Joint-Health</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Cholestrol-Care">Cholestrol-Care</option>
                      <option value="Cleansing and detox">Cleansing and detox</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Cough & Cold">Cough & Cold</option>
                      <option value="Diabetes">Diabetes</option>
                      <option value="Epilepsy">Epilepsy</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Heart">Heart</option>
                      <option value="Hepatitis">Hepatitis</option>
                      <option value="HIV">HIV</option>
                      <option value="Honey">Honey</option>
                      <option value="Hypothiroidism">Hypothiroidism</option>
                      <option value="Immunity Enhancer">Immunity Enhancer</option>
                      <option value="irritate bowl syndrome">IBS(irritate bowl syndrome)</option>
                      <option value="Kidney">Kidney</option>
                      <option value="Liver">Liver</option>
                      <option value="Men">Men</option>
                      <option value="Memory">Memory</option>
                      <option value="Others">Others</option>
                      <option value="Pancreas">Pancreas</option>
                      <option value="Parkinsonism">Parkinsonism</option>
                      <option value="Rejuvenating">Rejuvenating</option>
                      <option value="Seasonal">Seasonal</option>
                      <option value="Skin care">Skin care</option>
                      <option value="Stomach Disorders">Stomach Disorders</option>
                      <option value="Stress">Stress</option>
                      <option value="Teen">Teen</option>
                      <option value="Traditional-Formulation">Traditional-Formulation</option>
                      <option value="Weight">Weight</option>

                    </select>
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="p-2 my-2 cursor-pointer bg-[#3e454b] border-2 border-solid border-[#3e454b] text-white w-[100%] text-lg rounded-md">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(ReferPatient)