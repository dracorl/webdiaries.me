import {User} from "../database/models/index.js"
import {hashPassword, comparePasswords} from "../helpers/hashing.js"
import {signToken, verifyToken, decodeToken} from "../helpers/jwt.js"
import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from "../config/index.js"
import {checkDomain, createDomain, deleteDomain} from "../helpers/bind-api.js"

// TODO: Implement the Error class
const userResolvers = {
  Query: {
    users: async () => User.find().select("-password"),
    user: async (_, {id, username}, {user}) => {
      if (id) return User.findById(id).select("-password")
      if (username) return User.findOne({username}).select("-password")
      if (user.userID) return User.findById(user.userID).select("-password")
    },
    isTokenExpired: async (_, {token}) => {
      const decodedToken = decodeToken(token)
      if (!decodedToken) throw new Error("Invalid token")
      return decodedToken.exp < Date.now() / 1000
    }
  },
  Mutation: {
    createUser: async (_, {username, email, password}) => {
      const existingUsername = await User.findOne({username})
      if (existingUsername) {
        throw new Error(
          "This username is already taken. Please try another one.",
          "DUPLICATE_USERNAME"
        )
      }
      const existingEmail = await User.findOne({email})
      if (existingEmail) {
        throw new Error(
          "Email is already taken. Forgot your password? ",
          "DUPLICATE_EMAIL"
        )
      }

      if (await checkDomain(username))
        throw new Error("Please try another username", "DOMAIN_NOT_AVAILABLE")

      await createDomain(username)

      return User.create({
        username,
        email,
        password: await hashPassword(password)
      })
    },
    updateUser: async (_, {email, password}, {user}) => {
      const updates = {}
      if (email) updates.email = email
      if (password) updates.password = password

      return User.findByIdAndUpdate(user.userID, updates, {new: true}).select(
        "-password"
      )
    },
    deleteUser: async (_, {id}) => {
      const response = await User.findById(id).select("-password")
      await deleteDomain(response.username)
      return User.findByIdAndDelete(id).select("-password")
    },
    login: async (_, {email, password}) => {
      const user = await User.findOne({email})
      if (!user) throw new Error("User not found")
      if (!(await comparePasswords(password, user.password)))
        throw new Error("Password is incorrect")

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

export default userResolvers
