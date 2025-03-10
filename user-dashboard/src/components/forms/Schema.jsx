import {z} from "zod"

const LoginFormSchema = z.object({
  email: z.string().email({message: "Invalid email address."}),
  password: z.string().min(8, {
    message: "Password must be at least 4 characters."
  })
})

export {LoginFormSchema}
