import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaLogin } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'

export type FormTypeLogin = z.infer<typeof formSchemaLogin>

//here by using zod we validate the form for login
export const useFormLogin = () =>
  useForm<FormTypeLogin>({
    resolver: zodResolver(formSchemaLogin),
  })
