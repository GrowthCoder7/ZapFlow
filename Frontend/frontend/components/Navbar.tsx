"use client"
import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import LinkButton from './LinkButton'
import PrimaryButton from './PrimaryButton'

const Navbar = () => {
  const router = useRouter();

  return (
    // <div className='Navbar width-full flex justify-between align-middle px-4 bg-gray-300'>
    //     <div className="logo">
    //         <Image src="/ZapFlow.png" alt="logo" width={160} height={160} />
    //     </div>
    //     <div className="auth px-4 flex justify-between align-middle gap-x-8 my-auto text-md">
    //         <button onClick={()=>{redirect("/login")}} className="login py-1.5 hover:cursor-pointer">Log in</button>
    //         <button onClick={()=>{redirect("/signup")}} className="signup bg-purple-900 py-1.5 px-3 hover:cursor-pointer text-white rounded-2xl">Sign Up</button>
    //     </div>
    // </div>
    
    <div className='flex bg-slate-200 justify-between hover:shadow-md px-4 py-3.5'>
        <div className="flex flex-col cursor-pointer justify-center">
          <Image src="/ZapFlow.png" alt="logo" width={120} height={120} />
        </div>
        <div className='flex my-auto'>
          <div className='pr-6 '>
              <LinkButton onClick={()=>{router.push("/login")}}>Log in</LinkButton>
          </div>
          <div className='pr-6'>
            <PrimaryButton onClick={()=>{router.push("/signup")}}>Sign Up</PrimaryButton>
          </div>
        </div>
    </div>
  )
}

export default Navbar