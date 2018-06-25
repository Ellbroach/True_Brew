'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {BeerItem} from '../'

class BeerList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            beers: BeerList.filterBeers(props)
        }
        this.renderWithBeers = this.renderWithBeers.bind(this)
    }

    static filterBeers(props){
        // if(!props.genreName) return props.beers
        const genreName = props.genreName.toLowerCase()

        return props.beers
            .filter(beer => beer.genres
                .find(genre => 
                    genre.name.toLowerCase() === genreName))
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({beers: BeerList.filterBeers(props)})
    }

    render(){
        return (
            <div>
                <div>
                    <h1>All Baskets</h1>
                    {
                        this.props.isAdmin !== 'admin' ?
                        null : (
                        <Link to="/beers/admin/create">
                            <button>Add Basket</button>
                        </Link>
                        )
                    }
                </div>
                {
                    this.state.beers[0] === undefined ?
                    <p>There are no Beers registered in the database.</p> :
                    this.renderWithBeers()
                }
            </div>
        )
    }

    renderWithBeers(){
        const beers = this.state.beers
        return (
            <div>
                {
                    beers.map(beer => (
                        <BeerItem
                            beer={beer}
                            key={beer.id}
                            showDeleteButton={true}
                        />
                    ))
                }
            </div>
        )
    }
}


const mapState = ({ beers, user }) => {
    return {
        beers,
        isAdmin: !user ? null : user.role
    }
}

export default connect(mapState)(BeerList)
