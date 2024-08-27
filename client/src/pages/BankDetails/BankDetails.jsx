import React, { memo } from 'react'

const BankDetails = () => {
  return (
    <div>
      <div className='bg-[#dddfdf] p-8 w-full h-screen'>
        <div className='bg-white p-4 shadow-lg my-4 gap-4 rounded-md text-[#081b2b] '>
          <div className='bg-white p-4 my-4 gap-4 rounded-md text-[#081b2b] flex flex-col sm:flex-row justify-center items-center sm:justify-between'>
            <p>Show Enteries</p>
            <div className='flex gap-4 items-center'>
              <p>Search:</p>
              <input type="text" placeholder='Search' className='border-2 border-solid border-gray-400 rounded-md py-1 px-3' />
            </div>
          </div>


          <div className=" overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span>Action</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    AccountNo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    AccountName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BankName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ifscCode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Adhaar No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Adhaar Front
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Adhaar Back
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pan Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Verified Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>/<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                  </td>

                  <td className="px-6 py-4">
                    Silver
                  </td>
                  <td className="px-6 py-4">
                    Laptop
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                  <td className="px-6 py-4">
                    $2999
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

export default memo(BankDetails)