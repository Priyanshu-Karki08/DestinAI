import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-80 gap-9 pb-3'>
      <h1
      className='font-bold text-[40px] text-center mt-13'
      ><span className='text-[#fef3c7]'>Discover Your Next Adventure with AI:</span><br></br> <span className='text-gray-200'>Personalized Itineraries at Your Fingertips.</span></h1>
      <p className='text-xl text-[#fb923c] text-center'>Your Personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      <Link to = {'/create-trip'}>
        <Button className='bg-orange-600 hover:bg-amber-600 cursor-pointer'>Get Started,It's Free</Button>
      </Link>
    </div>
  )
}

export default Hero
