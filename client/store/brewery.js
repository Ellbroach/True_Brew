'use strict'

import axios from 'axios';


const GET_BREWERY = 'GET_BREWERY';
// const GET_BREWRY_BEERS = 'GET_BREWERY_BEERS'


const getBrewery = brewery => ({ type: GET_BREWERY, brewery})
// const getBreweryBeers = beers => ({type: GET_BREWRY_BEERS, beers})

export const fetchBrewery = id => dispatch =>
  axios.get(`/api/breweries/${id}`)
    .then(res => res.data)
    .then(brewery => dispatch(getBrewery(brewery)))
    .catch(err => console.error(`Fetching brewery ${id} unsuccesful.`, err))

// export const fetchBreweryBeers = (id, name) => dispatch =>
//     axios.get(`/api/breweries/${id}`)
//     .then(res => res.data)
//     .then(beers => dispatch(getBreweryBeers(brewery.beers.map(brewBeer => brewBeer.find(beers.name)))))


export default function reducer(brewery = {}, action) {
    switch (action.type) {
        case GET_BREWERY:
            return action.brewery;
    default:
        return brewery;
    }
}