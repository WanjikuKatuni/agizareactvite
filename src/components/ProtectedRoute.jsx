import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState } from "react"
import { useEffect } from "react"


// ensures access to child components only when user is authenticated

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    },[])

    // refresh access token automatically
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            // send request to api to refresh token
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            })
            // update access token if refresh is successful(status=200)
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN. res.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }
            
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }

    }

    // check validity of token (if token needs to be refreshed)
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        // set authorization to false if no token is found
        if(!token) {
            setIsAuthorized(false)
            return
        }

        // decode token to get expiration date
        const decode = jwtDecode(token) //decode token to get info
        const tokenExpiration = decode.exp 
        const now = Date.now() / 1000   // current time in seconds

        // if expired, refresh token
        if (tokenExpiration < now) {
            await refreshToken()
        }
        else {
            setIsAuthorized(true)
        }
    }

    // render when authorization is being checked
    if (isAuthorized == null) {
        return <div>Loading...</div>
    }

    // render child components when authorization is successful
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute