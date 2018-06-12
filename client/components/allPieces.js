import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import PieceItem from './pieceItem';


class AllPieces extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pieces: props.pieces
        }
    }
    render(){
        return(
           <div>
              {
                 this.props.pieces === undefined ? <div>
                     Loading...
                 </div> : 
                 this.props.pieces.map(piece => 
                <PieceItem
                piece={piece}
                key={piece.id}
                showDeleteButton = {true}
                />
            )
              }
           </div>
        )
    }
}

const mapState =( {pieces} ) => {
   return {
      pieces
   }
}

export default connect(mapState)(AllPieces)