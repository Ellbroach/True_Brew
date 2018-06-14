'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {addBrewery} from '../../store'

class CreateBrewery extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            imageUrl: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(event){
        event.preventDefault()
        const { addBrewery } = this.props
        addBrewery(this.state)
    }


    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <h3>
                        Brewery Name
                        <input
                            onChange={event =>
                                this.setState({ name: event.target.value })
                            }
                            name= "name"
                            required
                            placeholder= "Brewery Name"
                        />
                    </h3>
                    <h3>
                        Description
                        <input
                            onChange={event => 
                            this.setState({description: event.target.value})
                        }
                        name= "description"
                        required
                        placeholder= "Description"
                        />
                    </h3>
                    <h3>
                        Brewery Image
                        <input
                            onChange={event =>
                                this.setState({ imageUrl: event.target.value })
                            }
                            name="imageUrl"
                            placeholder="Brewery imageUrl"
                            required
                        />
                    </h3>
                </form>
            </div>
        )
    }

}

const mapState = ({ breweries }) => ({ breweries })

const mapDispatch = (dispatch) => ({
    addBrewery: (brewery) =>
        dispatch(addBrewery(brewery)
    )
})

export default connect(mapState, mapDispatch)(CreateBrewery)