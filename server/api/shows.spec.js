/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Piece = db.model('piece')
const Genre = db.model('genre')

describe('Routes without seed data', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('`/api/pieces` URI', () => {
        it('GET responds with an empty array initially', () => {
            return request(app)
                .get('/api/pieces')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.eql([])
            })
        })
    })

    describe('`/api/pieces` URI', () => {
        const fakePiece = {
            name: 'yamiyami',
            price: 10,
            date: ['test'],
            description: 'what do you think this is',
            availability: 'pending',
            genres: ['rock'],
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
        }
        const otherPiece = {
            name: 'yamiyami',
            price: 10,
            date: ['test'],
            description: 'what do you think this is',
            availability: 'pending',
            genres: [{name:'rock', id:1}],
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg',
        }

        beforeEach(() => {
            Genre.create({name: 'rock', description: 'lalala'})
            return Piece.create( fakePiece )
        })

        it('GET responds that a Piece has been added', () => {
            return request(app)
                .get('/api/pieces')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(fakePiece.name)
            })
        })

        it('POST creates a Piece', () => {
            return request(app)
                .post('/api/pieces')
                .send(otherPiece)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(otherPiece.name)
                    expect(res.body.price).to.equal(otherPiece.price.toFixed(2))
                    expect(res.body.description).to.equal(otherPiece.description)
                    expect(res.body.date).to.be.deep.equal(otherPiece.date)
                    expect(res.body.time).to.equal(otherPiece.time)
                    expect(res.body.imageUrl).to.equal(otherPiece.imageUrl)

            })
        })
    })

    describe('`/api/pieces/:pieceId` URI', () => {
        const fakePiece = {
            name: 'yamiyami',
            price: 10,
            time: '0:20',
            date: ['thing'],
            description: 'what do you think this is',
            imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg'
        }

        beforeEach(() => {
            return Piece.create( fakePiece )
        })

        it('GET responds that a specitic piece has been added', () => {
            return request(app)
                .get('/api/pieces/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(fakePiece.name)
                    expect(res.body.price).to.equal(fakePiece.price.toFixed(2))
                    expect(res.body.description).to.equal(fakePiece.description)
            })
        })

        describe('PUT & DELETE `/api/pieces/:pieceId`', () => {

            beforeEach(() => {
                return Piece.update({
                    availability: 'available',
                    imageUrl: 'http://www.amazon.com',
                }, {
                    where: { id: 1 }
                })
            })

            it('DELETE remove a specific piece', () => {
                return request(app)
                    .delete('/api/pieces/1')
                    .expect(204)
            })
        })
    })
})
