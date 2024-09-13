import React, { memo, useContext, useEffect, useState } from 'react'
import '../../App.css'
import { storeContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AllReferredPatient = () => {

  const { token, URL, notification } = useContext(storeContext)
  const [patientsData, setPatientsData] = useState([])
  const [dataAvaliable, setDataAvailable] = useState(null)
  const [patientList, setPatientsList] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()

  const fetchPatientsData = async () => {

    let newURL = URL + '/api/patient/get'

    try {
      const response = await axios.post(newURL, {}, { headers: { token } })

      if (response.data.success) {
        setPatientsList(response.data.patientsData);
        setPatientsData(response.data.patientsData);
        console.log(response.data.message);
        console.log(response.data);
        if (response.data.patientsData.length == 0) {
          setDataAvailable(false)
        }
        { notification ? toast.success(response.data.message) : "" }
        console.log(notification);
      } else {
        console.log(response.data.message);
        if (response.data.message === "Expire token, please log in again." ||
          response.data.message === "Invalid token, please log in again.") {
          toast.error(response.data.message)
          setToken("")
          localStorage.removeItem("token")
          navigate('/')
        }
        { notification ? toast.error(response.data.message) : "" }
        console.log(error);

      }
    } catch (error) {
      console.log(error);

    }
  }

  const onSearchHandler = () => {

    if (searchValue.trim() === "") {
      // If searchValue is empty, reset to the full patient list
      setPatientsData(patientList);
      return; // Exit the function
    }

    // Convert searchValue to a number, and filter patientList
    const filterPatient = patientList.filter((item) => {
      // Convert item.patientId to a string for comparison
      const patientIdStr = item.patientId.toString();
      return patientIdStr.includes(searchValue);
    });

    // Update the state with the filtered patients
    setPatientsData(filterPatient);
  }



  useEffect(() => {
    console.log(patientsData.length);

    if (patientsData.length == 0) {
      fetchPatientsData()
      onSearchHandler()
    }
    onSearchHandler()
   
  }, [token, searchValue])

  return (
    <div>
      <div className='bg-[#dddfdf] p-8 w-full h-full'>
        <div className='bg-white p-4 shadow-lg my-4 gap-4 rounded-md text-[#081b2b] '>
          <div className='bg-white p-4  my-4 gap-4 rounded-md text-[#081b2b] flex flex-col sm:flex-row justify-center items-center sm:justify-between'>
            <p>Show Enteries</p>
            <div className='flex gap-4 items-center'>
              <p>Search:</p>
              <input type="text" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} className='border-2 border-solid border-gray-400 rounded-md py-1 px-3' />
            </div>
          </div>


          <div className="overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#081b2b] uppercase bg-[#c2c2c2] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span>Action</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DPR
                  </th>
                  <th scope="col" className="px-6 py-3">
                    enq_code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Health Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    disease
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {patientsData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white text-[#081b2b] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">DPR List</td>
                    <td className="px-6 py-4">{item.patientId}</td>
                    <td className="px-6 py-4">{item.healthType}</td>
                    <td className="px-6 py-4">{item.disease}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.city}, {item.state}, {item.country}</td>
                    <td className="px-6 py-4">0</td>
                  </tr>
                ))}
                {patientsData.length <= 0 ? <tr className="bg-white text-center text-[#081b2b]  w-full" >
                  <td colSpan='7' className='py-4'>Data Not Available</td>
                </tr> : <></>}

              </tbody>
            </table>
          </div>


          <div>
            <div className='bg-white p-4 my-4 rounded-md text-[#081b2b] flex flex-col sm:flex-row justify-center items-center sm:justify-between'>
              <p>Showing 1 to 1 of 1 entries</p>
              <div>
                <button className='border-2 border-solid border-gray-400 px-3 py-1 rounded-l-md'>Prev</button>
                <button className='border-2 border-solid border-gray-400 px-3 py-1'>1</button>
                <button className='border-2 border-solid border-gray-400 px-3 py-1 rounded-r-md'>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(AllReferredPatient)