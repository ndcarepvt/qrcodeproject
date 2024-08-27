import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
       <div className='text-center space-y-12'>
        <div className='text-center '>
        <h1 className='text-[17rem] font-bold text-[#081b2b]'>404 </h1>
        <p className='text-4xl font-bold text-[#081b2b]'>Page Not Found</p>
        </div>
        <div>
        <Link to={'/'} ><button className='px-3 py-4 bg-[#081b2b] text-white rounded-md text-xl'>Back to HomePage</button></Link>
        </div>
       </div>
    </div>
  )
}

export default memo(PageNotFound)