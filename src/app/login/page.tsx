'use client'
import LoginForm from '@/components/LoginForm'
import React from 'react'
import { ToastContainer } from 'react-toastify'

type Props = {}

const page = (props: Props) => {
    return (
        <div><LoginForm />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default page