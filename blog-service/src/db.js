import mongoose from "mongoose"
import {connectionString} from "./config/index.js"

await mongoose.connect(connectionString)
console.log(`MongoDB connected`)
const mongoClient = mongoose.connection.getClient()

export {mongoClient}
