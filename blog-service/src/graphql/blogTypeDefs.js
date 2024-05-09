import gql from "graphql-tag"

const blogTypeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    content: String!
    author: User
    tags: [Tag!]!
    createdAt: String!
    updatedAt: String!
  }

  type BlogList {
    totalCount: Int! # totalCount alanını ekledik
    blog: [Blog!]!
  }

  type Tag {
    id: ID!
    name: String!
    blogs: [Blog!]!
  }

  type Query {
    blog(id: ID!): Blog
    blogs(limit: Int!, offset: Int!): BlogList!
    tag(id: ID!): Tag
    tags: [Tag!]!
  }

  type Mutation {
    createBlog(title: String!, content: String!, tags: [ID]): Blog!
    updateBlog(id: ID!, title: String, content: String, tags: [ID]): Blog!
    deleteBlog(id: ID!): Boolean!
    createTag(name: String!): Tag!
    deleteTag(id: ID!): Boolean!
  }
`

export {blogTypeDefs}
