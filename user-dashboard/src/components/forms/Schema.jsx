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

const BioFormSchema = z.object({
  bio: z.string().max(500, "Bio 500 karakteri geçemez").optional()
})

const EmailFormSchema = z.object({
  email: z.string().email("Invalid email address")
})

const PasswordFormSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

const SocialLinksFormSchema = z.object({
  links: z.array(
    z.object({
      name: z.string().min(1, "Username must be at least 1 characters"),
      url: z.string().url("Invalid URL")
    })
  )
})

const SavePostFormSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 characters"),
  tags: z.array(z.string()),
  isPublished: z.boolean()
})

const EditPostFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  tags: z.array(
    z.object({
      value: z.string(),
      label: z.string()
    })
  ),
  isPublished: z.boolean()
})

const TagsFormSchema = z.object({
  tags: z
    .array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    )
    .min(1, "At least one tag is required")
})

const deleteSchema = z.object({
  confirmation: z.literal("delete", {
    errorMap: () => ({message: "You must type 'delete' to confirm"})
  })
})

export {
  LoginFormSchema,
  SignUpFormSchema,
  BioFormSchema,
  EmailFormSchema,
  PasswordFormSchema,
  SocialLinksFormSchema,
  SavePostFormSchema,
  EditPostFormSchema,
  TagsFormSchema,
  deleteSchema
}
