import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import store, { fetchBrewery } from '../../store'


class SingleBrewery extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchBrewery()
    }
    render(){
        const {brewery, beers} = this.props
        const foundBeers = beers === undefined ? null: beers.filter(findBeers => findBeers.brewery === brewery.name).map(beer => beer.imageUrl)
        return(
            <div>
                {
                    brewery.beers ? 
                    <div>
                    <h1>{`${brewery.name}`}</h1>
                    <h2>{`${brewery.description}`}</h2>
                    {brewery.beers.map(beer => (
                        beer.name
                    ))}
                    <div className = 'beer-image'>
                    { foundBeers === undefined ? null :
                    foundBeers.map(url => 
                     <img key= {url} src= {url}/>
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
        fetchBrewery: () => dispatch(fetchBrewery(paramId))
    }
}

export default connect(mapState, mapDispatch)(SingleBrewery)