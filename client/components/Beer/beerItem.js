import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {removeBeer} from '../../store'


class BeerItem extends React.Component {
    constructor(props){
        super(props)
        this.removeBeerCallback = this.removeBeerCallback.bind(this)
    }
    removeBeerCallback(event){
        event.preventDefault()
        const {removeBeer, beer} = this.props
        removeBeer(beer.id)
    }
        render(){
            const beer = this.props.beer
            return(
                <div>
                    <Link to= {`/beers/${beer.id}`}>
                    <img src = {beer.imageUrl} />
                   <h1> {beer.name}</h1>
                   </Link>
                   <button onClick={this.removeBeerCallback} >Remove Beer</button>
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
    removeBeer: id => dispatch(removeBeer(id))
})

export default connect(mapState, mapDispatch)(BeerItem)


