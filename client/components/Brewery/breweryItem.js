import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


class BreweryItem extends React.Component {
    constructor(props){
        super(props)
    }
        render(){
            const brewery = this.props.brewery
            return(
                <div className='brewery-item'>
                   <img src = {brewery.imageUrl} />
                   <div className='brewery-name'>
                   <h1>{brewery.name}</h1>
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

export default connect(mapState, mapDispatch)(BreweryItem)


