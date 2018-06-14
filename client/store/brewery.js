'use strict'

import axios from 'axios';


const GET_BREWERY = 'GET_BREWERY';


const getBrewery = brewery => ({ type: GET_BREWERY, brewery})


export const fetchBrewery = id => dispatch =>
  axios.get(`/api/breweries/${id}`)
    .then(res => res.data)
    .then(brewery => dispatch(getBrewery(brewery)))
    .catch(err => console.error(`Fetching brewery ${id} unsuccesful.`, err))


export default function reducer(brewery = {}, action) {
    switch (action.type) {
        case GET_BREWERY:
            return action.brewery;
    default:
        return brewery;
    }
}