import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {removePiece} from '../store'


class PieceItem extends React.Component {
    constructor(props){
        super(props)
        this.removePieceCallback = this.removePieceCallback.bind(this)
    }
    removePieceCallback(event){
        event.preventDefault()
        const {removePiece, piece} = this.props
        removePiece(piece.id)
    }
        render(){
            const piece = this.props.piece
            return(
                <div>
                    <Link to= {`/pieces/${piece.id}`}>
                    <img src = {piece.imageUrl} />
                   <h1> {piece.name}</h1>
                   </Link>
                   <button onClick={this.removePieceCallback} >Remove Piece</button>
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
    removePiece: id => dispatch(removePiece(id))
})

export default connect(mapState, mapDispatch)(PieceItem)


