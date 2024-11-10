import { z } from 'zod'

//this is for validate the register schema by using zod
export const formSchemaRegister = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
})

//this is for validating the schema form
export const formSchemaLogin = formSchemaRegister.pick({
  email: true,
  password: true,
})
