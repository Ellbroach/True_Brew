import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import store, { createItem, fetchBeer } from '../../store'
// import PopupBody from './popUp';


class SingleBeer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addedToCartMsgClss: '',
      beerId: 1
    }
    this.sendToCart = this.sendToCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchBeer()
  }

  async sendToCart(beerId) {
    this.setState({beerId: beerId})
    await store.dispatch(
      createItem({beerId: beerId, quantity: this.state.quantity})
    )
  }

  render() {
    const {beer} = this.props
    return (
      <div>
        {this.props.beer === undefined ? null: (
          <div className="single-beer">
            <h1>{`${beer.name}`}</h1>
            <div className="single-brew-details">
              <div className="single-beer-image">
                <img src={beer.imageUrl} />
              </div>
              <div className="single-beer-description">
                <h2>{`${this.props.beer.description}`}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = ({ user, beer }) => {
    return {
        beer,
        isAdmin: !user ? null : user.role,
    }
}

const mapDispatch = (dispatch, ownProps) => {
    const paramId = ownProps.match.params.beerId
    return {
        fetchBeer: () => dispatch(fetchBeer(paramId))
    }
}

export default connect(mapState, mapDispatch)(SingleBeer)