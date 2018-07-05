import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import store, { fetchBrewery, createItem } from '../../store'
import PopupBody from './popUp';


class SingleBrewery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addedToCartMsgClss: '',
    }
    this.sendToCart = this.sendToCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchBrewery()
  }

  async sendToCart(beerId) {
    this.setState({beerId: beerId})
    await store.dispatch(
      createItem({beerId: beerId, quantity: this.state.quantity})
    )
  }

  render() {
    const {brewery, beers} = this.props
    const foundBeers =
      beers === undefined
        ? null
        : beers.filter(findBeers => findBeers.brewery === brewery.name)
        console.log(brewery)
    return (
      <div>
        {brewery.beers ? (
          <div className="single-brewery">
            <h1>{`${brewery.name}`}</h1>
            <div className="single-brew-details">
              <div className="single-brew-description">
                <h2>{`${brewery.description}`}</h2>
              </div>
              <div className="single-brew-image">
                <img src={brewery.ownerImage} />
                <h2>{brewery.owner}</h2>
              </div>
            </div>
            <div className="beer-image-container">
              {foundBeers === undefined
                ? null
                : foundBeers.map(beer => (
                  <div key={beer.imageUrl} className="beer-image">
                      <img src={beer.imageUrl} />
                      <h2>{beer.name}</h2>
                      <PopupBody beer={beer} />
                      <Link to={`/beers/${beer.id}`}>
                      <div className='popup-body'>
                      <button>Place an Order</button>
                      </div>
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        ) : (
          <div>Loading....</div>
        )}
      </div>
    )
  }
}

const mapState = ({ user, brewery, beers }) => {
    return {
        brewery,
        beers,
        isAdmin: !user ? null : user.role,
    }
}

const mapDispatch = (dispatch, ownProps) => {
    const paramId = ownProps.match.params.breweryId
    return {
        fetchBrewery: () => dispatch(fetchBrewery(paramId))
    }
}

export default connect(mapState, mapDispatch)(SingleBrewery)