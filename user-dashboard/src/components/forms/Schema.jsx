import {z} from "zod"

const LoginFormSchema = z.object({
  email: z.string().email({message: "Invalid email address."}),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
})

const SignUpFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

export {LoginFormSchema, SignUpFormSchema}
