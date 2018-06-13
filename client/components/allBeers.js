import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import BeerItem from './beerItem';


class AllBeers extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            beers: props.beers
        }
    }
    render(){
        return(
           <div>
              {
                 this.props.beers === undefined ? <div>
                     Loading...
                 </div> : 
                 this.props.beers.map(beer => 
                <BeerItem
                beer={beer}
                key={beer.id}
                showDeleteButton = {true}
                />
            )
              }
           </div>
        )
    }
}

const mapState =( {beers} ) => {
   return {
      beers
   }
}

export default connect(mapState)(AllBeers)