import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'>
            <span className='text-[#f56551]'>
                Discover Your Next Adventure with AI:
            </span>
                Personlized Itineraries at your fingertips!
            <p className='text-xl text-gray-500 text-center mt-5'> Your personal trip planner and travel curator, creating trip essentials for you!</p>
        </h1>
        <Link to='/create-trip'>
        <Button>Get Started, It's Free!</Button>
        </Link>
    </div>
  )
}

export default Hero