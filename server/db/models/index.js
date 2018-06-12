const User = require('./user')
const Piece = require('./piece')
const Genre = require('./genre')


Piece.belongsToMany(Genre, {through: 'Piece_Genre'})
Genre.belongsToMany(Piece, {through: 'Piece_Genre'})


module.exports = {
  User,
  Piece,
  Genre
}
