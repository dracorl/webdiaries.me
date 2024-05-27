import mongoose from "mongoose"
import {Blog, User, Tag} from "../database/models/index.js"

const blogResolvers = {
  Query: {
    blogs: async (_, {author, tagId, published, limit, offset}, {user}) => {
      let query = {}

      if (user && user.userID) {
        const authorId = user.userID
        query = {author: authorId}
      } else if (author) query = {author, published}
      if (tagId) query.tags = {$in: [tagId]}
      const totalCount = await Blog.countDocuments(query)
      const blog = await Blog.find(query)
        .sort({createdAt: -1})
        .skip(offset)
        .limit(limit)
        .populate("tags")

      return {totalCount, blog}
    },
    searchBlogs: async (_, {author, searchTerm, limit, offset}) => {
      const query = {
        published: true,
        author,
        $text: {$search: searchTerm}
      }
      const totalCount = await Blog.countDocuments(query)
      const blog = await Blog.find(query)
        .sort({createdAt: -1})
        .skip(offset)
        .limit(limit)
        .populate("tags")

      return {totalCount, blog}
    },
    blog: async (_, {id}) => Blog.findById(id).populate("tags"),
    tags: async () => Tag.find(),
    tag: async (_, {id}) => Tag.findById(id),
    tagsCount: async (_, {author}) => {
      const tagCounts = await Blog.aggregate([
        {
          $match: {
            published: true,
            author: mongoose.Types.ObjectId.createFromHexString(author)
          }
        },
        // Unwind the tags array to deconstruct the array into documents
        {$unwind: "$tags"},
        // Group by the tag and count the occurrences
        {
          $group: {
            _id: "$tags",
            count: {$sum: 1}
          }
        },
        // Sort by count in descending order
        {$sort: {count: -1}},
        // Lookup to get the tag details
        {
          $lookup: {
            from: "tags",
            localField: "_id",
            foreignField: "_id",
            as: "tagDetails"
          }
        },
        // Unwind the tagDetails array to get the tag details object
        {$unwind: "$tagDetails"},
        // Project the necessary fields
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: "$tagDetails.name",
            count: 1
          }
        }
      ])
      return tagCounts
    }
  },
  Mutation: {
    createBlog: async (_, {title, content, tags, published}, {user}) => {
      const newBlog = new Blog({
        title,
        content,
        author: user.userID,
        tags,
        published
      })
      return newBlog.save()
    },
    updateBlog: async (_, {id, title, content, tags, published}) => {
      const updates = {}
      if (title) updates.title = title
      if (content) updates.content = content
      if (tags) updates.tags = tags
      if (published !== undefined) updates.published = published
      return Blog.findByIdAndUpdate(id, updates, {new: true})
    },
    deleteBlog: async (_, {id}) => {
      const deletedBlog = await Blog.findByIdAndDelete(id)
      return !!deletedBlog
    },
    createTag: async (_, {name}) => {
      const newTag = new Tag({name})
      return newTag.save()
    },
    deleteTag: async (_, {id}) => {
      const deletedTag = await Tag.findByIdAndDelete(id)
      return !!deletedTag
    }
  },
  Blog: {
    author: async parent => User.findById(parent.author).select("-password"),
    tags: async parent => Tag.find({_id: {$in: parent.tags}})
  },
  Tag: {
    blogs: async parent => Blog.find({tags: parent._id})
  }
}

export default blogResolvers
