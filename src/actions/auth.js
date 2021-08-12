import axios from "axios";



import { 
REGISTER_USER,
GET_TOKEN,
LOG_OUT

} from "./types" 

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/"

function setTokeninLocal(response) {
    localStorage.setItem("token", response.data.token)
    const { username } = localStorage.getItem("token")
    localStorage.setItem("username", username)
}


export function getTokenFromApi(data){
    return async function(dispatch) {
        const response = await axios({method: "POST",
                                      url: `${API_URL}auth/token`, 
                                      data: {username: data.username, 
                                             password: data.password},
                                    })
        setTokeninLocal(response)
        return dispatch(getToken(response.data))
}               

}

function getToken(data) {
    console.log("Inside get token function")
    return { 
        type: GET_TOKEN,
        data
    }
}

export function registerUserWithApi(data){
    return async function(dispatch) {
        const response = await axios({method: "POST",
                                      url: `${API_URL}auth/register`, 
                                      data: {username: data.username, 
                                             password: data.password,
                                             firstName: data.firstName,
                                             lastName: data.lastName},
                                    })
                                            
        setTokeninLocal(response)
        return dispatch(registerUser(response.data))
    }
}

function registerUser(data) {
    return { 
        type: REGISTER_USER,
        data
    }
}

export function logout() {
    return {
        type: LOG_OUT
    }
}





