"use client"
import React from 'react'
import PrimaryButton from './PrimaryButton'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter();
  return (
    <div >
        <div className='flex justify-center'>
            <div className='text-5xl font-semibold text-center pt-10 max-w-xl'>
                Your apps aren't just connected, they<span className='bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700 inline-block text-transparent bg-clip-text pb-2'>think together</span>
            </div>
        </div>
        <div className='flex justify-center'>
            <div className="text-xl text-gray-900 font-normal text-center pt-8 max-w-2xl">
                <span className='text-indigo-800 font-semibold'>ZapFlow</span> turns disjointed tasks into an intelligent, automated workflow, so you can focus on what truly matters.
            </div>
        </div>
        <div className="flex justify-center">
            <div className='flex justify-center pt-8'>
                <PrimaryButton size='big' onClick={()=>{router.push("/signup")}}>Get Started</PrimaryButton>
            </div>
        </div>
    </div>
  )
}

export default Hero