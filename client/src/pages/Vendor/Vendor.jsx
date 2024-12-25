import React, { memo, useContext } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'

const Vendor = () => {

  const {userData} = useContext(storeContext)


  return (
    <div>
      <div className='bg-[#dddfdf] p-8 w-full h-screen overflow-x-scroll'>
        <div className='bg-white p-4 shadow-lg my-4 gap-4 rounded-md text-[#081b2b] '>
          <div className='bg-white p-4 my-4 gap-4 rounded-md text-[#081b2b] flex flex-col sm:flex-row justify-center items-center sm:justify-between'>
            <p>Show Enteries</p>
            <div className='flex gap-4 items-center'>
              <p>Search:</p>
              <input type="text" placeholder='Search' className='border-2 border-solid border-gray-400 rounded-md py-1 px-3' />
            </div>
          </div>


          <div className=" overflow-x-scroll sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span>Action</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PhoneNumber
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CompanyName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GSTNumber
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    <Link to="/vendor/edit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>/<Link to="/vendor/delete" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
                  </td>

                  <td className="px-6 py-4">
                    {userData?userData.name:""}
                  </td>
                  <td className="px-6 py-4">
                    {userData?userData.email:""}
                  </td>
                  <td className="px-6 py-4">
                    {userData?userData.phoneNumber:""}
                  </td>
                  <td className="px-6 py-4">
                    
                  </td>
                  <td className="px-6 py-4">
                    
                  </td>
                  <td className="px-6 py-4">
                    
                  </td>
                  <td className="px-6 py-4">
                    {userData?userData.type:""}
                  </td>
                  <td className="px-6 py-4">
                    {userData?userData.status:""}
                  </td>

                </tr>

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

export default memo(Vendor)