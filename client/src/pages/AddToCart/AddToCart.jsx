import React, { useState } from 'react'

const AddToCart = () => {

  const [count, setCount] = useState(0)

  return (
    <div>
      <div className='bg-[#dddfdf] p-8 w-full h-screen'>
        <div className='bg-white p-4 shadow-lg my-4 gap-4 rounded-md text-[#081b2b] '>
          <div className='bg-white p-4 my-4 gap-4 rounded-md text-[#081b2b] flex flex-col sm:flex-row justify-center items-center sm:justify-between'>
            <div>
              <p>For more details, Click on the Icon</p>
             
            </div>
            <div className='flex gap-4 items-center'>
              <p>Search:</p>
              <input type="text" placeholder='Search' className='border-2 border-solid border-gray-400 rounded-md py-1 px-3' />
            </div>
          </div>


          <div className=" overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <span><input type="checkbox" /><button className='py-1 px-2 bg-[#428b4d] text-white rounded-md border-2 border-solid border-gray-100'>Multiple Link</button></span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Browse Image (212X200)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discounted Price (Per Piece)
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-4 py-4">
                  <span ><input type="checkbox" className='mr-2' /><button className='text-[#428b4b]'>Link</button></span>
                  </td>

                  <td className="px-6 py-4">
                    <span className='flex gap-4 items-center'><button onClick={()=>setCount(count>0?count-1:0)} className='py-1 px-2 bg-[#081b2b] text-white rounded-md border-2 border-solid border-gray-100'>-</button><p className='text-lg font-semibold'>{count}</p><button onClick={()=>setCount(count + 1)} className='py-1 px-2 bg-[#081b2b] text-white rounded-md border-2 border-solid border-gray-100'>+</button></span>
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

export default AddToCart