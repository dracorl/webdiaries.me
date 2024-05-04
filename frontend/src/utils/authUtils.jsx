import client from "./apollo"
import {gql} from "@apollo/client"

const IS_TOKEN_EXPIRED_QUERY = gql`
  query Query($token: String!) {
    isTokenExpired(token: $token)
  }
`

const isLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken")
  if (!accessToken) return false
  if (isTokenExpired(accessToken) === true) {
    localStorage.removeItem("accessToken")
    return false
  }
  return true
}

const isTokenExpired = async token => {
  const {data} = await client.query({
    query: IS_TOKEN_EXPIRED_QUERY,
    variables: {token}
  })
  return data.isTokenExpired
}

const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("refreshToken", refreshToken)
}

const clearTokens = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

export {isLoggedIn, isTokenExpired, saveTokens, clearTokens}
