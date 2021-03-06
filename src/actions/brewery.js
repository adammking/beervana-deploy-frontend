
import axios from "axios"
import { 
SEARCH_BREWERIES,
GET_BREWERY,
ADD_BREWERY,
UPDATE_BREWERY,
ADD_BEER_TO_BREWERY,
UPDATE_BEER_IN_BREWERY

} from "./types" 

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/"


export function getBreweryFromApi(id){
    return async function(dispatch) {
        const token = localStorage.getItem("token")
        const response = await axios({method: "GET",
                                      url: `${API_URL}breweries/${id}`, 
                                      headers: {
                                          Authorization: `Bearer ${token}` 
                                      }})
        return dispatch(getBrewery(response.data))
    }
}


function getBrewery(data) {
    return {
        type: GET_BREWERY,
        data 
    }
}

export function searchBreweriesFromApi(data){
    return async function(dispatch) {
        const token = localStorage.getItem("token")
        const response = await axios({method: "GET",
                                      url: `${API_URL}breweries/`, 
                                      params: data,
                                      headers: {
                                          Authorization: `Bearer ${token}` 
                                      }})
                                      
        return dispatch(searchBreweries(response.data))
    }
}


function searchBreweries(data) {
    return {
        type: SEARCH_BREWERIES,
        data 
    }
}

export function updateBreweryFromApi(id, data){
    return async function(dispatch) {
        const token = localStorage.getItem("token")
        const response = await axios({method: "PATCH",
                                      url: `${API_URL}breweries/${id}`, 
                                      data: data,
                                      headers: {
                                          Authorization: `Bearer ${token}` 
                                      }})
        return dispatch(updateBrewery(response.data))
    }
}

function updateBrewery(data) {
    return {
        type: UPDATE_BREWERY,
        data 
    }
}

export function addBreweryFromApi(data){
    return async function(dispatch) {
        const token = localStorage.getItem("token")
        const response = await axios({method: "POST",
                                      url: `${API_URL}breweries`, 
                                      data: data,
                                      headers: {
                                          Authorization: `Bearer ${token}` 
                                      }})
        return dispatch(addBrewery(response.data))
    }
}

function addBrewery(data) {
    return {
        type: ADD_BREWERY,
        data 
    }
}

export function addBeerToBreweryWithApi(id, data){
    return async function(dispatch) {
        const token = localStorage.getItem("token")
        const response = await axios({method: "POST",
                                      url: `${API_URL}breweries/${id}/beers`, 
                                      data: data,
                                      headers: {
                                          Authorization: `Bearer ${token}` 
                                      }})
        return dispatch(addBeerToBrewery(response.data))
    }
}

function addBeerToBrewery(data) {
    return {
        type: ADD_BEER_TO_BREWERY,
        data 
    }
}

export function updateBeerInBreweryFromApi(id, name, data){
    return async function(dispatch) {
        const token = localStorage.getItem("token")
        const response = await axios({method: "PATCH",
                                      url: `${API_URL}breweries/${id}beers/${name}`, 
                                      data: data,
                                      headers: {
                                          Authorization: `Bearer ${token}` 
                                      }})
        return dispatch(updateBeerInBrewery(response.data))
    }
}

function updateBeerInBrewery(data) {
    return {
        type: UPDATE_BEER_IN_BREWERY,
        data 
    }
}
