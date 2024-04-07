import {User} from "../database/models/index.js"
import {hashPassword, comparePasswords} from "../helpers/hashing.js"
import {signToken, verifyToken, decodeToken} from "../helpers/jwt.js"
import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from "../config/index.js"

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
        password: await hashPassword(password)
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
    deleteUser: async (_, {id}) => {
      return await User.findByIdAndDelete(id).select("-password")
    },
    // login with jwt
    login: async (_, {email, password}) => {
      const user = await User.findOne({email})
      if (!comparePasswords(password, user.password)) return null
      if (!user) return null
      const accessToken = signToken(
        {userID: user.id, expiresIn: "10m"},
        ACCESS_TOKEN_SECRET
      )
      const refreshToken = signToken(
        {userID: user.id, expiresIn: "2d"},
        REFRESH_TOKEN_SECRET
      )
      return {accessToken, refreshToken}
    },
    refreshToken: async (_, {token}) => {
      const verifiedToken = verifyToken(token, REFRESH_TOKEN_SECRET)
      if (!verifiedToken) return null
      const accessToken = signToken(
        {userID: verifiedToken.userID, expiresIn: "10m"},
        ACCESS_TOKEN_SECRET
      )
      return {accessToken}
    }
  }
}

export {userResolvers}
