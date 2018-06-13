/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Beer = db.model('beer')

describe('Beer model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  it('has the expected schema definition', () => {
    expect(Beer.attributes.name).to.be.an('object');
    expect(Beer.attributes.description).to.be.an('object');
    expect(Beer.attributes.imageUrl).to.be.an('object');
    expect(Beer.attributes.availability).to.be.an('object');
  });
})
