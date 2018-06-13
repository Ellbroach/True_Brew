'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {addBeer} from '../store'

class CreateBeer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        const availability = [
            'pending',
            'available',
            'out of stock'
        ]
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <h3>
                        Beer Name
                        <input
                            onChange={event =>
                                this.setState({ name: event.target.value })
                            }
                            name="name"
                            required
                            placeholder="Beer Name"
                        />
                    </h3>
                    <h3>
                        Beer Image
                        <input
                            onChange={event =>
                                this.setState({ imageUrl: event.target.value })
                            }
                            name="imageUrl"
                            placeholder="Beer imageUrl"
                            required
                        />
                    </h3>
                </form>
            </div>
        )
    }

    handleSubmit(event){
        event.preventDefault()
        const { addBeer } = this.props
        addBeer(this.state)
    }
}

const mapState = ({ beers }) => ({ beers })

const mapDispatch = (dispatch) => ({
    addBeer: (beer) =>
        dispatch(addBeer(beer)
    )
})

export default connect(mapState, mapDispatch)(CreateBeer)