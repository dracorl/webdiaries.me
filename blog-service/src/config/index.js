import dotenv from "dotenv" // Import dotenv package

dotenv.config() // Load environment variables from .env file

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_AUTH_SOURCE
} = process.env

const {NODE_ENV} = process.env
const {BIND_API, BIND_API_KEY, SERVER_IP} = process.env
const {YANDEX_USER, YANDEX_PASS} = process.env
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env
const connectionString = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=${MONGODB_AUTH_SOURCE}`

export {
  connectionString,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  BIND_API,
  BIND_API_KEY,
  SERVER_IP,
  YANDEX_USER,
  YANDEX_PASS,
  NODE_ENV
}
