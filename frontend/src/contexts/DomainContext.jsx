import {createContext, useContext, useState, useEffect} from "react"
import {useQuery, gql} from "@apollo/client"

const GET_USER = gql`
  query User($username: String) {
    user(username: $username) {
      id
    }
  }
`
const DomainContext = createContext()

export const DomainProvider = ({children}) => {
  const [domainId, setDomainId] = useState(null)
  const {data, loading} = useQuery(GET_USER, {
    variables: {username: window.location.hostname.split(".")[0]}
  })

  useEffect(() => {
    if (!loading && data?.user) {
      setDomainId(data.user.id)
    }
  }, [data, loading])

  return (
    <DomainContext.Provider value={domainId}>{children}</DomainContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDomain = () => useContext(DomainContext)
