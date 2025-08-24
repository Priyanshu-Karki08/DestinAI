import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black/80 flex flex-row justify-between gap-8 p-10 relative z-50'>
      <div className='flex flex-col justify-between'>
        <h1 className='text-white font-bold text-4xl'>DestinAI</h1>
        <h1 className='text-white'>2025 DestinAI. All rights reserved.</h1>
      </div>
      <div className='my-10 flex flex-col gap-2'>
        <h2 className='text-white cursor-pointer'>About</h2>
        <h2 className='text-white cursor-pointer'>Contact</h2>
      </div>
      <div className='my-10 flex flex-col gap-2'>
        <h2 className='text-white cursor-pointer'>Facebook</h2>
        <h2 className='text-white cursor-pointer'>Instagram</h2>
        <h2 className='text-white cursor-pointer'>Twitter</h2>
        <h2 className='text-white cursor-pointer'>Linkedin</h2>
      </div>
      <div className='my-10 flex flex-col gap-2'>
        <h2 className='text-white cursor-pointer'>Privacy Policy</h2>
        <h2 className='text-white cursor-pointer'>Terms of Service</h2>
      </div>
    </div>
  )
}

export default Footer
