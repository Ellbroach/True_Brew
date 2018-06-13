import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_BEERS = 'GET_BEERS';
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
const CREATE_BEER = 'CREATE_BEER';
const UPDATE_BEER = 'UPDATE_BEER';
const DELETE_BEER = 'DELETE_BEER';

/**
 * ACTION CREATORS
 */
const getBeers = (beers) => {
  return {
    type: GET_BEERS,
    beers
  }
}

const getSearchResults = (results) => {
  return {
    type: GET_SEARCH_RESULTS,
    results
  }
}

const createBeer = (beer) => {
  return {
    type: CREATE_BEER,
    beer
  }
}

const updateBeer = (beer) => {
  return {
    type: UPDATE_BEER,
    beer
  }
}

const deleteBeer = (id) => {
  return {
    type: DELETE_BEER,
    id
  }
}

export function fetchBeers () {
  return function thunk (dispatch) {
    return axios.get('/api/beers')
    .then(res => res.data)
    .then(beers => dispatch(getBeers(beers)))
    .catch(err => console.error('Fetching beers unsuccesful.', err))
  }
}

export function queryBeers (searchTerm) {
  return function thunk (dispatch) {
    return axios.get(`/api/beers/search?q=${searchTerm}`)
    .then(res => res.data)
    .then(beers => dispatch(getSearchResults(beers)))
    .then(() => history.push('/'))
    .catch(err => console.error(`Searching beers by ${searchTerm} unsuccesful.`, err))
  }
}

export function addBeer (beer) {
  return function thunk (dispatch) {
    return axios.post('/api/beers', beer)
    .then(res => res.data)
    .then(newBeer => {
      dispatch(createBeer(newBeer))
      history.push(`/beers/${newBeer.id}`)
    })
    .catch(err => console.error(`Creating beer ${beer} unsuccesful.`, err))
  }
}

export function editBeer (beer, id) {
  return function thunk (dispatch) {
    return axios.put(`/api/beers/${id}`, beer)
    .then(res => res.data)
    .then(editedBeer => dispatch(updateBeer(editedBeer)))
    .catch(err => console.error(`Updating beer ${beer} unsuccesful.`, err))
  }
}

export function removeBeer (id) {
  return function thunk (dispatch) {
    return axios.delete(`/api/beers/${id}`)
    .then(() => dispatch(deleteBeer(id)))
    .catch(err => console.error(`Deleting beer (id: ${id}) unsuccesful.`, err))
  }
}

export default function reducer(beers = [], action) {
  switch (action.type) {
    case GET_BEERS:
      return action.beers;
    case GET_SEARCH_RESULTS:
      return action.results;
    case CREATE_BEER:
      return [...beers, action.beer];
    case UPDATE_BEER:
      return beers.map(beer => {
        return beer.id === action.beer.id ? action.beer : beer
      });
    case DELETE_BEER:
      return beers.filter(beer => beer.id !== action.id);
    default:
      return beers;
  }
}
