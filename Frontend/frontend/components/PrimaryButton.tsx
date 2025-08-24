"use client"
import React from 'react'

const PrimaryButton = ({children,onClick,size="small"}:{children:React.ReactNode,onClick:()=>void,size?:"small"|"big"}) => {
  return (
    <div onClick={onClick}
    className={`${size==='small'?'text-sm px-4 py-2':'text-lg px-8 py-4'} bg-purple-900 hover:bg-purple-800 text-white rounded-2xl cursor-pointer`}
    >{children}</div>
  )
}

export default PrimaryButton