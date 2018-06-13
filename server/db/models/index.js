const User = require('./user')
const Beer = require('./beer')
const Genre = require('./genre')
const Brewery = require('./brewery')


Beer.belongsToMany(Genre, {through: 'Beer_Genre'})
Genre.belongsToMany(Beer, {through: 'Beer_Genre'})
Beer.belongsToMany(Brewery, {through: 'Beer_Brewery'})
Brewery.belongsToMany(Beer, {through: 'Beer_Brewery'})

module.exports = {
  User,
  Beer,
  Genre,
  Brewery
}
