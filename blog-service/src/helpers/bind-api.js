import axios from "axios"
import {BIND_API, BIND_API_KEY, SERVER_IP, NODE_ENV} from "../config/index.js" // Import BIND_API and BIND_API_KEY from config

// set axios setttings
axios.defaults.baseURL = BIND_API
axios.defaults.headers.common["X-Api-Key"] = BIND_API_KEY
axios.defaults.headers.common.Accept = "application/json"
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.delete["Content-Type"] = "application/json"

const body = {
  response: SERVER_IP,
  rrtype: "A",
  ttl: 3600
}

const checkDomain = async domain => {
  if (NODE_ENV === "development") return false
  try {
    const response = await axios.get(`/${domain}.webdiaries.online`)
    if (Object.keys(response.data).length === 0) return false
    return true
  } catch (error) {
    throw new Error(error.response.data)
  }
}

const createDomain = async domain => {
  if (NODE_ENV === "development") return true
  try {
    await axios.post(`/${domain}.webdiaries.online`, body)
    return true
  } catch (error) {
    throw new Error(error.response.data)
  }
}

const deleteDomain = async domain => {
  if (NODE_ENV === "development") return true
  try {
    await axios.delete(`/${domain}.webdiaries.online`, {data: body})
    return true
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
}

export {checkDomain, createDomain, deleteDomain}
