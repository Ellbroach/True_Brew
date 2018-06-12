import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PIECES = 'GET_PIECES';
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
const CREATE_PIECE = 'CREATE_PIECE';
const UPDATE_PIECE = 'UPDATE_PIECE';
const DELETE_PIECE = 'DELETE_PIECE';

/**
 * ACTION CREATORS
 */
const getPieces = (pieces) => {
  return {
    type: GET_PIECES,
    pieces
  }
}

const getSearchResults = (results) => {
  return {
    type: GET_SEARCH_RESULTS,
    results
  }
}

const createPiece = (piece) => {
  return {
    type: CREATE_PIECE,
    piece
  }
}

const updatePiece = (piece) => {
  return {
    type: UPDATE_PIECE,
    piece
  }
}

const deletePiece = (id) => {
  return {
    type: DELETE_PIECE,
    id
  }
}

export function fetchPieces () {
  return function thunk (dispatch) {
    return axios.get('/api/pieces')
    .then(res => res.data)
    .then(pieces => dispatch(getPieces(pieces)))
    .catch(err => console.error('Fetching pieces unsuccesful.', err))
  }
}

export function queryPieces (searchTerm) {
  return function thunk (dispatch) {
    return axios.get(`/api/pieces/search?q=${searchTerm}`)
    .then(res => res.data)
    .then(pieces => dispatch(getSearchResults(pieces)))
    .then(() => history.push('/'))
    .catch(err => console.error(`Searching pieces by ${searchTerm} unsuccesful.`, err))
  }
}

export function addPiece (piece) {
  return function thunk (dispatch) {
    return axios.post('/api/pieces', piece)
    .then(res => res.data)
    .then(newPiece => {
      dispatch(createPiece(newPiece))
      history.push(`/pieces/${newPiece.id}`)
    })
    .catch(err => console.error(`Creating piece ${piece} unsuccesful.`, err))
  }
}

export function editPiece (piece, id) {
  return function thunk (dispatch) {
    return axios.put(`/api/pieces/${id}`, piece)
    .then(res => res.data)
    .then(editedPiece => dispatch(updatePiece(editedPiece)))
    .catch(err => console.error(`Updating piece ${piece} unsuccesful.`, err))
  }
}

export function removePiece (id) {
  return function thunk (dispatch) {
    return axios.delete(`/api/pieces/${id}`)
    .then(() => dispatch(deletePiece(id)))
    .catch(err => console.error(`Deleting piece (id: ${id}) unsuccesful.`, err))
  }
}

export default function reducer(pieces = [], action) {
  switch (action.type) {
    case GET_PIECES:
      return action.pieces;
    case GET_SEARCH_RESULTS:
      return action.results;
    case CREATE_PIECE:
      return [...pieces, action.piece];
    case UPDATE_PIECE:
      return pieces.map(piece => {
        return piece.id === action.piece.id ? action.piece : piece
      });
    case DELETE_PIECE:
      return pieces.filter(piece => piece.id !== action.id);
    default:
      return pieces;
  }
}
