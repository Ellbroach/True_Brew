import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import BreweryItem from './breweryItem';
import BeerItem from './beerItem'


class AllBreweries extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showBreweries: true,
            beerFilter: 'All',
            wasFiltered: false,
            beers: this.props.beers
        }
        this.beerFilter = this.beerFilter.bind(this)
        this.showBeers = this.showBeers.bind(this)
    }


    renderItem(){
        let {breweries, beers} = this.props
        let answers = []
        for(let i =0; i< beers.length; i++){
            if(beers[i].type === this.state.beerFilter){
                answers.push(beers[i])
            }
        }

        return (
        this.state.showBreweries ? 
        breweries.map(brewery => 
            <BreweryItem
            brewery={brewery}
            key={brewery.id}
            showDeleteButton = {true}
            />
        )
            :
            this.showBeers(answers)
        )
    }

    showBeers(filtered){
        let {beers} = this.props
        if(this.state.wasFiltered === false || this.state.beerFilter === 'All'){
            return beers.map(beer => 
                <BeerItem
                beer={beer}
                key={beer.id}
                showDeleteButton = {true}
                />
            )
        }
        else{
            return filtered.map(beer => 
                <BeerItem
                beer={beer}
                key={beer.id}
                showDeleteButton = {true}
                />
            )
        }
    }
    
    async UNSAFE_componentWillReceiveProps(){
        await this.setState({
            beers: this.props.beers
        })

        await console.log('BLAH: ', this.state.beers)
    }

    toggleDisplay(){
        this.setState({showBreweries: !this.state.showBreweries})
    }

    beerFilter(event){
        this.setState({
            beerFilter: event.target.value,
            wasFiltered: true
        })
    }

    render(){
        const {beers} = this.props
        return(
            <div>
           <div className="intro-background">
           <div className="intro-text">
           <h1>Welcome to True Brew</h1>
           <h2>Too often, large companies acquire and commercialize the craft beer process that we hold dear.  Here at True Brew, we are dedicated to honoring the spirit of craft beer by identifying breweries that are still owned and operated by their founder or by their employees, whose first and only priority is good quality beer.</h2>
           </div>
           </div>
           <div className='toggle-brew'>
           {
               this.state.showBreweries ?
               <div className='show-brew'>
               <h1>All Breweries</h1>
               <button
               type='submit'
               onClick={this.toggleDisplay.bind(this)}>
                   Show Beers
               </button> 
               </div>
               :
               <div className='show-brew'>
               <h1>All Beers</h1>
            <button
               type='submit'
               onClick={this.toggleDisplay.bind(this)}>
                   Show Breweries
               </button>
               <h2>Filter Beers by Style:</h2>
               <select
               onChange = {this.beerFilter}>
                   <option value='All'>All</option>
                   <option value='IPA'>IPA</option>
                   <option value='Session IPA'>Session IPA</option>
                   <option value='Imperial IPA'>Imperial IPA</option>
                   <option value='Stout'>Stout</option>
                   <option value='Lager'>Lager</option>
                   <option value='Pale Ale'>Pale Ale</option>
                   <option value='White Ale'>White Ale</option>
                   <option value='Sour'>Sour</option>
                   <option value='Amber Ale'>Amber Ale</option>
                   <option value='Golden Ale'>Golden Ale</option>
                   <option value='Brown Ale'>Brown Ale</option>
                   <option value='Pilsner'>Pilsner</option>
                   <option value='Saison'>Saison</option>
                   <option value='Wheat'>Wheat</option>
                   <option value='Tripel'>Tripel</option>
               </select>
               </div>
           }
           </div>
           <div className='all-breweries'>
              {
                 this.props.breweries === undefined ? <div>
                     Loading...
                 </div> : 
                 this.renderItem()
              }
           </div>
           </div>
        )
    }
}

const mapState =( {breweries, beers} ) => {
   return {
      breweries,
      beers
   }
}



    // ('IPA', 'Imperial IPA', 'Session IPA', 'Lager', 'Stout', 'Pale Ale', 'White Ale', 'Sour'
    //     'Amber Ale', 'Golden Ale', 'Brown Ale', 'Pilsner',
    //     'Saison', 'Wheat', 'Tripel')

export default connect(mapState)(AllBreweries)