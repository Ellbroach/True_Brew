/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Beer = db.model('beer')
const Brewery = db.model('brewery')

describe('Routes without seed data', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('`/api/breweries` URI', () => {
        it('GET responds with an empty array initially', () => {
            return request(app)
                .get('/api/breweries')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.eql([])
            })
        })
    })

    describe('`/api/breweries` URI', () => {
        const fakeBrewery = {
            name: 'yamiyami',
            owner: 'yo',
            description: 'what do you think this is',
            beers: [{name: 'dogfish'}],
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
            state: 'CT',
            city: 'Wilton',
            site: 'site',
        }
        const otherBrewery = {
            name: 'yamiyami',
            owner: 'yo',
            description: 'what do you think this is',
            beers: [{
                name: 'yamiyami',
                price: 10,
                time: '0:20',
                abv: '5%',
                date: ['thing'],
                description: 'what do you think this is',
                type: 'IPA',
                brewery: 'Allagash',
                imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg'
            }],
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
            state: 'CT',
            city: 'Wilton',
            site: 'site',
        }

        beforeEach(() => {
            Beer.create({
                name: 'yamiyami',
                price: 10,
                time: '0:20',
                abv: '5%',
                date: ['thing'],
                description: 'what do you think this is',
                type: 'IPA',
                brewery: 'Allagash',
                imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg'
            })
            return Brewery.create( fakeBrewery )
        })

        it('GET responds that a Brewery has been added', () => {
            return request(app)
                .get('/api/breweries')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(fakeBrewery.name)
                    expect(res.body[0].abv).to.equal(fakeBrewery.abv)
            })
        })

        it('POST creates a Brewery', () => {
            return request(app)
                .post('/api/breweries')
                .send(otherBrewery)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(fakeBrewery.name)
                    expect(res.body.description).to.equal(fakeBrewery.description)
                    expect(res.body.state).to.equal(fakeBrewery.state)
                    expect(res.body.city).to.equal(fakeBrewery.city)
                    expect(res.body.owner).to.equal(fakeBrewery.owner)
            })
        })
    })

    describe('`/api/breweries/:breweryId` URI', () => {
        const fakeBrewery = {
            name: 'yamiyami',
            owner: 'yo',
            description: 'what do you think this is',
            beers: [{name:'dogfish'}],
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
            state: 'CT',
            city: 'Wilton',
            site: 'site',
        }

        beforeEach(() => {
            return Brewery.create( fakeBrewery )
        })

        it('GET responds that a specific brewery has been added', () => {
            return request(app)
                .get('/api/breweries/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(fakeBrewery.name)
                    expect(res.body.description).to.equal(fakeBrewery.description)
                    expect(res.body.state).to.equal(fakeBrewery.state)
                    expect(res.body.city).to.equal(fakeBrewery.city)
                    expect(res.body.owner).to.equal(fakeBrewery.owner)
            })
        })

        describe('PUT & DELETE `/api/breweries/:breweryId`', () => {

            beforeEach(() => {
                return Brewery.update({
                    availability: 'available',
                    imageUrl: 'http://www.amazon.com',
                }, {
                    where: { id: 1 }
                })
            })
        })
    })
})
