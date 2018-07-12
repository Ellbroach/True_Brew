import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store, {
  createItem,
  fetchBeer,
  fetchReviews,
  addReview
} from '../../store'

class SingleBeer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addedToCartMsgClss: '',
      quantity: 1,
      showAddReview: false,
      title: '',
      content: '',
      rating: 0,
    }
    this.sendToCart = this.sendToCart.bind(this)
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleRating = this.handleRating.bind(this)
    this.placeReview = this.placeReview.bind(this)
  }

  componentDidMount() {
    this.props.fetchBeer()
    this.props.fetchReviews()
    window.scrollTo(0, 0)
  }

  handleChangeQuantity(event) {
    this.setState({quantity: event.target.value})
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value})
  }

  handleChangeContent(event) {
    this.setState({content: event.target.value})
  }

   handleRating(event){
    const rating = event.target.id
    this.setState({rating: rating})
  }

  sendToCart() {
    store.dispatch(
      createItem({beerId: this.props.beer.id, quantity: this.state.quantity})
    )
  }

  placeReview(){
    store.dispatch(
      addReview({beerId: this.props.beer.id, title: this.state.title, content: this.state.content, rating: this.state.rating})
    )
    this.setState({showAddReview: !this.state.showAddReview})
  }

  averageReview(){
    const matchedReviews = this.props.reviews.filter(review => review.beerId === this.props.beer.id)
    let reviewCounter = 0;
    for(let i=0; i< matchedReviews.length; i++){
      reviewCounter+=matchedReviews[i].rating
    }
    let answer = (reviewCounter/matchedReviews.length).toString()
    if(answer.length > 2){
      answer = answer.slice(0,3)
    }
    return 'Average Rating: ' + answer + ' / 5'
  }

  render() {
    const {beer, reviews, breweries} = this.props
    const {isLoggedIn} = this.props
    const matchedReviews = reviews.filter(review => review.beerId === beer.id)
    const matchedBrewery = breweries.filter(brewery => brewery.name === beer.brewery)
    console.log('STATE: ', this.state)
    return (
      <div>
        {matchedBrewery[0] !== undefined ? (
          <div className="single-beer">
          <Link to= {`/breweries/${matchedBrewery[0].id}`}>
          <div className='single-beer-brewery'>
          <img src={matchedBrewery[0].imageUrl}/>
          </div>
          </Link>
            <div className="single-brew-details">
              <div className="single-beer-image">
                <img src={beer.imageUrl} />
                <div className="single-beer-checkout">
                  <input
                    onChange={this.handleChangeQuantity}
                    type="text"
                    placeholder="Quantity"
                  />
                  <button type="submit" onClick={this.sendToCart}>
                    Submit
                  </button>
                </div>
              </div>
              <div className="single-beer-description">
                <h1>{beer.name}</h1>
                <h2>{'ABV: ' + beer.abv}</h2>
                <h2>{this.averageReview()}</h2>
                <h2>{beer.description}</h2>
              </div>
            </div>
            <div className="all-reviews">
              <h1>{beer.brewery.split(' ')[0] + ' ' + beer.name} Reviews</h1>
              {isLoggedIn && (
                <div className="add-review-container">
                  <div className="add-review">
                    <button
                      type="submit"
                      onClick={() =>
                        this.setState({
                          showAddReview: !this.state.showAddReview
                        })
                      }
                    >
                      Add Review
                    </button>
                  </div>
                  {this.state.showAddReview ? (
                    <div className="review-form">
                      <div className="review-title">
                        <h2>Title: </h2>
                        <input
                          onChange={this.handleChangeTitle}
                          placeholder="Title"
                        />
                      </div>
                      <div className="review-content">
                        <h2>Content: </h2>
                        <textarea
                          onChange={this.handleChangeContent}
                          placeholder="Content"
                        />
                      </div>
                      <div className="rating-container">
                        <h2>Rating:</h2>
                        {
                          this.state.rating === 0 ? null :
                          <h2>{this.state.rating + '/5'}</h2>
                        }
                        </div>
                        <div className="rating">
                          <span id={5} onClick = {this.handleRating} title="five stars">&#9734;</span>
                          <span id={4} onClick = {this.handleRating} title="four stars">&#9734;</span>
                          <span id={3} onClick = {this.handleRating} title="three stars">&#9734;</span>
                          <span id={2} onClick = {this.handleRating} title="two stars">&#9734;</span>
                          <span id={1} onClick = {this.handleRating} title="one star">&#9734;</span>
                        </div>
                        <button onClick={this.placeReview}>Make Review</button>
                    </div>
                  ) : null}
                </div>
              )}
              {matchedReviews.map(review => (
                <div key={review.id} className="reviews">
                  <h2>{review.title }</h2>
                  <h3>{'Rating: ' + review.rating + '/5'}</h3>
                  <h3>{review.content}</h3>
                </div>
              ))}
            </div>
          </div>
        ) : null
        }
      </div>
    )
  }
}

const mapState = ({user, beer, breweries, reviews}) => {
  return {
    beer,
    reviews,
    breweries,
    isAdmin: !user ? null : user.role,
    isLoggedIn: !!user.id
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const paramId = ownProps.match.params.beerId
  return {
    fetchBeer: () => dispatch(fetchBeer(paramId)),
    fetchReviews: () => dispatch(fetchReviews()),
    addReview: () => dispatch(addReview())
  }
}

export default connect(mapState, mapDispatch)(SingleBeer)
