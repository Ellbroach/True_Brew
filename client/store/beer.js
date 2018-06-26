'use strict'

import axios from 'axios';


const GET_BEER = 'GET_BEER';

const getBeer = beer => ({ type: GET_BEER, beer})

export const fetchBeer = id => dispatch =>
  axios.get(`/api/beers/${id}`)
    .then(res => res.data)
    .then(beer => dispatch(getBeer(beer)))
    .catch(err => console.error(`Fetching beer ${id} unsuccesful.`, err))


export default function reducer(beer = {}, action) {
    switch (action.type) {
        case GET_BEER:
            return action.beer;
    default:
        return beer;
    }
}