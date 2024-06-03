import gql from "graphql-tag"

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String
    updatedAt: String
  }

  type Token {
    accessToken: String
    refreshToken: String
  }

  type Query {
    users: [User]
    user(id: ID, username: String): User
    isTokenExpired(token: String!): Boolean
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): User
    login(email: String!, password: String!): Token
    refreshToken(token: String!): Token
  }
`

export default userTypeDefs
