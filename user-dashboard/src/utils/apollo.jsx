import {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client"
import {setContext} from "@apollo/client/link/context"
import {graphqlURI} from "../config/globals"

const httpLink = createHttpLink({
  uri: graphqlURI
})

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("accessToken")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
