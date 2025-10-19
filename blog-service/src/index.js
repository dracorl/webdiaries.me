import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import {decodeToken} from "./helpers/jwt.js"
import {typeDefs, resolvers} from "./graphql/index.js"
import {mongoClient} from "./db.js"
import {BLOG_SERVICE_PORT} from "./config/index.js"

const server = new ApolloServer({typeDefs, resolvers})

const {url} = await startStandaloneServer(server, {
  listen: {
    port: BLOG_SERVICE_PORT
  },
  cors: {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., non-browser clients)
      if (!origin) return callback(null, true)
      if (origin.endsWith(".webdiaries.online")) {
        return callback(null, true)
      }
      return callback(new Error("Not allowed by CORS"))
    },
    credentials: true // Allow cookies or auth headers if needed
  },
  context: async ({req, res}) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || ""

    // Try to retrieve a user with the token
    // const user = await getUser(token)
    const user = decodeToken(token)
    // Add the user to the context
    return {user}
  }
})

console.log(`🚀 Server listening at: ${url}`)
