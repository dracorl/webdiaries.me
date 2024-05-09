import {useCallback, useEffect} from "react"
import {ReactTags} from "react-tag-autocomplete"
import "../autocomplete.css"
import {useQuery, useMutation, gql} from "@apollo/client"

const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`

const CRETAE_TAG_MUTATION = gql`
  mutation Mutation($name: String!) {
    createTag(name: $name) {
      name
      id
    }
  }
`
const TagSelector = ({selected, setSelected}) => {
  const {data} = useQuery(TAGS_QUERY)
  const [createTag] = useMutation(CRETAE_TAG_MUTATION)

  useEffect(() => {
    console.log("selected: ", selected)
  })

  const suggestions = data
    ? data.tags.map(tag => ({value: tag.id, label: tag.name}))
    : []

  const onAdd = useCallback(
    async newTag => {
      if (newTag.value === newTag.label) {
        try {
          const response = await createTag({variables: {name: newTag.label}})
          newTag.value = response.data.createTag.id
          newTag.label = response.data.createTag.name
        } catch (error) {
          console.error(error)
        }
      }
      setSelected([...selected, newTag])
    },
    [selected] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onDelete = useCallback(
    tagIndex => {
      setSelected(selected.filter((_, i) => i !== tagIndex))
    },
    [selected] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <ReactTags
      labelText="Select tags"
      selected={selected}
      suggestions={suggestions}
      onAdd={onAdd}
      allowNew={true}
      onDelete={onDelete}
      noOptionsText="No matching tags"
      required
    />
  )
}

export default TagSelector
