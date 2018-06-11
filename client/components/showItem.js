import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {removeShow} from '../store'


class ShowItem extends React.Component {
    constructor(props){
        super(props)
        this.removeShowCallback = this.removeShowCallback.bind(this)
    }
    removeShowCallback(event){
        event.preventDefault()
        const {removeShow, show} = this.props
        removeShow(show.id)
    }
        render(){
            const show = this.props.show
            return(
                <div>
                    <Link to= {`/shows/${show.id}`}>
                    <img src = {show.imageUrl} />
                   <h1> {show.name}</h1>
                   </Link>
                   <button onClick={this.removeShowCallback} >Remove Show</button>
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
    removeShow: id => dispatch(removeShow(id))
})

export default connect(mapState, mapDispatch)(ShowItem)


