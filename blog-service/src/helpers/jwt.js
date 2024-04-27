import jwt from "jsonwebtoken"

// Verify a JWT
const verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (error) {
    console.error("Invalid token")
    return null
  }
}

// Sign a JWT
const signToken = (payload, secretKey, options) => {
  try {
    const token = jwt.sign(payload, secretKey, options)
    return token
  } catch (error) {
    console.error("Failed to sign token")
    console.error(error)
    return null
  }
}

// Refresh a JWT
const refreshToken = (token, secretKey, options) => {
  try {
    const decoded = jwt.verify(token, secretKey)
    const refreshedToken = jwt.sign(decoded, secretKey, options)
    return refreshedToken
  } catch (error) {
    console.error("Failed to refresh token")
    return null
  }
}

// Decode a JWT
const decodeToken = token => {
  try {
    const decoded = jwt.decode(token)
    return decoded
  } catch (error) {
    console.error("Failed to decode token")
    return null
  }
}

// Export the functions
export {verifyToken, signToken, refreshToken, decodeToken}
