/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Brewery = db.model('brewery')

describe('Brewery model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  it('has the expected schema definition', () => {
    expect(Brewery.attributes.name).to.be.an('object');
    expect(Brewery.attributes.description).to.be.an('object');
    expect(Brewery.attributes.imageUrl).to.be.an('object');
    expect(Brewery.attributes.state).to.be.an('object');
    expect(Brewery.attributes.city).to.be.an('object');
  });
})
