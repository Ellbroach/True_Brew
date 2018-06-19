import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import BreweryItem from './breweryItem';


class AllBreweries extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            breweries: props.breweries
        }
    }
    render(){
        return(
            <div>
           <div className="intro-background">
           <div className="intro-text">
           <h1>Welcome to True Brew</h1>
           <h2>Too often, large companies acquire and commercialize the craft beer process that we hold dear.  Here at True Brew, we are dedicated to honoring the spirit of craft beer, by identifying breweries that are still owned and operated by their founder or by their employees, whose first and only priority is good quality beer.</h2>
           </div>
           </div>
           {/* <img src="http://127.0.0.1:8080/websiteImages/backgroundImage.png" /> */}
           <div className='all-breweries'>
              {
                 this.props.breweries === undefined ? <div>
                     Loading...
                 </div> : 
                 this.props.breweries.map(brewery => 
                <BreweryItem
                brewery={brewery}
                key={brewery.id}
                showDeleteButton = {true}
                />
            )
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

export default connect(mapState)(AllBreweries)