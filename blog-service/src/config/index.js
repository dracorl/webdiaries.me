import dotenv from "dotenv" // Import dotenv package

dotenv.config() // Load environment variables from .env file

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE
} = process.env

const {BIND_API, BIND_API_KEY, SERVER_IP} = process.env
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env
const connectionString = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`

export {
  connectionString,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  BIND_API,
  BIND_API_KEY,
  SERVER_IP
}
