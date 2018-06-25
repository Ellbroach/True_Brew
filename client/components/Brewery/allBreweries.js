import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import BreweryItem from './breweryItem';
import BeerItem from './beerItem'


class AllBreweries extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showBreweries: true
        }
    }

    renderItem(){
        return (
        this.state.showBreweries ? 
        this.props.breweries.map(brewery => 
            <BreweryItem
            brewery={brewery}
            key={brewery.id}
            showDeleteButton = {true}
            />
        )
            :
            this.props.beers.map(beer => 
                <BeerItem
                beer={beer}
                key={beer.id}
                showDeleteButton = {true}
                />
            )
        )
    }

    toggleDisplay(){
        this.setState({showBreweries: !this.state.showBreweries})
    }

    render(){
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

export default connect(mapState)(AllBreweries)