import gql from "graphql-tag"

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String
    updatedAt: String
    bio: String
    links: [String]
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
    updateUser(
      username: String
      email: String
      bio: String
      links: [String]
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
