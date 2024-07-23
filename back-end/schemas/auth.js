import { z } from 'zod'

const userSchema = z.object({
  body: z.object({
    firstName: z.string({
      invalid_type_error: 'Name user must be a string',
      required_error: 'Name is required'
    }),
    lastName: z.string({
      invalid_type_error: 'Last name must be a string',
      required_error: 'Last name is required'
    }),
    emailAdress: z.string({ required_error: 'email is required' })
      .email({ message: 'the email is incorrect' }),
    password: z.string({ message: 'Password is required' })
      .min(6, { message: 'Password must be 6 characters o more' }),
    confirmedPassword: z.string({ message: 'Confirmed password is required' })
      .min(6, { message: 'Confirmed password must be 6 characters o more' })
  })
})

export const validateUser = (input) => {
  return userSchema.safeParse(input)
}
