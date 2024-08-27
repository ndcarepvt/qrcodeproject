import React, { memo } from 'react'

const Footer = () => {
  return (
    <div>
      <div className='p-4 flex justify-between'>
        <p>© 2024 All rights reserved.</p>
        <p>Anything you want</p>
      </div>
    </div>
  )
}

export default memo(Footer)