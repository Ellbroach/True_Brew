import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import store, { fetchBrewery, createItem, fetchBeer } from '../../store'
import PopupBody from './popUp';


class SingleBrewery extends React.Component{
    constructor(props){
        super(props)
        this.state={
            addedToCartMsgClss: '',
            quantity: 0,
            beerId: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.fetchBrewery()
    }

    handleSubmit(event){
        this.setState({beerId: 1})
        console.log('BEERID: ', this.state.beerId)
        store.dispatch(createItem({ beerId: this.state.beerId, quantity: this.state.quantity}))
        // this.setState({addedToCartMsgClss: ':active'})
        // const hideMsg = () => this.setState({addedToCartMsgClss: ''})
        // window.setTimeout(hideMsg, 2000)
    }

    render(){
        // console.log('BEER: ', this.props.beer)
        const {brewery, beers} = this.props
        const foundBeers = beers === undefined ? null: beers.filter(findBeers => findBeers.brewery === brewery.name)
        return(
            <div>
                {
                    brewery.beers ? 
                    <div className = 'single-brewery'>
                    <h1>{`${brewery.name}`}</h1>
                    <div className='single-brew-details'>
                    <div className='single-brew-description'>
                    <h2>{`${brewery.description}`}</h2>
                    </div>
                    <div className='single-brew-image'>
                    <img src={brewery.ownerImage}/>
                    <h2>{brewery.owner}</h2>
                    </div>
                    </div>
                    <div className = 'beer-image-container'>
                    { foundBeers === undefined ? null :
                    foundBeers.map(beer => 
                    <div key= {beer.imageUrl} className='beer-image'>
                     <img src= {beer.imageUrl}/>
                     <h2>{beer.name}</h2>
                     <PopupBody
                     beer = {beer}
                     />
                     <div className='popup-body'>
                     <button type='submit' onClick={ () => this.handleSubmit()}>Add To Cart</button>
                     </div>
                    </div>
                    )
                    }
                    </div>
                    </div>
                    : (                
                    <div>Loading....</div>
                    )
                }
            </div>
        )
    }
}

const mapState = ({ user, brewery, beers }) => {
    return {
        brewery,
        beers,
        isAdmin: !user ? null : user.role,
    }
}

const mapDispatch = (dispatch, ownProps) => {
    const paramId = ownProps.match.params.breweryId
    return {
        fetchBrewery: () => dispatch(fetchBrewery(paramId)),
        fetchBeer: () => dispatch(fetchBeer(2))
    }
}

export default connect(mapState, mapDispatch)(SingleBrewery)