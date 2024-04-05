import gql from "graphql-tag"
import {userTypeDefs} from "./userTypeDefs.js"
import {userResolvers} from "./userResolvers.js"

const typeDefs = gql`
  ${userTypeDefs}
`

const resolvers = {
  ...userResolvers
}

export {typeDefs, resolvers}
