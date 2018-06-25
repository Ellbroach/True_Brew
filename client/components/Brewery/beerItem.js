import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


class BeerItem extends React.Component {
    constructor(props){
        super(props)
    }
        render(){
            const beer = this.props.beer
            return(
                <div className='brewery-item'>
                    <Link to= {`/beers/${beer.id}`}>
                   <img src = {beer.imageUrl} />
                   <div className='brewery-name'>
                   <h1>{beer.name}</h1>
                   </div>
                   </Link>
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