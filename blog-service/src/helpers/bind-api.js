import axios from "axios"
import {BIND_API, BIND_API_KEY, SERVER_IP} from "../config/index.js" // Import BIND_API and BIND_API_KEY from config

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
  try {
    const response = await axios.get(`/${domain}.webdiaries.me`)
    if (Object.keys(response.data).length === 0) return false
    return true
  } catch (error) {
    throw new Error(error.response.data)
  }
}

const createDomain = async domain => {
  try {
    await axios.post(`/${domain}.webdiaries.me`, body)
    return true
  } catch (error) {
    throw new Error(error.response.data)
  }
}

const deleteDomain = async domain => {
  try {
    await axios.delete(`/${domain}.webdiaries.me`, {data: body})
    return true
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
}

export {checkDomain, createDomain, deleteDomain}
