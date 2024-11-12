import { RegisterForm } from '@/components/RegisterForm'
import React from 'react'
import { ToastContainer } from 'react-toastify'

type Props = {}

const page = (props: Props) => {
  return (
    <div><RegisterForm/> 
     <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default page