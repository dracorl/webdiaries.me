import {useCallback} from "react"
import {ReactTags} from "react-tag-autocomplete"
import "../autocomplete.css"
import {useQuery, gql} from "@apollo/client"

const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`
const TagSelector = ({selected, setSelected}) => {
  const {data} = useQuery(TAGS_QUERY)

  const suggestions = data
    ? data.tags.map(tag => ({value: tag.id, label: tag.name}))
    : []

  const onAdd = useCallback(
    newTag => {
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
    />
  )
}

export default TagSelector
