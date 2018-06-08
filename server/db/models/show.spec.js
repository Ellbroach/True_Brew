/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Show = db.model('show')

describe('Show model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  it('has the expected schema definition', () => {
    expect(Show.attributes.name).to.be.an('object');
    expect(Show.attributes.description).to.be.an('object');
    expect(Show.attributes.imageUrl).to.be.an('object');
    expect(Show.attributes.quantity).to.be.an('object');
    expect(Show.attributes.availability).to.be.an('object');
  });
})
