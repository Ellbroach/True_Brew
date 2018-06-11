import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_SHOWS = 'GET_SHOWS';
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
const CREATE_SHOW = 'CREATE_SHOW';
const UPDATE_SHOW = 'UPDATE_SHOW';
const DELETE_SHOW = 'DELETE_SHOW';

/**
 * ACTION CREATORS
 */
const getShows = (shows) => {
  return {
    type: GET_SHOWS,
    shows
  }
}

const getSearchResults = (results) => {
  return {
    type: GET_SEARCH_RESULTS,
    results
  }
}

const createShow = (show) => {
  return {
    type: CREATE_SHOW,
    show
  }
}

const updateShow = (show) => {
  return {
    type: UPDATE_SHOW,
    show
  }
}

const deleteShow = (id) => {
  return {
    type: DELETE_SHOW,
    id
  }
}

/**
 * THUNK CREATORS
 */
export function fetchShows () {
  return function thunk (dispatch) {
    return axios.get('/api/shows')
    .then(res => res.data)
    .then(shows => dispatch(getShows(shows)))
    .catch(err => console.error('Fetching shows unsuccesful.', err))
  }
}

export function queryShows (searchTerm) {
  return function thunk (dispatch) {
    return axios.get(`/api/shows/search?q=${searchTerm}`)
    .then(res => res.data)
    .then(shows => dispatch(getSearchResults(shows)))
    .then(() => history.push('/'))
    .catch(err => console.error(`Searching shows by ${searchTerm} unsuccesful.`, err))
  }
}

export function addShow (show) {
  return function thunk (dispatch) {
    return axios.post('/api/shows', show)
    .then(res => res.data)
    .then(newShow => {
      dispatch(createShow(newShow))
      history.push(`/shows/${newShow.id}`)
    })
    .catch(err => console.error(`Creating show ${show} unsuccesful.`, err))
  }
}

export function editShow (show, id) {
  return function thunk (dispatch) {
    return axios.put(`/api/shows/${id}`, show)
    .then(res => res.data)
    .then(editedShow => dispatch(updateShow(editedShow)))
    .catch(err => console.error(`Updating show ${show} unsuccesful.`, err))
  }
}

export function removeShow (id) {
  return function thunk (dispatch) {
    return axios.delete(`/api/shows/${id}`)
    .then(() => dispatch(deleteShow(id)))
    .catch(err => console.error(`Deleting show (id: ${id}) unsuccesful.`, err))
  }
}

export default function reducer(shows = [], action) {
  switch (action.type) {
    case GET_SHOWS:
      return action.shows;
    case GET_SEARCH_RESULTS:
      return action.results;
    case CREATE_SHOW:
      return [...shows, action.show];
    case UPDATE_SHOW:
      return shows.map(show => {
        return show.id === action.show.id ? action.show : show
      });
    case DELETE_SHOW:
      return shows.filter(show => show.id !== action.id);
    default:
      return shows;
  }
}
