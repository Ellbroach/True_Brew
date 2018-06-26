import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import beers from './beers'
import breweries from './breweries'
import brewery from './brewery'
import orders from './orders'
import reviews from './reviews'
import beer from './beer'

const reducer = combineReducers({user, beers, beer, breweries, brewery, cart: orders, reviews})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './beers'
export * from './breweries'
export * from './brewery'
export * from './orders'
export * from './reviews'
export * from './beer'