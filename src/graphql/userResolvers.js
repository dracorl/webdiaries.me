import {User} from "../database/models/index.js"
import {hashPassword} from "../helpers/hashing.js"

const userResolvers = {
  Query: {
    users: async () => await User.find().select("-password"),
    user: async (_, {id}) => await User.findById(id).select("-password")
  },
  Mutation: {
    createUser: async (_, {username, email, password}) => {
      const newUser = new User({
        username,
        email,
        password: hashPassword(password)
      })
      return await newUser.save().select("-password")
    },
    updateUser: async (_, {id, email, password}) => {
      const updates = {}
      if (email) updates.email = email
      if (password) updates.password = password

      return await User.findByIdAndUpdate(id, updates, {new: true}).select(
        "-password"
      )
    },
    deleteUser: async (_, {id}) =>
      await User.findByIdAndDelete(id).select("-password")
  }
}

export {userResolvers}
