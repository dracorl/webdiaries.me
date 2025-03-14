import {useForm, useFieldArray} from "react-hook-form"
import {useQuery, useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod"
import {SocialLinksFormSchema} from "./Schema"
import {useEffect} from "react"

const GET_USER_LINKS_QUERY = gql`
  query User {
    user {
      links {
        name
        url
      }
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($links: [LinkInput!]!) {
    updateUser(links: $links) {
      id
    }
  }
`

const SocialLinksForm = () => {
  const {data} = useQuery(GET_USER_LINKS_QUERY, {
    fetchPolicy: "network-only"
  })
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const form = useForm({
    resolver: zodResolver(SocialLinksFormSchema),
    defaultValues: {
      links: [{name: "", url: ""}]
    }
  })

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "links"
  })

  useEffect(() => {
    if (data?.user?.links) {
      const cleanedLinks = data.user.links.map(({__typename, ...rest}) => rest)
      form.reset({links: cleanedLinks})
    }
  }, [data, form.reset])

  const onSubmit = async values => {
    try {
      await updateUser({variables: {links: values.links}})
      toast.success("Links updated successfully")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col md:flex-row gap-4">
            {/* Platform Adı */}
            <FormField
              control={form.control}
              name={`links.${index}.name`}
              render={({field}) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Platform name (e.g. GitHub)"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL */}
            <FormField
              control={form.control}
              name={`links.${index}.url`}
              render={({field}) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="URL (e.g. https://github.com/username)"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
              className="mt-2 md:mt-0"
            >
              Remove
            </Button>
          </div>
        ))}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({name: "", url: ""})}
          >
            Add
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  )
}

export default SocialLinksForm
