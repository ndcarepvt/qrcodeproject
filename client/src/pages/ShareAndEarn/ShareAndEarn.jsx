import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import {EmailShareButton, WhatsappShareButton} from "react-share"

const ShareAndEarn = () => {
  
  const [shareUrl, setShareUrl] = useState("https://rishtpusht.in")

  return (
    <div className='bg-[#dddfdf] p-8 w-full h-screen'>
    <div className='bg-white p-4 shadow-lg my-4 gap-4 rounded-md text-[#081b2b] '>
        <div>
            <h2 className='text-xl py-4 font-medium'>Share this Link</h2>
        </div>
        <hr className='bg-gray-200 h-1' />
        <div className='my-6 flex justify-between px-6 items-center'>
          <p>Link</p>
          <input type="text" readOnly value={shareUrl} className='border-2 border-gray-300 border-solid px-4 py-1 outline-none w-[30vw]' />
        </div>
        <div className='flex gap-4 items-center py-4 px-2 flex-col md:flex-row bg-gray-300 rounded-md'>
        
            <p><button className='py-1 px-2 bg-[#3e454b]  text-white rounded-md border-2 border-solid border-[#3e454b]'>Copy Link</button></p>
            <WhatsappShareButton url={shareUrl}> 
            <button className='py-1 px-2 bg-[#3e454b]  text-white rounded-md border-2 border-solid border-[#3e454b]'>Share Via Whatsapp</button> 
            </WhatsappShareButton>
            <EmailShareButton url={shareUrl}>
            <button className='py-1 px-2 bg-[#3e454b]  text-white rounded-md border-2 border-solid border-[#3e454b]'>Share Via Email</button> 
          </EmailShareButton>
            <Link to="/vendor" className="font-medium text-[#428b4d] dark:text-[#428b4d] hover:underline">back to list</Link>
        </div>
    </div>
</div>
  )
}

export default memo(ShareAndEarn)