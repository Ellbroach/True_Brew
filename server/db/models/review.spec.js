/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('has the expected schema definition', () => {
    expect(Review.attributes.title).to.be.an('object');
    expect(Review.attributes.content).to.be.an('object');
    expect(Review.attributes.rating).to.be.an('object');
  });
})