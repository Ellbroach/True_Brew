const db = require('../server/db')
const { Beer, User, Genre, Brewery } = require('../server/db/models')
const Chance = require('chance')


const makeUsers = 10;
const chance = new Chance(1555)


const associateBeer = (breweries, beers) => {
  const breweryBeerAssociations = []
  breweryBeerAssociations.push(
    beers.forEach(beer => beer.setBreweries(breweries.find(
      brewery => brewery.name === beer.brewery
    ))))

  return breweryBeerAssociations
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
        name: `Allagash Brewing Company`, owner: 'Rob Todd (Founder)', description: 'Allagash Brewing Company is dedicated to crafting the best Belgian-inspired beers in the world. Best known for our flagship beer, Allagash White, we also enjoy aging beer in oak barrels (beginning with the launch of Curieux in 2004) and spontaneously fermented beers (beginning with our traditional Coolship in 2007).',
        city: 'Portland', state: 'Maine', imageUrl: baseUrl + '/companyImages/Allagash.png', ownerImage: baseUrl + '/companyImages/founders/Allagash-Founder.png'
      }),
      Brewery.create({
        name: 'Brooklyn Brewery', owner: 'Steve Hindy (50%, founder) and Eric/Robin Ottaway (50%, early family investors)', description: 'Like our namesake borough, The Brooklyn Brewery is made up of a rich collection of characters from all over the world. In our Williamsburg home, these characters are dedicated to brewing and selling great beer and enriching the communities we serve. Together, these Brooklynites have assembled the skills needed to transform a home brewing hobby into an independent brewery with a brand that has become an international beacon for good beer.  Starting with our flagship Brooklyn Lager, the portfolio of Brooklyn Brewery has grown to a wide-ranging collection of beers, always keeping an eye to traditional brewing techniques, even as Brewmaster Garrett Oliver and his team seek to push the boundaries of beer.',
        city: 'Brooklyn', state: 'New York', imageUrl: baseUrl + '/companyImages/Brooklyn.png', ownerImage: baseUrl + '/companyImages/founders/Brooklyn-Founder.png'
      }),
      Brewery.create({
        name: 'Dogfish Head Brewery', owner: 'Sam Calagione (Founder)', description: 'Ever since the summer of 1995, we have been brewing, cooking, selling and talking everything beer. It\'s our pastime, our passion, our life. 23 years later, we’re just as dedicated to bringing off-centered goodness to off-centered people through our beer, scratch-made spirits, great food, our very own Inn and our events around the country.',
        city: 'Milton', state: 'Delaware', imageUrl: baseUrl + '/companyImages/Dogfish.png', ownerImage: baseUrl + '/companyImages/founders/Dogfish-Founder.png'
      }),
      Brewery.create({
        name: `Ithaca Beer Company`, owner: 'Dan Mitchell (Founder)', description: 'Ithaca Beer Co. was founded in 1998 by Dan Mitchell in a small renovated retail store just outside of Ithaca, New York. The original space had a small 10 barrel brewhouse, a modest tasting bar and sold full growlers to go as well as homebrew supplies. Today, Ithaca Beer brews about 25,000 barrels of beer per year and features both 50 and 5 barrel pilot brew houses and a full service farm-to-table brewpub. In addition to a state of the art brewing facility, Ithaca Beer has fully automated packaging capabilities for bottling, canning and kegging. Ithaca Beer distributes beer to 54 wholesalers in 14 states in the Northeast from New England in the East to Ohio in the West and Virginia and North Carolina to the South.',
        city: 'Ithaca', state: 'New York', imageUrl: baseUrl + '/companyImages/Ithaca.png', ownerImage: baseUrl + '/companyImages/founders/Ithaca-Founder.png'
      }),
      Brewery.create({
        name: 'New Belgium Brewing Company', owner: '100% Employee owned', description: 'New Belgium Brewing Purpose Statement: To manifest our love and talent by crafting our customers\' favorite brands and proving business can be a force for good.',
        city: 'Fort Collins', state: 'Colorado', imageUrl: baseUrl + '/companyImages/NewBelgium.png', ownerImage: baseUrl + '/companyImages/founders/New-Belgium-Founder.png'
      }),
      Brewery.create({
        name: 'Roscoe Beer Company', owner: 'Phil Vallone (founder)', description: 'Brought into the world by a small group of folks with a passion for craft beer and a deep-rooted love for their hometown of Roscoe, the The Roscoe Beer Co launched its flagship brew, Trout Town American Amber Ale in April 2013. Since then the brewery has added on delicious new favorites such as the Trout Town Brown Ale and the Trout Town Rainbow Red Ale. Brewmaster Josh “The Kid” Hughes will brew seasonal beers such as the The Bavarian or the Barley Bonfire throughout the year.',
        city: 'Roscoe', state: 'New York', imageUrl: baseUrl + '/companyImages/Roscoe.png', ownerImage: baseUrl + '/companyImages/founders/Roscoe-Founders.png'
      }),
      Brewery.create({
        name: 'Smuttynose Brewing Company', owner: 'Peter Egelstein (Founder)', description: 'Smuttynose is a genuine craft brewery. Our mission: to brew fine, fresh, distinctive beers, characteristic of our wholesome New England origins. Simple as that.',
        city: 'Hampton', state: 'New Hampshire', imageUrl: baseUrl + '/companyImages/Smuttynose.png', ownerImage: baseUrl + '/companyImages/founders/Smuttynose-Founder.png'
      }),
      Brewery.create({
        name: 'Stone Brewing Company', owner: 'Greg Koch (founder)', description: 'We are the global standard bearer for independent craft beer. We put Team Stone first in order to create badass beer and amazing experiences. We\'re quality nuts and freshness fanatics, and we\'re head over heels for hops. We’re proud to be the largest employer in craft beer with a dynamic team spanning three continents. We have always been independent, and we will always be independent.',
        city: 'Escondido', state: 'California', imageUrl: baseUrl + '/companyImages/Stone.png', ownerImage: baseUrl + '/companyImages/founders/Stone-Founder.png'
      }),
      Brewery.create({
        name: 'Radiant Pig Craft Beers', owner: 'Rob Pihl and Laurisa Milici (Founders)', description: 'Radiant Pig Craft Beers began as a pipe dream for a couple of homebrewers in a small Manhattan apartment. After years of perfecting recipes, countless hours of researching (drinking beer) and a ton of trips to Brooklyn fetching ingredients, we finally got our very own brewing business off the ground. In February 2013, we brewed our first commerical batch of our flagship beer, Junior.',
        city: 'New York', state: 'New York', imageUrl: baseUrl + '/companyImages/RadiantPig.png', ownerImage: baseUrl + '/companyImages/founders/Radiant-Pig-Founder.png'
      })
    ])

    const genres = await Promise.all([
      Genre.create({name: 'IPA', description:'Hoppy and smooth. Nothing crazy with these ones.'})
    ])
    const beers = await Promise.all([
    Beer.create({ name: '90 minute IPA',  description: 'Gettin Down', price: 3.00, availability: 'available', imageUrl: baseUrl + '/concertImages/4.png', abv: '9.2%', brewery: 'Dogfish Head Brewery'
    }),
    Beer.create({ name: 'White',  description: 'Our interpretation of a Belgian-style wheat beer is brewed with oats, malted wheat, and unmalted raw wheat for a hazy, “white” appearance. Spiced with our own special blend of coriander and Curaçao orange peel, White upholds the Belgian tradition of beers that are both complex and refreshing. Though it’s brewed in Maine, the recipe sticks to its Belgian roots. We’ve worked hard to make sure that the White in your hand tastes the same as it did back in 1995, when Rob Tod brewed the first batch.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/White.png', abv: '4.5%', brewery: 'Allagash Brewing Company'
    }),
    Beer.create({ name: 'Hoppy Table Beer',  description: 'While Hoppy Table Beer was inspired by the Belgian tradition of low-ABV, easily drinkable beers, it still occupies a hop-forward spot all its own. Brewed with our 2-row malt blend, Maris Otter malt, and oats, the beer is then spiced with a subtle addition of coriander. We ferment it with our house yeast for classic Belgian citrus aromas. Hoppy Table Beer is hopped with Chinook, Cascade, Comet, and Azacca hops, then dry hopped with more Comet and Azacca. A mildly hoppy aroma full of grapefruit springs from this straw-colored, light-bodied ale. Flavors of pine and stone fruit balance the beer’s clean, slightly bitter finish.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/HTB.png', abv: '4.8%', brewery: 'Allagash Brewing Company'
    }),
    Beer.create({ name: 'Saison',  description: 'Allagash Saison is our interpretation of a classic Belgian farmhouse-style ale. Saisons were once brewed to slake the thirst of farmers returning from a long day of toil; they were spicy, light, and drinkable. We brew this amber beer with a 2-row barley blend, malted rye, oats, and dark Belgian candi sugar. Northern Brewer, Bravo, and Cascade hops deliver a citrus profile with light bitterness. By fermenting with a traditional saison yeast strain, notes of spice and tropical fruit accent the aroma. Citrus and peppery spice balance its pleasant malt character. This beer is full bodied with a rustic, dry finish. Made for enjoying, no matter which type of work you’re returning from.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Saison.png', abv: '6.1%', brewery: 'Allagash Brewing Company'
    }),
    Beer.create({ name: 'Black',  description: 'Technically, there is no such thing as a traditional Belgian stout, but we went ahead and made one anyway. In creating the beer, we took the aspects we loved in Belgian beers and used them to craft a stout. We brew Allagash Black with 2-row barley, torrified wheat, oats, roasted barley, chocolate malt, black malt and hop with Northern Brewer and Glacier. A generous portion of dark caramelized candi sugar produces a hint of raisin in the finished beer. The addition of oats lends Black a silky mouthfeel, which is enhanced by rich flavors of coffee and dark chocolate.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Black.png', abv: '7.5%', brewery: 'Allagash Brewing Company'
    }),
    Beer.create({ name: 'Tripel',  description: 'This strong golden ale carries herbal notes and passion fruit in the aroma. Suggestions of honey and biscuit are found in Tripel’s complex, varied palate. Brewed with our 2-row barley blend, hopped with Nugget and Hallertau, then fermented on our house yeast, Tripel lingers on the palate for a complex, dry finish.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Tripel.png', abv: '9.0%', brewery: 'Allagash Brewing Company'
    }),
    Beer.create({ name: 'Curieux',  description: 'First brewed back in 2004, Curieux was our first foray into barrel aging. To make Curieux, we take our Tripel and let it age in bourbon barrels for seven weeks. Once that time is up, we take the beer out of our cold cellars and blend it back with a portion of fresh Tripel. The resulting rich, golden ale features smooth notes of coconut, vanilla, and a hint of bourbon.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Curieux.png', abv: '11.0%', brewery: 'Allagash Brewing Company'
    }),
    Beer.create({ name: 'Sixteen Counties',  description: 'This beer’s name honors the rich tradition of farming in the sixteen counties of Maine. Keeping with that sentiment, we brew the beer with grains exclusively grown and processed in Maine, including: Maine Malt House 2-row Malted Barley from Buck Farms, Blue Ox Malthouse 2-row Malted Barley, raw wheat from Maine Grains, and oats from Aurora Mills & Farm.  Sixteen Counties has an amber hue with notes of honey, tropical hops, citrus, and a hint of cereal grain. The beer’s malt-forward flavor is meant to showcase the next generation of quality farming in Maine.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Sixteen-Counties.png', abv: '7.3%', brewery: 'Allagash Brewing Company'
    }),
    Beer.create({ name: 'House',  description: 'Allagash House beer is brewed in the tradition of Belgian house beers.  The aroma has hop-derived pear and grapefruit notes. The flavor is clean with a slight malt presence and a lingering hop bitterness. For sale here at the brewery only.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-House.png', abv: '4.5%', brewery: 'Allagash Brewing Company'
    })
    ]);


    console.log(`seeded ${breweries.length} breweries`)
    console.log(`seeded ${genres.length} genres`)
    console.log(`seeded ${beers.length} beers`)
    const associatedBeers = await Promise.all(associateBeer(breweries, beers))
    console.log(`Made ${associatedBeers.length} associations for beers.`)
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
