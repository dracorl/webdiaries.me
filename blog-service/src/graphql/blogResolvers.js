import {Blog, User, Tag} from "../database/models/index.js"

const blogResolvers = {
  Query: {
    blogs: async () => await Blog.find().populate("tags"),
    blog: async (_, {id}) => await Blog.findById(id).populate("tags"),
    tags: async () => await Tag.find(),
    tag: async (_, {id}) => await Tag.findById(id)
  },
  Mutation: {
    createBlog: async (_, {title, content, tags}, {user}) => {
      console.log("user", user)
      const newBlog = new Blog({title, content, author: user.userID, tags})
      return await newBlog.save()
    },
    updateBlog: async (_, {id, title, content, tags}) => {
      const updates = {}
      if (title) updates.title = title
      if (content) updates.content = content
      if (tags) updates.tags = tags

      return await Blog.findByIdAndUpdate(id, updates, {new: true})
    },
    deleteBlog: async (_, {id}) => {
      const deletedBlog = await Blog.findByIdAndDelete(id)
      return !!deletedBlog
    },
    createTag: async (_, {name}) => {
      const newTag = new Tag({name})
      return await newTag.save()
    },
    deleteTag: async (_, {id}) => {
      const deletedTag = await Tag.findByIdAndDelete(id)
      return !!deletedTag
    }
  },
  Blog: {
    author: async (parent, args, contextValue) => {
      console.log(contextValue)
      return await User.findById(parent.author).select("-password")
    },
    tags: async parent => await Tag.find({_id: {$in: parent.tags}})
  },
  Tag: {
    blogs: async parent => await Blog.find({tags: parent._id})
  }
}

export {blogResolvers}
