import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaRegister } from './schemas'

export type FormTypeRegister = z.infer<typeof formSchemaRegister>

//here by using zod we validate the form for register.

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(formSchemaRegister),
  })
