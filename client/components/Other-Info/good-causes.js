import React from 'react'
import {connect} from 'react-redux'


const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8080' : 'https://true-brew.herokuapp.com'

class Causes extends React.Component{
    constructor(props){
        super(props)
        this.state={
            causes: [{
                name: 'New Belgium Clean Energy',
                image: baseUrl + '/companyImages/NewBelgium.png',
                description: 'New Belgium has firmly committed itself toward caring for the environment through imposing an internal tax on electricity consumption.  The proceeds from this tax are then invested in local conservation efforts as well as in further reducing the company\'s carbon footprint.  New Belgium\'s mission for clean energy has gone on for two decades, beginning when employees unanimously agreed to sacrifice their bonuses to contribute to collecting wind energy.'
            },
        {
            name: 'ReGrained',
            image: baseUrl + '/websiteImages/good-causes/regrained.png',
            description: 'ReGrained rescues the nutritious grain created every time that beer is brewed, and upcycles it into delicious hops infused health bars. They currently sell Honey Almond IPA and Chocolate Coffee Stout.  Check them out at https://www.regrained.com/'
        },
        {
            name: 'The Oxford Companion to Beer',
            image: baseUrl + '/companyImages/Brooklyn.png',
            description: 'Edited by Brooklyn brewmaster Garrett Oliver, this book includes an impotant entry on climate change. It describes how the price of ingredients is “beginning to rise as the agriculture industry is affected by changing weather patterns.” It explains how climate change has already hurt the quality of many types of hops and that additional warming threatens the health of other crops needed to make beer.'
        },
        {
            name: 'Independent Craft Brewer Seal',
            image: baseUrl + '/websiteImages/good-causes/independent-craft-brewer-seal.jpeg',
            description: 'To help consumers find truly independent craft beers, the independent craft brewer seal was launched in June 2017 by the Brewers Association, publishers of CraftBeer.com. The Brewers Association (BA) is the membership organization dedicated to promoting and protecting small and independent craft brewers in the United States.'
        },
        {
            name: 'Brewers for Clean Water',
            image: baseUrl + '/companyImages/Allagash.png',
            description: 'Of course, clean water is essential to more than a great-tasting pint—it\'s also critical for our health and our economy at large. That\'s why dozens of breweries have joined NRDC\'s fight to protect the Clean Water Act. Responsible safeguards protect our product from upstream pollution and help us protect our downstream neighbors.  We are proud to say that both Allagash and the Brooklyn Brewery are supporters of this cause.  Check it out at https://www.nrdc.org/brewers-clean-water'
        }
    ]
        }
    }


    render(){
        return(
            <div className='resources'>
            <div>
                <h1>
                    Good Causes
                </h1>
                <h2>Craft breweries are not only concerned with making delicious beer, but many are invested in protecting the environment that gives them their ingrediants as well.</h2>
                {
                    this.state.causes.map(cause=>(
                        <div key={cause.name} className='cause'>
                        <img src={cause.image}/>
                        <div className='cause-description'>
                        <h2>{cause.name + ':'}</h2>
                        <h3>{cause.description}</h3>
                        </div>
                        </div>
                    ))
                }
            </div>
            </div>
        )
    }
}


const mapState =( {breweries} ) => {
    return {
       breweries
    }
 }

export default connect(mapState)(Causes)

