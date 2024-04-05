import dotenv from "dotenv" // Import dotenv package

dotenv.config() // Load environment variables from .env file

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE
} = process.env

const connectionString = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`

console.log(connectionString)
export {connectionString}
