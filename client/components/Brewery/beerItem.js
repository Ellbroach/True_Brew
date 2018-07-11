import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PopupBody from './popUp'


class BeerItem extends React.Component {
    constructor(props){
        super(props)
    }
        render(){
            const beer = this.props.beer
            return(
                <div className='beer-image'>
                    <Link to= {`/beers/${beer.id}`}>
                   <img src = {beer.imageUrl} />
                   </Link>
                   <div className='brewery-name'>
                   <h2>{beer.name}</h2>
                   <PopupBody beer={beer} />
                      <Link to={`/beers/${beer.id}`}>
                      <div className='popup-body'>
                      <button>See Reviews</button>
                      </div>
                      </Link>
                   </div>
                </div>
            )
        }
}

const mapState = ({ user }) => {
    return {
        user
     }
}

const mapDispatch = dispatch => ({
})

export default connect(mapState, mapDispatch)(BeerItem)