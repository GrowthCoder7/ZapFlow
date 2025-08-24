"use client"
import React from 'react'

const LinkButton = ({children,onClick}:{children:React.ReactNode,onClick:()=>void}) => {
  return (
    <div onClick={onClick} className='px-4 py-2 hover:cursor-pointer'>
        {children}
    </div>
  )
}

export default LinkButton