'use client'
import LoginForm from '@/components/LoginForm'
import React from 'react'
import { ToastContainer } from 'react-toastify'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default page