import gql from "graphql-tag"

const blogTypeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    content: String!
    author: User
    tags: [Tag!]!
    published: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type BlogList {
    totalCount: Int!
    blog: [Blog!]!
  }

  type TagsCount {
    id: ID!
    name: String!
    count: Int!
  }

  type Tag {
    id: ID!
    name: String!
    blogs: [Blog!]!
  }

  type Query {
    blog(id: ID!): Blog
    blogs(
      username: String
      published: Boolean
      limit: Int!
      offset: Int!
    ): BlogList!
    blogsByUsername(username: String!): [Blog!]!
    blogsByTag(tagId: ID!): [Blog!]!
    tag(id: ID!): Tag
    tags: [Tag!]!
    tagsCount(username: String!): [TagsCount!]!
  }

  type Mutation {
    createBlog(
      title: String!
      content: String!
      tags: [ID]
      published: Boolean
    ): Blog!
    updateBlog(
      id: ID!
      title: String
      content: String
      tags: [ID]
      published: Boolean
    ): Blog!
    deleteBlog(id: ID!): Boolean!
    createTag(name: String!): Tag!
    deleteTag(id: ID!): Boolean!
  }
`

export default blogTypeDefs
