'use client'

import { useFormLogin } from '@/libs/forms/login'
import React, { forwardRef, useState } from 'react'

//here we use next-auth signIn 
//signIn makes a POST request to the NextAuth API endpoint (/api/auth/[...nextauth]).
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/libs/utils'
import { IconBrandGoogle } from '@tabler/icons-react'
import { Label } from './ui/label'
import { toast } from 'react-toastify'
import { Input } from './ui/input'


export default function LoginForm() {
    const [loading, setLoading] = useState(false) 
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

        <div className="max-w-md w-full mt-3 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black text-white border-white border-[0.5px]">
            <h2 className="text-2xl font-bold text-center mb-3">Welcome Back</h2>
            <form className=" pt-3 "
                onSubmit={handleSubmit(async (data) => {
                    const { email, password } = data
                    setLoading(true)
                    const result = await signIn('credentials', {
                        email,
                        password,
                        redirect: false
                    })
                    // console.log(result)
                    if (result?.ok) {
                        setLoading(false)
                        replace('/')
                        toast.success('Login successfully !! ', {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        
                       
                    } 

                    if (result?.error) {
                        // console.log(result?.error)
                        toast.error(result?.error, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        setLoading(false)
                    }
                })}>


                <LabelInputContainer className="mb-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        placeholder="Enter your email" />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </LabelInputContainer>

                <LabelInputContainer className="mb-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        {...register('password', { required: 'Name is required' })}
                        id="password" placeholder="••••••••" type="password" />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors?.password?.message}</p>}
                </LabelInputContainer>



                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-red-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    {loading?'loading...':'Login'}

                </button>

                <div className="bg-gradient-to-r from-transparent via-red-700 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                    <button
                        className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="button"
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Google
                        </span>
                        <BottomGradient />
                    </button>
                </div>
            </form>

            <div className="text-center mt-6">
                <p className="text-sm text-neutral-500">
                    Don't have an account? <Link href="/register" className="text-red-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>


    )
}


const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
