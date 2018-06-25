import axios from 'axios';
import history from '../history'


const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart
  }
}

const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    item
  }
}

const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    productId
  }
}

export function fetchCart() {
  return function thunk(dispatch) {
    return axios.get('/api/cart')
      .then(res => res.data)
      .then(cart => dispatch(getCart(cart)))
  }
}

export function createItem(item) {
  return function thunk(dispatch) {
    return axios.post('/api/cart', item)
      .then(res => res.data)
      .then(cart => {
        dispatch(getCart(cart))
      })
  }
}

export function deleteItem(productId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/cart/item/${productId}`)
      .then(item => dispatch(removeFromCart(productId)))
  }
}

export function checkout(price) {
  return function thunk() {
    return axios.post(`/api/cart/checkout`, {price})
      .then(item => {
        history.push('/')
        return undefined
      })
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return action.cart
    case REMOVE_FROM_CART:
      const updatedItems = state.lineItems.filter(i => i.productId !== action.productId);
      return { ...state, lineItems: updatedItems }
    default:
      return state
  }
}
