const User = require('./user')
const Show = require('./show')
const Genre = require('./genre')


Show.belongsToMany(Genre, {through: 'Show_Genre'})
Genre.belongsToMany(Show, {through: 'Show_Genre'})


module.exports = {
  User,
  Show,
  Genre
}
