import axios from "axios";
import {

ADD_FOLLOW,
REMOVE_FOLLOW,
GET_FOLLOWERS,
GET_FOLLOWING


} from "./types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/"



export function getFollowersFromApi(username){
    return async function(dispatch) {
        console.log(username)
        const token = localStorage.getItem("token")
        const response = await axios({method: "GET",
                                      url: `${API_URL}users/${username}/followers`, 
                                      headers: {
                                        Authorization: `Bearer ${token}` 
                                      }})
        return dispatch(getFollowers(response.data))
    }
}

function getFollowers(data) {
    return {
        type: GET_FOLLOWERS,
        data 
    }
}

export function getFollowingFromApi(username){
    return async function(dispatch) {
        const token = localStorage.getItem("token")
        const response = await axios({method: "GET",
                                      url: `${API_URL}users/${username}/following`, 
                                      headers: {
                                        Authorization: `Bearer ${token}` 
                                      }})
        return dispatch(getFollowing(response.data))
    }
}

function getFollowing(data) {
    return {
        type: GET_FOLLOWING,
        data 
    }
}

export function addFollowWithApi(username, id){
    return async function(dispatch) {
        const token = localStorage.getItem("token")
        const response = await axios({method: "POST",
                                      url: `${API_URL}users/${username}/follow`, 
                                      data: {id: id},
                                      headers: {
                                        Authorization: `Bearer ${token}` 
                                      }})
        return dispatch(addFollow(response.data))
    }
}

function addFollow(data) {
    return {
        type: ADD_FOLLOW,
        data 
    }
}

export function deleteFollowFromApi(username, id){
    return async function(dispatch) {
        const token = localStorage.getItem("token")
        const response = await axios({method: "DELETE",
                                      url: `${API_URL}users/${username}/follow`, 
                                      data: {id: id},
                                      headers: {
                                        Authorization: `Bearer ${token}` 
                                      }})
        console.log(response.data)
        return dispatch(removeFollow(response.data))
    }
}

function removeFollow(data) {
    return {
        type: REMOVE_FOLLOW,
        data 
    }
}