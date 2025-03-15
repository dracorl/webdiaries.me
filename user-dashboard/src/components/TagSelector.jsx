import {useCallback} from "react"
import {ReactTags} from "react-tag-autocomplete"
import "../autocomplete.css"
import {useQuery, useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"

const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`

const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($name: String!) {
    createTag(name: $name) {
      name
      id
    }
  }
`

const TagSelector = ({selected, onSelect}) => {
  // Changed prop to onSelect
  const {data} = useQuery(TAGS_QUERY)
  const [createTag] = useMutation(CREATE_TAG_MUTATION)

  const suggestions = data?.tags
    ? data.tags.map(tag => ({value: tag.id, label: tag.name}))
    : []

  const handleAdd = useCallback(
    async newTag => {
      try {
        // Check if tag already exists
        const existingTag = suggestions.find(t => t.label === newTag.label)

        if (existingTag) {
          onSelect([...selected, existingTag])
          return
        }

        // Create new tag if it doesn't exist
        const response = await createTag({
          variables: {name: newTag.label}
        })

        const createdTag = {
          value: response.data.createTag.id,
          label: response.data.createTag.name
        }

        onSelect([...selected, createdTag])
      } catch (error) {
        console.error("Tag creation failed:", error)
        toast.error("Failed to create new tag")
      }
    },
    [selected, onSelect, suggestions, createTag]
  )

  const handleDelete = useCallback(
    tagIndex => {
      const newTags = selected.filter((_, i) => i !== tagIndex)
      onSelect(newTags)
    },
    [selected, onSelect]
  )

  return (
    <ReactTags
      labelText="Select tags"
      selected={selected}
      suggestions={suggestions}
      onAdd={handleAdd}
      onDelete={handleDelete}
      allowNew={true}
      noOptionsText="No matching tags"
      required
    />
  )
}

export default TagSelector
