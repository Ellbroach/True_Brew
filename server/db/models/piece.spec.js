/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Piece = db.model('piece')

describe('Piece model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  it('has the expected schema definition', () => {
    expect(Piece.attributes.name).to.be.an('object');
    expect(Piece.attributes.description).to.be.an('object');
    expect(Piece.attributes.imageUrl).to.be.an('object');
    expect(Piece.attributes.availability).to.be.an('object');
  });
})
