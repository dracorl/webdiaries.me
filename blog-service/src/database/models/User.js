import mongoose from "mongoose"

const linkSchema = new mongoose.Schema({
  name: String,
  url: String
})

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      default: ""
    },
    links: {
      type: [linkSchema],
      default: []
    }
  },
  {timestamps: true}
)

const User = mongoose.model("User", userSchema)

export default User
