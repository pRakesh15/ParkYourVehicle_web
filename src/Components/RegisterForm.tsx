'use client'
import { useFormRegister } from "@/libs/forms/register"
import Input from "./SubComponents/Input"
import { FileInput } from "./SubComponents/FileInput"
import { RegisterWithCredentialsDocument } from "../../../libs/Network/src/gql/generated"
import { useMutation } from "@apollo/client"
import { signIn } from "next-auth/react"

type Role='admin' | 'manager' | 'valet'


export interface ISignupFormProps{
    className?:string
    role?:Role
}

export const RegisterForm=()=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useFormRegister()

    const [registerWithCredentials,{loading,data}]=useMutation(RegisterWithCredentialsDocument)


    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit(async(formData)=>{
            const {data,errors}=await registerWithCredentials({
                variables:{
                    registerWithCredentialsInput:formData,
                },
            })
            if(errors){
                alert(errors)
            }

            if(data)
            {
                alert(`User ${data.registerWithCredentials.name} created`)
                signIn('credentials',{
                    email:formData.email,
                    password:formData.password,
                    callbackUrl:'/',
                })
            }
        })} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter your name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
  
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
  
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              placeholder="Enter your password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
  
  
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
  
      </div>
    )
}

