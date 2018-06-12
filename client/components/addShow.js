'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {addPiece} from '../store'

class CreatePiece extends React.Component {
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
                        Piece Name
                        <input
                            onChange={event =>
                                this.setState({ name: event.target.value })
                            }
                            name="name"
                            required
                            placeholder="Piece Name"
                        />
                    </h3>
                    <h3>
                        Piece Image
                        <input
                            onChange={event =>
                                this.setState({ imageUrl: event.target.value })
                            }
                            name="imageUrl"
                            placeholder="Piece imageUrl"
                            required
                        />
                    </h3>
                </form>
            </div>
        )
    }

    handleSubmit(event){
        event.preventDefault()
        const { addPiece } = this.props
        addPiece(this.state)
    }
}

const mapState = ({ pieces }) => ({ pieces })

const mapDispatch = (dispatch) => ({
    addPiece: (piece) =>
        dispatch(addPiece(piece)
    )
})

export default connect(mapState, mapDispatch)(CreatePiece)