// axios interceptor for HTTP requests

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"


// initialize axios instance with base url from env
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// add request interceptor to attach to authorization header to each outgoing request if an access token is present in local storage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, 
    (error) => {
        return Promise.reject(error)
    }
)

export default api