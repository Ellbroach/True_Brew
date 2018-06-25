/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchReviews, addReview, editReview, removeReview} from './reviews'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Thunk creators:', () => {
    let store
    let mockAxios

    const initialState = [];

    beforeEach(() => {
        mockAxios = new MockAdapter(axios)
        store = mockStore(initialState)
    })

    afterEach(() => {
        mockAxios.restore()
        store.clearActions()
    })

    describe('fetchReviews', () => {
        it('fetches all reviews data', () => {
        const fakeReviews = [{
            title: 'Soo Good',
            rating: 3.5,
            content: 'what do you think this is'
        }, {
            title: 'Soo Soo Good',
            rating: 5,
            content: 'you think what I think this is'
        }]
        mockAxios.onGet('/api/reviews').replyOnce(200, fakeReviews)
        store.dispatch(fetchReviews())
            .then(() => {
                const actions = store.getActions()
                expect(actions[0].type).to.be.equal('GET_REVIEWS')
                expect(actions[0].reviews).to.be.eql(fakeReviews)
            })
        })
    })

    describe('addReview', () => {
        it('adds a review to the store', () => {
        const fakeReview = {
            title: 'Soo Soo Really Good',
            rating: 5,
            content: 'you never think what I think this is'
        }
        mockAxios.onPost('/api/reviews').replyOnce(201, fakeReview)
        return store.dispatch(addReview(fakeReview))
            .then(() => {
                const actions = store.getActions()
                expect(actions[0].type).to.be.equal('CREATE_REVIEW')
                expect(actions[0].review).to.be.eql(fakeReview)
            })
        })
    })

    describe('updateReview', () => {
        it('updates a review in store', () => {
        const fakeReview = {
            title: 'Maybe not',
            rating: 1,
            content: 'you think what I think this is'
        }
        mockAxios.onPut('/api/reviews/1').replyOnce(200, fakeReview)
        return store.dispatch(editReview(fakeReview, 1))
            .then(() => {
                const actions = store.getActions()
                expect(actions[0].type).to.be.equal('UPDATE_REVIEW')
                expect(actions[0].review).to.be.eql(fakeReview)
            })
        })
    })

    describe('removeReview', () => {
        it('deletes a review from store', () => {
        mockAxios.onDelete('/api/reviews/1').replyOnce(204)
        return store.dispatch(removeReview(1))
            .then(() => {
                const actions = store.getActions()
                expect(actions[0].type).to.be.equal('DELETE_REVIEW')
            })
        })
    })
})
