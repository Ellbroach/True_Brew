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
        const {brewery} = this.props
        return(
            <div>
                <h1>{`${brewery.name}`}</h1>
            </div>
        )
    }
}

const mapState = ({ user, brewery }) => {
    return {
        brewery,
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