const db = require('../server/db')
const { Show } = require('../server/db/models')
const {User} = require('../server/db/models')
const {Genre} = require('../server/db/models')
const Chance = require('chance')


const makeUsers = 10;
const chance = new Chance(1555)

const associateGenres = (genres, shows) => {
  const showGenreAssociations = []
  for (let show of shows){
    const randomInt = chance.integer({
      min: 0,
      max: genres.length - 1
    })
    showGenreAssociations.push(show.setGenres(genres[randomInt]))
  }
  return showGenreAssociations
}

const createUsers = totalUsers => {
    const users = [
      {
        firstName: 'Charlie',
        lastName: 'Enberg',
        email: 'Charlie@gmail.com',
        password: '456',
        role: 'admin',
        city: chance.city(),
        state: chance.state({ full: true}),
      },
      {
        firstName: 'TEST',
        lastName: 'Broach',
        email: 'TEST.com',
        password: '123',
        city: chance.city(),
        state: chance.state({ full: true}),
      }
    ]
    const emails = chance.unique(chance.email, totalUsers)
    for (let i = users.length; i <= totalUsers; i++){
      users.push({
        firstName: chance.first(),
        lastName: chance.last(),
        email: emails.pop(),
        password: chance.string(),
        city: chance.city(),
        state: chance.state({ full: true}),
      })
    }
    return users
  }  /* eslint-disable max-statements */


async function seed() {
    await db.sync({ force: true })
    console.log('db synced!')

    const userList = createUsers(makeUsers)
    userList.forEach(user => User.create(user))
    console.log(`seeded ${userList.length} users`);

    const genres = await Promise.all([
      Genre.create({name: 'rock', description:'rock and roll!'})
    ])

    const shows = await Promise.all([
      Show.create({ name: 'TEST 5',  description: 'Amazingly yummy', price: 8.50, availability: 'available', quantity: 45, date: ['9/09/18'], time: 'TEST', imageUrl: 'https://www.macalester.edu/sustainability/wp-content/uploads/sites/90/2016/07/realfood.jpg', imageCaption: 'hiii'
    }),
      // Show.create({ name: 'Jalapeno Burgers', description: 'Amazingly yummy', price: 9.00, availability: 'available', quantity: 45, date: ['9/09/18']}),
      // Show.create({ name: 'Asian Salad', description: 'Amazingly yummy', price: 10.95, availability: 'available', quantity: 45, date: ['9/09/18']}),
      // Show.create({ name: 'Grandmas\'s Chicken Noodel Soup', description: 'Amazingly yummy', price: 9.95, availability: 'available', quantity: 18, date: ['9/09/18'] })
    ]);
    console.log(`seeded ${genres.length} genres`)
    console.log(`seeded ${shows.length} shows`)
    //const baseUrl = 'http://127.0.0.1:8080';

    const associatedGenres =  await Promise.all(associateGenres(genres, shows))
    console.log(`Made ${associatedGenres.length} associations for genres.`)

    console.log(`seeded successfully`)
  }

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

  console.log('seeding...')
