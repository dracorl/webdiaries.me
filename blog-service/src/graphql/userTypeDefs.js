import gql from "graphql-tag"

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String
    updatedAt: String
    bio: String
    links: [Link]
  }

  type Token {
    accessToken: String
    refreshToken: String
  }

  type Link {
    name: String
    url: String
  }

  input LinkInput {
    name: String
    url: String
  }

  type Query {
    users: [User]
    user(id: ID, username: String): User
    isTokenExpired(token: String!): Boolean
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateUser(
      username: String
      email: String
      bio: String
      links: [LinkInput]
      password: String
    ): User
    deleteUser(id: ID!): User
    login(email: String!, password: String!): Token
    refreshToken(token: String!): Token
    forgotToken(email: String!): String
    resetPassword(token: String!, password: String!): User
  }
`

export default userTypeDefs
