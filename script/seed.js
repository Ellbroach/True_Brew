const db = require('../server/db')
const { Piece } = require('../server/db/models')
const {User} = require('../server/db/models')
const {Genre} = require('../server/db/models')
const Chance = require('chance')


const makeUsers = 10;
const chance = new Chance(1555)

const associateGenres = (genres, pieces) => {
  const pieceGenreAssociations = []
  for (let piece of pieces){
    const randomInt = chance.integer({
      min: 0,
      max: genres.length - 1
    })
    pieceGenreAssociations.push(piece.setGenres(genres[randomInt]))
  }
  return pieceGenreAssociations
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
    const baseUrl = 'http://127.0.0.1:8080';
    const pieces = await Promise.all([
      Piece.create({ name: 'Lil Pump @ Terminal 5',  description: 'Gettin Down', price: 55.00, availability: 'available', date: ['9/09/18'], imageUrl: baseUrl + '/concertImages/4.png'
    }),
//     Show.create({ name: 'Katy Perry @ MSG',  description: 'Killin it', price: 33.00, availability: 'available', quantity: 45, date: ['9/10/18'], time: 'TEST', imageUrl: baseUrl + '/concertImages/1.png', imageCaption: 'hiii'
//   }),
//   Show.create({ name: 'Frank Ocean @ Brooklyn Steel',  description: 'Killin it', price: 33.00, availability: 'available', quantity: 45, date: ['9/10/18'], time: 'TEST', imageUrl: baseUrl + '/concertImages/3.png', imageCaption: 'hiii'
// })
    ]);
    console.log(`seeded ${genres.length} genres`)
    console.log(`seeded ${pieces.length} pieces`)

    const associatedGenres =  await Promise.all(associateGenres(genres, pieces))
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
