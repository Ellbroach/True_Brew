const db = require('../server/db')
const { Beer, User, Genre, Brewery, Review } = require('../server/db/models')
const Chance = require('chance')


const makeUsers = 10;
const chance = new Chance(1555)
const maxReviews = 3

const generateReview = () => {
  let title = chance.word()
  let titleLength = chance.integer({min: 0, max: 3})
  for (let i = 0; i < titleLength; i++){
    title += ' ' + chance.word()
  }
  return {
    title,
    content: chance.paragraph(chance.integer({min: 1, max: 3})),
    rating: chance.integer({min: 1, max: 5}),
  }
}


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
    const users = await Promise.all(userList.map(user => User.create(user)));
    console.log(`seeded ${users.length} users`);
    const baseUrl = 'http://127.0.0.1:8080';
    const breweries = await Promise.all([
      Brewery.create({
        name: `Allagash Brewing Company`, owner: 'Rob Todd (Founder)', description: 'Allagash Brewing Company is dedicated to crafting the best Belgian-inspired beers in the world. Best known for our flagship beer, Allagash White, we also enjoy aging beer in oak barrels (beginning with the launch of Curieux in 2004) and spontaneously fermented beers (beginning with our traditional Coolship in 2007).',
        city: 'Portland', state: 'Maine', imageUrl: baseUrl + '/companyImages/Allagash.png', ownerImage: baseUrl + '/companyImages/founders/Allagash-Founder.png'
      }),
      Brewery.create({
        name: 'Brooklyn Brewery', owner: 'Steve Hindy (Founder)', description: 'Like our namesake borough, The Brooklyn Brewery is made up of a rich collection of characters from all over the world. In our Williamsburg home, these characters are dedicated to brewing and selling great beer and enriching the communities we serve. Together, these Brooklynites have assembled the skills needed to transform a home brewing hobby into an independent brewery with a brand that has become an international beacon for good beer.',
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
    Beer.create({ name: 'White',  description: 'Our interpretation of a Belgian-style wheat beer is brewed with oats, malted wheat, and unmalted raw wheat for a hazy, “white” appearance. Spiced with our own special blend of coriander and Curaçao orange peel, White upholds the Belgian tradition of beers that are both complex and refreshing. Though it’s brewed in Maine, the recipe sticks to its Belgian roots. We’ve worked hard to make sure that the White in your hand tastes the same as it did back in 1995, when Rob Tod brewed the first batch.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/White.png', abv: '4.5%', brewery: 'Allagash Brewing Company', type: 'White Ale'
    }),
    Beer.create({ name: 'Hoppy Table Beer',  description: 'While Hoppy Table Beer was inspired by the Belgian tradition of low-ABV, easily drinkable beers, it still occupies a hop-forward spot all its own. Brewed with our 2-row malt blend, Maris Otter malt, and oats, the beer is then spiced with a subtle addition of coriander. We ferment it with our house yeast for classic Belgian citrus aromas. Hoppy Table Beer is hopped with Chinook, Cascade, Comet, and Azacca hops, then dry hopped with more Comet and Azacca. A mildly hoppy aroma full of grapefruit springs from this straw-colored, light-bodied ale. Flavors of pine and stone fruit balance the beer’s clean, slightly bitter finish.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/HTB.png', abv: '4.8%', brewery: 'Allagash Brewing Company', type: 'Pale Ale'
    }),
    Beer.create({ name: 'Saison',  description: 'Allagash Saison is our interpretation of a classic Belgian farmhouse-style ale. Saisons were once brewed to slake the thirst of farmers returning from a long day of toil; they were spicy, light, and drinkable. We brew this amber beer with a 2-row barley blend, malted rye, oats, and dark Belgian candi sugar. Northern Brewer, Bravo, and Cascade hops deliver a citrus profile with light bitterness. By fermenting with a traditional saison yeast strain, notes of spice and tropical fruit accent the aroma. Citrus and peppery spice balance its pleasant malt character. This beer is full bodied with a rustic, dry finish. Made for enjoying, no matter which type of work you’re returning from.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Saison.png', abv: '6.1%', brewery: 'Allagash Brewing Company', type: 'Saison'
    }),
    Beer.create({ name: 'Black',  description: 'Technically, there is no such thing as a traditional Belgian stout, but we went ahead and made one anyway. In creating the beer, we took the aspects we loved in Belgian beers and used them to craft a stout. We brew Allagash Black with 2-row barley, torrified wheat, oats, roasted barley, chocolate malt, black malt and hop with Northern Brewer and Glacier. A generous portion of dark caramelized candi sugar produces a hint of raisin in the finished beer. The addition of oats lends Black a silky mouthfeel, which is enhanced by rich flavors of coffee and dark chocolate.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Black.png', abv: '7.5%', brewery: 'Allagash Brewing Company', type: 'Stout'
    }),
    Beer.create({ name: 'Tripel',  description: 'This strong golden ale carries herbal notes and passion fruit in the aroma. Suggestions of honey and biscuit are found in Tripel’s complex, varied palate. Brewed with our 2-row barley blend, hopped with Nugget and Hallertau, then fermented on our house yeast, Tripel lingers on the palate for a complex, dry finish.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Tripel.png', abv: '9.0%', brewery: 'Allagash Brewing Company', type: 'Tripel'
    }),
    Beer.create({ name: 'Curieux',  description: 'First brewed back in 2004, Curieux was our first foray into barrel aging. To make Curieux, we take our Tripel and let it age in bourbon barrels for seven weeks. Once that time is up, we take the beer out of our cold cellars and blend it back with a portion of fresh Tripel. The resulting rich, golden ale features smooth notes of coconut, vanilla, and a hint of bourbon.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Curieux.png', abv: '11.0%', brewery: 'Allagash Brewing Company', type: 'Tripel'
    }),
    Beer.create({ name: 'Sixteen Counties',  description: 'This beer’s name honors the rich tradition of farming in the sixteen counties of Maine. Keeping with that sentiment, we brew the beer with grains exclusively grown and processed in Maine, including: Maine Malt House 2-row Malted Barley from Buck Farms, Blue Ox Malthouse 2-row Malted Barley, raw wheat from Maine Grains, and oats from Aurora Mills & Farm.  Sixteen Counties has an amber hue with notes of honey, tropical hops, citrus, and a hint of cereal grain. The beer’s malt-forward flavor is meant to showcase the next generation of quality farming in Maine.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-Sixteen-Counties.png', abv: '7.3%', brewery: 'Allagash Brewing Company', type: 'Golden Ale'
    }),
    Beer.create({ name: 'Allagash House',  description: 'Allagash House beer is brewed in the tradition of Belgian house beers.  The aroma has hop-derived pear and grapefruit notes. The flavor is clean with a slight malt presence and a lingering hop bitterness. For sale here at the brewery only.',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Allagash/Allagash-House.png', abv: '4.5%', brewery: 'Allagash Brewing Company', type: 'Pale Ale'
    }),
    Beer.create({ name: '90 minute IPA',  description: 'Continual hopping provided a beautiful balance to our Imperial IPA - allowing us to add a foolhardy amount of hops throughout the boil without making 90 Minute crushingly bitter. With rich pine and fruity citrus hop aromas and a strong malt backbone, 90 Minute IPA created pungent, unapologetic flavor that led Esquire to call it “perhaps the best IPA in America."',
    price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Dogfish/90-minute.png', abv: '9.0%', brewery: 'Dogfish Head Brewery', type: 'Imperial IPA'
  }),
  Beer.create({ name: '60 minute IPA',  description: 'Brewed using a boatload of intense Northwest hops, we boil this continually hopped IPA for a full 60 minutes, adding more than 60 hop additions continuously to create a bold and timeless flavor. Continually hopped to deliver a pungently, citrusy, grassy hop flavor without being crushingly bitter, 60 Minute IPA is a surprisingly sessionable IPA for the craft enthusiast.',
  price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Dogfish/60-minute.png', abv: '6.0%', brewery: 'Dogfish Head Brewery', type: 'IPA'
}),
  Beer.create({ name: '120 minute IPA',  description: 'Clocking in at 15-20% ABV, 120 Minute IPA is continuously hopped with a copious amount of high-alpha American hops throughout the boil and whirlpool, and then dry-hopped with another pallet of hops. Unfiltered and abundently hoppy, it\'s the Holy Grail for hopheads!',
  price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Dogfish/120-minute.png', abv: '15.0 - 20.0%', brewery: 'Dogfish Head Brewery', type: 'Imperial IPA'
}),
Beer.create({ name: 'Flesh and Blood IPA',  description: 'Brewed with mouth-puckering lemon flesh, sweet orange peel and blood orange juice, Flesh & Blood balances the resinous hoppy characteristics of an American IPA with the explosive zesty fruitiness and subtle drying tartness of citrus to deliver a highly quaffable ale that’s incredibly unique and lovely to down the whole year round.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Dogfish/Flesh-and-Blood.png', abv: '7.5%', brewery: 'Dogfish Head Brewery', type: 'IPA'
}),
Beer.create({ name: 'Romantic Chemistry IPA',  description: 'What you have here is a serious India Pale Ale shacking up and hunkering down with mango and apricots. At the same time! Romantic Chemistry is brewed with an intermingling of mangos, apricots and ginger, and then dry-hopped with three varieties of hops to deliver a tropical fruit aroma and a hop-forward finish. It’s fruity, it’s hoppy, it’s tasty!',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Dogfish/Romantic-Chemistry.png', abv: '7.2%', brewery: 'Dogfish Head Brewery', type: 'IPA'
}),
Beer.create({ name: 'Sea Quench Ale',  description: 'SeaQuench Ale is a session sour mash-up of a crisp Kolsch, a salty Gose, and a tart Berliner Weiss brewed in sequence with black limes, sour lime juice and sea salt to make this the most thirst-quenching beer Dogfish Head has ever brewed.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Dogfish/Sea-Quench.png', abv: '4.9%', brewery: 'Dogfish Head Brewery', type: 'Sour'
}),
Beer.create({ name: 'Namaste White Ale',  description: 'On a quest to brew a witbier chock full of flavor, Namaste White digs deep into our culinary roots using ingredients of dried organic orange slices, fresh-cut lemongrass, peppercorns and a bit of coriander for a refreshing and sessionable experience.  With notes of clove and subtle coriander, you\'ll find flavors of citrus and sweet malt, with a slightly spicy finish for a zesty mouthfeel.  “A twist on the usual witbier - complex in its aroma, simultaneously refreshing and contemplative.” - Paste',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Dogfish/Namaste-White.png', abv: '4.8%', brewery: 'Dogfish Head Brewery', type: 'White Ale'
}),
Beer.create({ name: 'Brooklyn Lager',  description: 'Brooklyn Lager is amber-gold in color and displays a firm malt center supported by a refreshing bitterness and floral hop aroma. Caramel malts show in the finish. The aromatic qualities of the beer are enhanced by “dry-hopping”, the centuries-old practice of steeping the beer with fresh hops as it undergoes a long, cold maturation. The result is a wonderfully flavorful beer, smooth, refreshing and very versatile with food. Dry-hopping is largely a British technique, which we’ve used in a Viennese-style beer to create an American original.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Brooklyn/Bklyn-Lager.png', abv: '5.2%', brewery: 'Brooklyn Brewery', type: 'Lager'
}),
Beer.create({ name: 'Bel Air Sour',  description: 'Brooklyn Bel Air Sour is full of surprises. Our sour ale starts up with bright notes of tropical fruit yet finishes crisp and gently tart. It\'s a trip that\'s laid back, breezy, and completely refreshing.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Brooklyn/Bel-Air-Sour.png', abv: '5.8%', brewery: 'Brooklyn Brewery', type: 'Sour'
}),
Beer.create({ name: 'Defender IPA',  description: 'Defend Beer with Brooklyn Defender IPA, our heroically hopped golden IPA featuring strong notes of tropical fruit, well-muscled hop bitterness, and an incredibly dry finish. Cape not required. #DefendBeer  Brooklyn Defender IPA is proud to be the official beer of New York Comic Con.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Brooklyn/Defender-IPA.png', abv: '5.9%', brewery: 'Brooklyn Brewery', type: 'IPA'
}),
Beer.create({ name: 'Sorachi Ace Saison',  description: 'Brooklyn Sorachi Ace is a classic saison, an unfiltered golden farmhouse ale, with a clean malt flavor and the quirky Sorachi Ace hop standing front and center. Dry-hopping releases Sorachi Ace’s bright, spicy aromatics to tickle the nose before ascending into a fine harmony between pilsner malt and playful Belgian ale yeast.  Brooklyn Sorachi Ace is sunshine in a glass, a shining example of the versatility of one of the world’s most intriguing hops.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Brooklyn/Bklyn-Saison.png', abv: '7.2%', brewery: 'Brooklyn Brewery', type: 'Saison'
}),
Beer.create({ name: 'Brooklyn Pilsner',  description: 'Like its ancestors, Brooklyn Pilsner is traditionally brewed from the finest German two-row barley malts. German-grown Perle and Hallertauer hops provide a crisp, snappy bitterness and fresh, floral aroma. The flavor of the malt comes through in the finish. We ferment Brooklyn Pilsner at cool temperatures, and then give it a long, gentle maturation (lagering), which results in a beer of superior complexity and smoothness. We believe that you will find there to be none finer. Unlike mass-marketed so-called pilsners, Brooklyn Pilsner does not contain cheap fillers such as corn or rice, nor does it contain any preservatives or stabilizers. Brooklyn Pilsner is the real thing.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Brooklyn/Bklyn-Pilsner.png', abv: '5.1%', brewery: 'Brooklyn Brewery', type: 'Pilsner'
}),
Beer.create({ name: 'East IPA',  description: 'East IPA is a clean, drinkable IPA that\'s packed with flavor and offers a bold balance, not a smack in the head. American hops soar in the bright piney aroma, while East Kent Goldings hops bring the taste of stone fruits and firm bitterness from IPA\'s ancestral British home. Give our East IPA a try with some rich crab cakes or salmon, strike up a conversation with farmhouse cheddars, and find harmony alongside spicy dishes. East IPA\'s blend of tradition and exuberance sets the standard for hop-driven deliciousness.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Brooklyn/Bklyn-IPA.png', abv: '6.9%', brewery: 'Brooklyn Brewery', type: 'IPA'
}),
Beer.create({ name: 'Brooklyn Brown Ale',  description: 'This is the award-winning original American brown ale, first brewed as a holiday specialty, and now one of our most popular beers year-round. Northern English brown ales tend to be strong and dry, while southern English brown ales are milder and sweeter. Brooklyn Brown Ale combines the best of those classic styles and then adds an American accent in the form of a firm hop character and roasty palate. A blend of six malts, some of them roasted, give this beer its deep russet-brown color and complex malt flavor, fruity, smooth and rich, with a caramel, chocolate and coffee background. Generous late hopping brings forward a nice hop aroma to complete the picture. Brooklyn Brown Ale is full-flavored but retains a smoothness and easy drinkability that has made it one of the most popular dark beers in the Northeast.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Brooklyn/Bklyn-Brown.png', abv: '5.6%', brewery: 'Brooklyn Brewery', type: 'Brown Ale'
}),
Beer.create({ name: 'Fat Tire',  description: 'Fat Tire’s unique flavor profile originates from the late 1930s, when local Belgian breweries aimed to satisfy the tastes of visiting British soldiers. English floral hops, subtle malt sweetness and spicy, fruity notes from Belgian yeast made for a balanced yet magical combination. These same characteristics are at the heart of Fat Tire.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/New-Belgium/Fat-Tire.png', abv: '5.2%', brewery: 'New Belgium Brewing Company', type: 'Amber Ale'
}),
Beer.create({ name: 'Voodoo Ranger',  description: 'Bursting with tropical aromas and juicy fruit flavors from Mosaic and Amarillo hops, this golden IPA is perfectly bitter with a refreshing, sublime finish.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/New-Belgium/Voodoo-Ranger.png', abv: '7.0%', brewery: 'New Belgium Brewing Company', type: 'IPA'
}),
Beer.create({ name: 'Citradelic',  description: 'Tune in and hop out with New Belgium Citradelic. Set adrift on a kaleidoscopic wave of hoppiness brought to you by a mystical marriage of Citra hops and tangerine peel, which elevates each sip onto a plane of pure tropical, fruity pleasure. Citradelic’s namesake hop and fruit combine to jam with visions of additional hops like citrusy Mandarina Bavaria, tropical Azzaca, and fruity Galaxy for a colorful explosion that’s grounded by just a touch of malty sweetness. Bored by the status quo? Expand your palate with a pour of Citradelic.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/New-Belgium/Citradelic.png', abv: '6.0%', brewery: 'New Belgium Brewing Company', type: 'IPA'
}),
Beer.create({ name: 'Hemperor',  description: 'Get ready: The Hemperor HPA, an exciting new style, will change the way you think about hoppy beers. We found a unique way to recreate the flavors of hemp with a beer that complements the inclusion of hop flavors and hemp hearts (seeds) to deliver something new, delicious and extremely dank.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/New-Belgium/Hemperor.png', abv: '7.0%', brewery: 'New Belgium Brewing Company', type: 'IPA'
}),
Beer.create({ name: 'Flower Power',  description: 'Enjoy the clover honey hue and tropical nose of our celebrated flagship ale. Flower Power is simultaneously punchy and soothing with a big body and a finish that boasts pineapple and grapefruit. We hop and dry hop Flower Power four different times throughout the brewing process for a powerful floral hop experience. Rated the best IPA in New York State, Flower Power is highly regarded among the most discerning hop heads.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Ithaca/Flower-Power.png', abv: '7.2%', brewery: 'Ithaca Beer Company', type: 'IPA'
}),
Beer.create({ name: 'Apricot Wheat',  description: 'Our smooth wheat beer is light in color and body…perfect for those looking for a lighter taste. The combination of wheat and barley gives Apricot Wheat a different malt character than our other ales. The hint of apricot gives this beer a pleasant nose and fruity finish.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Ithaca/Apricot-Wheat.png', abv: '5.0%', brewery: 'Ithaca Beer Company', type: 'Wheat'
}),
Beer.create({ name: 'Brew York',  description: 'Brewed with 100% NYS Hops and 66% NYS Malts, Ithaca Beer Co.\'s Brew York Pale Ale proudly supports New York agriculture. Featuring hops from Chimney Bluffs Hoppery in Wolcott, and Ledyard Farms in King Ferry. Local malts sourced from NYS Empire Malt in Champlain and 1886 Malt House in Fulton.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Ithaca/Brew-York.png', abv: '5.25%', brewery: 'Ithaca Beer Company', type: 'Pale Ale'
}),
Beer.create({ name: 'Super Stout',  description: 'This coffee oatmeal stout is a dark and luscious companion to warm your soul on cold winter nights. The smooth chocolatey character of roasted malts and full bodied herbal taste of coffee beans blend to make a bold and flavorful pint.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Ithaca/Super-Stout.png', abv: '5.2%', brewery: 'Ithaca Beer Company', type: 'Stout'
}),
Beer.create({ name: 'Petal Pusher',  description: 'Our delightful mid-summer seasonal, Petal Pusher is an easy drinking and refreshing IPA. With a mild ABV of 4.25%, this IPA is wonderfully “sessionable” for the hot summer months. Simcoe and Chinook hops bring in fresh west coast pine and grapefruit, while Mosaic and Citra add layer of pineapple, orange, passionfruit & papaya.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Ithaca/Petal-Pusher.png', abv: '4.25%', brewery: 'Ithaca Beer Company', type: 'Session IPA'
}),
Beer.create({ name: 'Eagle IPA',  description: 'Our Eagle IPA pours nice and light in color, with initial flavors of subtle malt, with hints of toast coupled with a mild sweetness. Sticking true to the American IPA style, this beer has a wonderful hop aroma and flavor. Expect rich flavors of citrus that blends into a nice mild bitterness.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Roscoe/Eagle.png', abv: '6.2%', brewery: 'Roscoe Beer Company', type: 'IPA'
}),
Beer.create({ name: 'American Amber Ale',  description: 'Our Trout Town American Amber Ale pours a beautiful light copper amber color with a nice white foamy head. This beer has a light body that is full of nice toasted notes and a subtle citrus hop finish that is not overly bitter.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Roscoe/American-Amber.png', abv: '5.0%', brewery: 'Roscoe Beer Company', type: 'Amber Ale'
}),
Beer.create({ name: 'Whitetail Pale Ale',  description: 'Our Tail ale is a very light pale ale that has very light toasted flavors and an ever so gentle hop finish. This beer is session-able coming in at 4.8%',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Roscoe/Whitetail-pale-ale.png', abv: '4.8%', brewery: 'Roscoe Beer Company', type: 'Amber Ale'
}),
Beer.create({ name: 'Roscoe Brown Ale',  description: 'Our Trout Town Brown Ale is a robust brown ale with rich chocolate and pronounced coffee flavors that pull through in the very end. This beer is dark in color but light in body, with just enough bitterness to balance out the beer.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Roscoe/Brown.png', abv: '5.5%', brewery: 'Roscoe Beer Company', type: 'Amber Ale'
}),
Beer.create({ name: 'Old Brown Dog Ale',  description: 'Old Ale (also known as “Stock” Ale), is a full-bodied beer with high levels of dextrins. In times past, this beer was typically laid up to mature, hence the name. The color varies from rich, dark amber to a very dark brown. This style features fruity, vinuous & deep, malty flavors, giving it an almost port-like qualities. Sight acidity is not uncommon.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Smuttynose/Old-Brown.png', abv: '11.1%', brewery: 'Smuttynose Brewing Company', type: 'Brown Ale'
}),
Beer.create({ name: 'Vunderbar! Pilsner',  description: 'Take a break from the Sturm und Drang of modern life, with this elegant, refreshing pilsner. Our brewers created Vunderbar! with both feet grounded in tradition, focusing on authentic German pilsner malt and spicy Czech Saaz hops. The result just might get you to shimmy into your favorite lederhosen, bust into a quick schuhplattler and loudly proclaim, “Das ist Vunderbar!” ',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Smuttynose/Vunderbar.png', abv: '4.9%', brewery: 'Smuttynose Brewing Company', type: 'Pilsner'
}),
Beer.create({ name: 'Finest Kind IPA',  description: 'The citrusy hop flavor coming from a mixture of Simcoe and Santiams is pleasantly balanced by a smooth bitterness from Amarillo hops. The beer itself is light bodied and crisp with a golden color that will throw a slight haze, as we bottle it unfiltered. At 73.5 IBU’s, this is definitely not a training-wheels IPA, but is meant for hop lovers looking to satisfy their craving in a way that’s not easy to find. We think they’ll be quite pleased.  Finestkind is dry-hopped in the fermenter to maximize its hop profile for your enjoyment.” ',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Smuttynose/Finest-Kind.png', abv: '6.9%', brewery: 'Smuttynose Brewing Company', type: 'IPA'
}),
Beer.create({ name: 'Shoals Pale Ale',  description: 'Our first beer, Shoals Pale Ale debuted on July 16, 1994 on Portsmouth’s historic waterfront. Our interpretation of a classic English ale is copper-colored, medium-bodied and pleasantly hopped. Its flavor is delightfully complex yet balanced: tangy fruit at the start, with an assertive hop crispness and a long malty finish that one well-known beer writer has compared to the flavor of freshly-baked bread.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Smuttynose/Shoals.png', abv: '6.9%', brewery: 'Smuttynose Brewing Company', type: 'Pale Ale'
}),
Beer.create({ name: 'Robust Porter',  description: 'It’s a good bet that when Dickens’ Mr. Pickwick sat down for a pint, his beer would have been very similar to our Robust Porter. This smooth, deceptively drinkable beer features an assertive hop profile which accentuates signature flavors of coffee and dark chocolate.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Smuttynose/Robust-Porter.png', abv: '6.2%', brewery: 'Smuttynose Brewing Company', type: 'Stout'
}),
Beer.create({ name: 'Stone IPA',  description: 'By definition, an India pale ale is hoppier and higher in alcohol than its little brother, pale ale—and we deliver in spades. One of the most well-respected and best-selling IPAs in the country, this golden beauty explodes with tropical, citrusy, piney hop flavors and aromas, all perfectly balanced by a subtle malt character. This crisp, extra hoppy brew is hugely refreshing on a hot day, but will always deliver no matter when you choose to drink it.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Stone/Stone-IPA.jpeg', abv: '6.9%', brewery: 'Stone Brewing Company', type: 'IPA'
}),
Beer.create({ name: 'Stone Delicious IPA',  description: 'While our beers are many and diverse, yet unified by overarching boldness, India pale ales are our undeniable bread and butter. The result is an intensely citrusy, beautifully bitter beer is worthy of the simple-yet-lordly title of Stone Delicious IPA. Lemondrop and El Dorado hops combine to bring on a magnificent lemon candy-like flavor that’s balanced by hop spice. It’s unlike anything we’ve tasted in nearly two decades of IPA experimentation, and another lupulin-laced creation we’re excited to present to hopheads everywhere.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Stone/Delicious-IPA.png', abv: '7.7%', brewery: 'Stone Brewing Company', type: 'IPA'
}),
Beer.create({ name: 'Tangerine IPA',  description: 'This ain’t no just-add-juice approach. This one is for adults. We use bountiful whole tangerine purée, which brings pithy, crisp bitterness to the citrus flavor. In addition to the complexities of the tangerine — the likes of which you can only get by using the whole fruit — we judiciously employ just a hint of whole pineapple for a backnote (you’d likely not even pick it out of the mix if we didn’t tell you it was there). We’re not looking for a sweet concoction to appease the “I want my beer to taste like fruit juice” crowd. This is Stone. We like our IPAs to taste like IPAs. Big, bold and not for kids.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Stone/Tangerine-Express.png', abv: '6.7%', brewery: 'Stone Brewing Company', type: 'IPA'
}),
Beer.create({ name: 'Save the Robots',  description: 'The party\'s just getting started for East Coast IPAs and we\'re keeping things moving with a fresh take on the style. This hazy, unfiltered gem has juicy, tropical, citrus flavors that span the multiverse of hop varieties. A big IPA that drinks easy whether you\'re a human or a disco-breaking, beer-swilling robot.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Radiant-Pig/Save-The-Robots.png', abv: '7.0%', brewery: 'Radiant Pig Craft Beers', type: 'IPA'
}),
Beer.create({ name: 'Junior IPA',  description: 'So what exactly is a Junior IPA? It\'s the best parts of an IPA made a little easier on the ol\' palate. We scaled back the bitterness and alcohol content but still packed in plenty of citrusy, floral, hoppy goodness. A touch of specialty malts to keep things interesting but the hops still run the show.',
price: 3.00, availability: 'available', imageUrl: baseUrl + '/companyBeers/Radiant-Pig/Junior.png', abv: '4.8%', brewery: 'Radiant Pig Craft Beers', type: 'Session IPA'
}),


    ])
    ;


    // ('IPA', 'Imperial IPA', 'Session IPA', 'Lager', 'Stout', 'Pale Ale', 'White Ale', 'Sour'
    //     'Amber Ale', 'Golden Ale', 'Brown Ale', 'Pilsner',
    //     'Saison', 'Wheat', 'Tripel')


    const beerReviewAssociations = []
    for (let beer of beers){
      for (let i = 0; i < maxReviews; i++){
        const randomUser = users[chance.integer({min: 0, max: users.length - 1})]
        const newReview = await Review.create(generateReview())
        beerReviewAssociations.push(randomUser.addReviews(newReview))
        beerReviewAssociations.push(beer.addReviews(newReview))
      }
    }

    await Promise.all(beerReviewAssociations)
    console.log(`Made ${beerReviewAssociations.length} associations for beer reviews`)
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
