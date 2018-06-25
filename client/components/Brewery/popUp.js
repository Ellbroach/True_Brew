import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


class Popup extends React.Component{
    render() {
        const {beer} = this.props
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{beer.name}</h1>
            <h2>{beer.abv}</h2>
            <h3>{beer.description}</h3>
          <button onClick={this.props.closePopup}>close</button>
          </div>
        </div>
      );
    }
  }


export class PopupBody extends React.Component {
    constructor() {
      super();
      this.state = {
        showPopup: false
      };
    }
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    render() {
      return (
        <div className='popup-body'>
          <button onClick={this.togglePopup.bind(this)}>See Details</button>
          {this.state.showPopup ? 
            <Popup
              beer= {this.props.beer}
              closePopup={this.togglePopup.bind(this)}
            />
            : null
          }
        </div>
      );
    }
  };


const mapState = ({ user, beers }) => {
    return {
        beers,
        isAdmin: !user ? null : user.role,
    }
}


export default connect(mapState)(PopupBody)
  




