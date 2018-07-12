/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Beer = db.model('beer')
const Genre = db.model('genre')

describe('Routes without seed data', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('`/api/beers` URI', () => {
        it('GET responds with an empty array initially', () => {
            return request(app)
                .get('/api/beers')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.eql([])
            })
        })
    })

    describe('`/api/beers` URI', () => {
        const fakeBeer = {
            name: 'yamiyami',
            price: 10,
            description: 'what do you think this is',
            availability: 'pending',
            abv: '6%',
            genres: ['rock'],
            brewery: 'Allagash',
            type: 'IPA',
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
        }
        const otherBeer = {
            name: 'yamiyami',
            price: 10,
            description: 'what do you think this is',
            abv: '6%',
            availability: 'pending',
            genres: [{name:'rock', id:1}],
            brewery: 'Allagash',
            type: 'IPA',
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
        }

        beforeEach(() => {
            Genre.create({name: 'rock', description: 'lalala'})
            return Beer.create( fakeBeer )
        })

        it('GET responds that a Beer has been added', () => {
            return request(app)
                .get('/api/beers')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(fakeBeer.name)
                    expect(res.body[0].abv).to.equal(fakeBeer.abv)
            })
        })

        it('POST creates a Beer', () => {
            return request(app)
                .post('/api/beers')
                .send(otherBeer)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(otherBeer.name)
                    expect(res.body.price).to.equal(otherBeer.price.toFixed(2))
                    expect(res.body.description).to.equal(otherBeer.description)
                    expect(res.body.abv).to.equal(otherBeer.abv)
                    expect(res.body.imageUrl).to.equal(otherBeer.imageUrl)

            })
        })
    })

    describe('`/api/beers/:beerId` URI', () => {
        const fakeBeer = {
            name: 'yamiyami',
            price: 10,
            time: '0:20',
            abv: '5%',
            date: ['thing'],
            description: 'what do you think this is',
            type: 'IPA',
            brewery: 'Allagash',
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg'
        }

        beforeEach(() => {
            return Beer.create( fakeBeer )
        })

        it('GET responds that a specific beer has been added', () => {
            return request(app)
                .get('/api/beers/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(fakeBeer.name)
                    expect(res.body.abv).to.equal(fakeBeer.abv)
                    expect(res.body.price).to.equal(fakeBeer.price.toFixed(2))
                    expect(res.body.description).to.equal(fakeBeer.description)
            })
        })

        describe('PUT & DELETE `/api/beers/:beerId`', () => {

            beforeEach(() => {
                return Beer.update({
                    availability: 'available',
                    imageUrl: 'http://www.amazon.com',
                }, {
                    where: { id: 1 }
                })
            })

            it('DELETE remove a specific beer', () => {
                return request(app)
                    .delete('/api/beers/1')
                    .expect(204)
            })
        })
    })
})
