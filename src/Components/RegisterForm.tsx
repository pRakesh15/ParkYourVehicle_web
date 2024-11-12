'use client'
import { useFormRegister } from "@/libs/forms/register"
import { RegisterWithCredentialsDocument } from "../../../libs/Network/src/gql/generated"
import { useMutation } from "@apollo/client"
import { signIn } from "next-auth/react"
import { IconBrandGoogle } from "@tabler/icons-react"
import { Label } from "@radix-ui/react-label"
import { cn } from "@/libs/utils"
import Link from "next/link"
import { toast } from "react-toastify"
import { Input } from "./ui/input"

type Role = 'admin' | 'manager' | 'valet'


export interface ISignupFormProps {
  className?: string
  role?: Role
}

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const [registerWithCredentials, { loading, data }] = useMutation(RegisterWithCredentialsDocument)


  return (
    <>
      <div className="max-w-md w-full mt-3 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black text-white border-white border-[0.5px]">
        <h2 className="text-2xl font-bold text-center mb-3">Welcome to Parking</h2>
        <form onSubmit={handleSubmit(async (formData) => {
          const { data, errors } = await registerWithCredentials({
            variables: {
              registerWithCredentialsInput: formData,
            },
          });
          if (errors) {
            alert(errors);
            console.log(errors)
          }
          if (data) {
            toast.success(`User ${data.registerWithCredentials.name} created`,{
              position:'top-right'
            });
            signIn('credentials', {
              email: formData.email,
              password: formData.password,
              callbackUrl: '/',
            });
          }
        })}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="name">Name</Label>
              <Input id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="Tyler" type="text" />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </LabelInputContainer>
          </div>

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

          <LabelInputContainer className="mb-2">
            <Label htmlFor="profile-picture">Your Profile Picture</Label>
            <Input
              id="profile-picture"
              type="file"
              accept="image/*"
              className="text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-red-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {
              loading?"Loading...":"Sign Up"
            }
           
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
            Already have an account? <Link href="/login" className="text-red-500 hover:underline">Log in</Link>
          </p>
        </div>
      </div>

    </>
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
