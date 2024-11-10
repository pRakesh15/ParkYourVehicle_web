'use client'

import { useFormLogin } from '@/libs/forms/login'
import React, { forwardRef } from 'react'
import Input from './SubComponents/Input'
//here we use next-auth signIn 
//signIn makes a POST request to the NextAuth API endpoint (/api/auth/[...nextauth]).
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useFormLogin()

    // console.log(errors)

    //   const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    //     console.log(data)
    //     // Handle login logic here
    //   }

    const { replace } = useRouter()

    return (
        <div >
            <div className="w-full max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit(async (data) => {
                        console.log(data)
                        const { email, password } = data

                        const result = await signIn('credentials', {
                            email,
                            password,
                            redirect: false
                        })

                        if (result?.ok) {
                            replace('/')
                        }

                        if (result?.error) {
                            alert("Login failed try again")
                        }
                    })}>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                or <Link href={"/register"}>Register</Link>
            </div>
        </div>
    )
}