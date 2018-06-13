import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_BREWERIES = 'GET_BREWERIES';
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
const CREATE_BREWERY = 'CREATE_BREWERY';
const UPDATE_BREWERY = 'UPDATE_BREWERY';

/**
 * ACTION CREATORS
 */
const getBreweries = (breweries) => {
  return {
    type: GET_BREWERIES,
    breweries
  }
}

const getSearchResults = (results) => {
  return {
    type: GET_SEARCH_RESULTS,
    results
  }
}

const createBrewery = (brewery) => {
  return {
    type: CREATE_BREWERY,
    brewery
  }
}

const updateBrewery = (brewery) => {
  return {
    type: UPDATE_BREWERY,
    brewery
  }
}


export function fetchBreweries () {
  return function thunk (dispatch) {
    return axios.get('/api/breweries')
    .then(res => res.data)
    .then(breweries => dispatch(getBreweries(breweries)))
    .catch(err => console.error('Fetching breweries unsuccesful.', err))
  }
}

export function queryBreweries (searchTerm) {
  return function thunk (dispatch) {
    return axios.get(`/api/breweries/search?q=${searchTerm}`)
    .then(res => res.data)
    .then(breweries => dispatch(getSearchResults(breweries)))
    .then(() => history.push('/'))
    .catch(err => console.error(`Searching breweries by ${searchTerm} unsuccesful.`, err))
  }
}

export function addBrewery (brewery) {
  return function thunk (dispatch) {
    return axios.post('/api/breweries', brewery)
    .then(res => res.data)
    .then(newBrewery => {
      dispatch(createBrewery(newBrewery))
      history.push(`/breweries/${newBrewery.id}`)
    })
    .catch(err => console.error(`Creating brewery ${brewery} unsuccesful.`, err))
  }
}

export function editBrewery (brewery, id) {
  return function thunk (dispatch) {
    return axios.put(`/api/breweries/${id}`, brewery)
    .then(res => res.data)
    .then(editedBrewery => dispatch(updateBrewery(editedBrewery)))
    .catch(err => console.error(`Updating brewery ${brewery} unsuccesful.`, err))
  }
}

export default function reducer(breweries = [], action) {
  switch (action.type) {
    case GET_BREWERIES:
      return action.breweries;
    case GET_SEARCH_RESULTS:
      return action.results;
    case CREATE_BREWERY:
      return [...breweries, action.brewery];
    case UPDATE_BREWERY:
      return breweries.map(brewery => {
        return brewery.id === action.brewery.id ? action.brewery : brewery
      });
    default:
      return breweries;
  }
}
