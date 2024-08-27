import React, { memo, useContext, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { storeContext } from '../../Context/StoreContext'

const ReferPatient = () => {
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
  let params = useParams();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));


  };

  const onSendHandler = async (patientCode) => {
    const sendURL = `${URL}/api/patient/add`;
    try {
      const userId = token ? userData._id : params.usertoken;
      console.log(userId);

      const response = await axios.post(sendURL, { ...data, patientId: patientCode, userId });

      if (response.data.success) {

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

  const onSubmithandler = async (event) => {
    event.preventDefault();

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
        }
      } catch (error) {
        console.error(error);
      }
    }

  };

  return (
    <div className='flex md:h-screen my-0 bg-[#E9ECEF] p-10'>
      <div className='w-full py-5 flex flex-col md:justify-center items-center bg-white rounded-xl'>
        <h1 className='text-[#081b2b] font-bold text-4xl mb-5'>Refer Patient</h1>
        <form onSubmit={onSubmithandler} className='flex flex-col gap-4 w-[70%]'>
          <div className='flex flex-col md:flex-row gap-10'>
            <div className='flex flex-col gap-4 w-full'>
              <div className='w-full'>
                <p className='text-lg'><label htmlFor="fullName">Full Name</label></p>
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
                <p className='text-lg'><label htmlFor="phoneNumber">Contact No</label></p>
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
              <div>
                <p className='text-lg'><label htmlFor="Email">Email (optional)</label></p>
                <input
                  type="email"
                  id='Email'
                  name="emailId"
                  value={data.emailId}
                  onChange={onChangeHandler}
                  placeholder="Enter Your Email"
                  className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                />
              </div>
              <div>
                <p className='text-lg'><label htmlFor="city">City</label></p>
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
                <p className='text-lg'><label htmlFor="state">State</label></p>
                <input
                  type="text"
                  id='state'
                  required
                  name="state"
                  value={data.state}
                  onChange={onChangeHandler}
                  placeholder="Enter Your State"
                  className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                />
              </div>
              <div>
                <p className='text-lg'><label htmlFor="Country">Country</label></p>
                <input
                  type="text"
                  id='Country'
                  required
                  name="country"
                  value={data.country}
                  onChange={onChangeHandler}
                  placeholder="Enter Your Country"
                  className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                />
              </div>
              <div>
                <p className='text-lg'><label htmlFor="healthType">Type</label></p>
                <select
                  name="healthType"
                  id="healthType"
                  value={data.healthType}
                  onChange={onChangeHandler}
                  className="px-3 py-2 w-[100%] text-lg rounded-md bg-transparent border-2 border-solid border-slate-600"
                >
                  <option value="">-- Select Option --</option>
                  <option value="Healthy">Healthy</option>
                  <option value="UnHealthy">UnHealthy</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
              {data.healthType === "UnHealthy" && (
                <div>
                  <p className='text-lg'><label htmlFor="disease">Disease</label></p>
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
  );
};

export default memo(ReferPatient)