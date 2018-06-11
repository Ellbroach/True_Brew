import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import ShowItem from './showItem';


class AllShows extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            shows: props.shows
        }
    }
    render(){
        return(
           <div>
              {
                 this.props.shows === undefined ? <div>
                     Loading...
                 </div> : 
                 this.props.shows.map(show => 
                <ShowItem
                show={show}
                key={show.id}
                showDeleteButton = {true}
                />
            )
              }
           </div>
        )
    }
}

const mapState =( {shows} ) => {
   return {
      shows
   }
}

export default connect(mapState)(AllShows)