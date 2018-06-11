'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {addShow} from '../../store'

class CreateShow extends React.Component {
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
                        Show Name
                        <input
                            onChange={event =>
                                this.setState({ name: event.target.value })
                            }
                            name="name"
                            required
                            placeholder="Product Name"
                        />
                    </h3>
                    <h3>
                        Show Image
                        <input
                            onChange={event =>
                                this.setState({ imageUrl: event.target.value })
                            }
                            name="imageUrl"
                            placeholder="Product imageUrl"
                            required
                        />
                    </h3>
                </form>
            </div>
        )
    }

    handleSubmit(event){
        event.preventDefault()
        const { addProduct } = this.props
        addProduct(this.state)
    }
}

const mapState = ({ shows }) => ({ shows })

const mapDispatch = (dispatch) => ({
    addShow: (show) =>
        dispatch(addShow(show)
    )
})

export default connect(mapState, mapDispatch)(CreateShow)