import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { graphqlURI } from '../config/globals'

const httpLink = createHttpLink({
  uri: graphqlURI
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client
