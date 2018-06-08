const db = require('../server/db')
const { Show, ShowImage } = require('../server/db/models')
const {User} = require('../server/db/models')
const Chance = require('chance')


const makeUsers = 10;
const chance = new Chance(1555)

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

    const shows = await Promise.all([
      Show.create({ name: 'TEST 5', description: 'Amazingly yummy', price: 8.50, availability: 'available', quantity: 45, date: ['9/09/18']}),
      Show.create({ name: 'Jalapeno Burgers', description: 'Amazingly yummy', price: 9.00, availability: 'available', quantity: 45, date: ['9/09/18']}),
      Show.create({ name: 'Asian Salad', description: 'Amazingly yummy', price: 10.95, availability: 'available', quantity: 45, date: ['9/09/18']}),
      Show.create({ name: 'Grandmas\'s Chicken Noodel Soup', description: 'Amazingly yummy', price: 9.95, availability: 'available', quantity: 18, date: ['9/09/18'] })
    ]);
    console.log(`seeded ${shows.length} shows`)
    const baseUrl = 'http://127.0.0.1:8080';
    const showImages = await Promise.all([
      ShowImage.create({ imageUrl: baseUrl + '/resources/seedImages/1.jpeg', caption: 'TEST 2' }),
      ShowImage.create({ imageUrl: baseUrl + '/resources/seedImages/2.jpeg', caption: 'ewwwwww' }),
      ShowImage.create({ imageUrl: baseUrl + '/resources/seedImages/3.jpeg', caption: 'Looks weird, i think' }),
      ShowImage.create({ imageUrl: baseUrl + '/resources/seedImages/4.jpeg', caption: '' })
    ])
    console.log(`seeded ${showImages.length} showImages`)
    // Wowzers! We can even `await` on the right-hand side of the assignment operator
    // and store the result that the promise resolves to in a variable! This is nice!
  
    console.log('Creating required associations')
    const showImageAssociations = []
    let i = 0;
    for (let show of shows) {
        showImageAssociations.push(show.addShowImage(ShowImage[i]))
      i++
    }
    await Promise.all(showImageAssociations)
    console.log(`Associated ${showImageAssociations.length} showImages`)
  
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
