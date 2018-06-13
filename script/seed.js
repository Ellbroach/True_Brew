const db = require('../server/db')
const { Beer, User, Genre, Brewery } = require('../server/db/models')
const Chance = require('chance')


const makeUsers = 10;
const chance = new Chance(1555)

const associateGenres = (genres, beers) => {
  const beerGenreAssociations = []
  for (let beer of beers){
    const randomInt = chance.integer({
      min: 0,
      max: genres.length - 1
    })
    beerGenreAssociations.push(beer.setGenres(genres[randomInt]))
  }
  return beerGenreAssociations
}

const associateFlavors = (genres, beers) => {
  const genreBeerAssociations = []
    genreBeerAssociations.push(beers[0].setGenres(genres[0]))

    return genreBeerAssociations
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
    const baseUrl = 'http://127.0.0.1:8080';
    const breweries = await Promise.all([
      Brewery.create({
        name: 'Allagash Brewing Company', owner: 'Rob Todd (Founder)', description: 'Allagash Brewing Company is dedicated to crafting the best Belgian-inspired beers in the world. Best known for our flagship beer, Allagash White, we also enjoy aging beer in oak barrels (beginning with the launch of Curieux in 2004) and spontaneously fermented beers (beginning with our traditional Coolship in 2007).',
        city: 'Portland', state: 'Maine', imageUrl: baseUrl + '/companyImages/Allagash.png'
      }),
      Brewery.create({
        name: 'Brooklyn Brewery', owner: 'Steve Hindy (50%, founder) and Eric/Robin Ottaway (50%, early family investors)', description: 'Like our namesake borough, The Brooklyn Brewery is made up of a rich collection of characters from all over the world. In our Williamsburg home, these characters are dedicated to brewing and selling great beer and enriching the communities we serve. Together, these Brooklynites have assembled the skills needed to transform a home brewing hobby into an independent brewery with a brand that has become an international beacon for good beer.  Starting with our flagship Brooklyn Lager, the portfolio of Brooklyn Brewery has grown to a wide-ranging collection of beers, always keeping an eye to traditional brewing techniques, even as Brewmaster Garrett Oliver and his team seek to push the boundaries of beer.',
        city: 'Brooklyn', state: 'New York', imageUrl: baseUrl + '/companyImages/Brooklynbrewery.png'
      }),
      Brewery.create({
        name: 'Dogfish Head Brewery', owner: 'Sam Calagione (Founder)', description: 'Ever since the summer of 1995, we have been brewing, cooking, selling and talking everything beer. It\'s our pastime, our passion, our life. 23 years later, we’re just as dedicated to bringing off-centered goodness to off-centered people through our beer, scratch-made spirits, great food, our very own Inn and our events around the country.',
        city: 'Milton', state: 'Delaware', imageUrl: baseUrl + '/companyImages/Dogfish.png'
      }),
      Brewery.create({
        name: 'Ithaca Beer Company', owner: 'Dan Mitchell (Founder)', description: 'Ithaca Beer Co. was founded in 1998 by Dan Mitchell in a small renovated retail store just outside of Ithaca, New York. The original space had a small 10 barrel brewhouse, a modest tasting bar and sold full growlers to go as well as homebrew supplies. Today, Ithaca Beer brews about 25,000 barrels of beer per year and features both 50 and 5 barrel pilot brew houses and a full service farm-to-table brewpub. In addition to a state of the art brewing facility, Ithaca Beer has fully automated packaging capabilities for bottling, canning and kegging. Ithaca Beer distributes beer to 54 wholesalers in 14 states in the Northeast from New England in the East to Ohio in the West and Virginia and North Carolina to the South.  Ithaca Beer’s flagship Flower Power IPA continuously garners high marks with Beer Advocate and Rate Beer as well as many media accolades. Most recently, Flower Power was recognized as the “25th Most Important American Craft Beer Ever Brewed” by Food & Wine magazine.',
        city: 'Ithaca', state: 'New York', imageUrl: baseUrl + '/companyImages/Ithaca.png'
      }),
      Brewery.create({
        name: 'New Belgium Brewing Company', owner: '100% Employee owned', description: 'New Belgium Brewing Purpose Statement: To manifest our love and talent by crafting our customers\' favorite brands and proving business can be a force for good.',
        city: 'Fort Collins', state: 'Colorado', imageUrl: baseUrl + '/companyImages/NewBelgium.png'
      }),
      Brewery.create({
        name: 'Roscoe Beer Company', owner: 'Phil Vallone (founder)', description: 'Brought into the world by a small group of folks with a passion for craft beer and a deep-rooted love for their hometown of Roscoe, the The Roscoe Beer Co launched its flagship brew, Trout Town American Amber Ale in April 2013. Since then the brewery has added on delicious new favorites such as the Trout Town Brown Ale and the Trout Town Rainbow Red Ale. Brewmaster Josh “The Kid” Hughes will brew seasonal beers such as the The Bavarian or the Barley Bonfire throughout the year.',
        city: 'Roscoe', state: 'New York', imageUrl: baseUrl + '/companyImages/Roscoe.png'
      }),
      Brewery.create({
        name: 'Smuttynose Brewing Company', owner: 'Peter and Janet Egelstein (Founders)', description: 'Smuttynose is a genuine craft brewery. Our mission: to brew fine, fresh, distinctive beers, characteristic of our wholesome New England origins. Simple as that.',
        city: 'Hampton', state: 'New Hampshire', imageUrl: baseUrl + '/companyImages/Smuttynose.png'
      }),
      Brewery.create({
        name: 'Stone Brewing Company', owner: 'Greg Koch (founder)', description: 'We are the global standard bearer for independent craft beer. We put Team Stone first in order to create badass beer and amazing experiences. We\'re quality nuts and freshness fanatics, and we\'re head over heels for hops. We’re proud to be the largest employer in craft beer with a dynamic team spanning three continents. We have always been independent, and we will always be independent.',
        city: 'Escondido', state: 'California', imageUrl: baseUrl + '/companyImages/Stone.png'
      }),
      Brewery.create({
        name: 'Radiant Pig Craft Beers', owner: 'Rob Pihl and Laurisa Milici (Founders)', description: 'Radiant Pig Craft Beers began as a pipe dream for a couple of homebrewers in a small Manhattan apartment. After years of perfecting recipes, countless hours of researching (drinking beer) and a ton of trips to Brooklyn fetching ingredients, we finally got our very own brewing business off the ground. In February 2013, we brewed our first commerical batch of our flagship beer, Junior.',
        city: 'New York', state: 'New York', imageUrl: baseUrl + '/companyImages/RadiantPig.png'
      })
    ])

    const genres = await Promise.all([
      Genre.create({name: 'IPA', description:'Hoppy and smooth. Nothing crazy with these ones.'})
    ])
    const beers = await Promise.all([
      Beer.create({ name: '90 minute IPA',  description: 'Gettin Down', price: 3.00, availability: 'available', imageUrl: baseUrl + '/concertImages/4.png', abv: '9.2%'
    })
    ]);
    console.log(`seeded ${breweries.length} breweries`)
    console.log(`seeded ${genres.length} genres`)
    console.log(`seeded ${beers.length} beers`)

    const associatedGenres =  await Promise.all(associateFlavors(genres, beers))
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
