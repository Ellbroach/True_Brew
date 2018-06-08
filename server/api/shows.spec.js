/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Show = db.model('show')
const Genre = db.model('genre')

describe('Routes without seed data', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('`/api/shows` URI', () => {
        it('GET responds with an empty array initially', () => {
            return request(app)
                .get('/api/shows')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.eql([])
            })
        })
    })

    describe('`/api/shows` URI', () => {
        const fakeShow = {
            name: 'yamiyami',
            price: 10,
            time: '0:20',
            date: ['thing'],
            quantity: 2,
            description: 'what do you think this is',
            availability: 'pending',
            genres: ['rock'],
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
            imageCaption: 'hello'
        }
        const otherShow = {
            name: 'yamiyami',
            price: 10,
            time: '0:20',
            date: ['thing'],
            quantity: 2,
            description: 'what do you think this is',
            availability: 'pending',
            genres: [{name:'rock', id:1}],
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
            imageCaption: 'hello'
        }

        beforeEach(() => {
            Genre.create({name: 'rock', description: 'lalala'})
            return Show.create( fakeShow )
        })

        it('GET responds that a Show has been added', () => {
            return request(app)
                .get('/api/shows')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(fakeShow.name)
            })
        })

        it('POST creates a Show', () => {
            return request(app)
                .post('/api/shows')
                .send(otherShow)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(otherShow.name)
                    expect(res.body.price).to.equal(otherShow.price.toFixed(2))
                    expect(res.body.description).to.equal(otherShow.description)
                    expect(res.body.quantity).to.equal(otherShow.quantity)
                    expect(res.body.availability).to.equal(otherShow.availability)
                    expect(res.body.date).to.be.deep.equal(otherShow.date)
                    expect(res.body.time).to.equal(otherShow.time)
                    expect(res.body.imageUrl).to.equal(otherShow.imageUrl)
                    expect(res.body.imageCaption).to.equal(otherShow.imageCaption)

            })
        })
    })

    describe('`/api/shows/:showId` URI', () => {
        const fakeShow = {
            name: 'yamiyami',
            price: 10,
            time: '0:20',
            date: ['thing'],
            quantity: 2,
            description: 'what do you think this is',
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
            imageCaption: 'hello'
        }

        beforeEach(() => {
            return Show.create( fakeShow )
        })

        it('GET responds that a specitic show has been added', () => {
            return request(app)
                .get('/api/shows/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(fakeShow.name)
                    expect(res.body.price).to.equal(fakeShow.price.toFixed(2))
                    expect(res.body.quantity).to.equal(fakeShow.quantity)
                    expect(res.body.description).to.equal(fakeShow.description)
            })
        })

        describe('PUT & DELETE `/api/shows/:showId`', () => {

            beforeEach(() => {
                return Show.update({
                    availability: 'available',
                    imageUrl: 'http://www.amazon.com',
                }, {
                    where: { id: 1 }
                })
            })

            it('DELETE remove a specific show', () => {
                return request(app)
                    .delete('/api/shows/1')
                    .expect(204)
            })
        })
    })
})
