'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {BeerItem} from '../'
import {fetchBeer} from '../../store'


class BeerReview extends React.Component {
    componentDidMount(){
        this.props.fetchBeer()
    }

    render(){
        const beer = this.props.beer
        return (
            <div>
                {
                    !beer.reviews ?
                    null : (
                    <div>
                        <div>
                            <BeerItem beer={beer} />
                            <p>$ {beer.price} + tax</p>
                            <div>
                                {
                                    beer.reviews
                                        .reduce((accu, curr, index, array) =>
                                            (accu + (curr.rating / array.length)), 0)
                                        .toFixed(1)
                                }
                            </div>
                            <div>Total {beer.reviews.length} customer reviews</div>
                        </div>
                        <ul>
                            {
                                beer.reviews
                                    .sort((pre, next) => next.id - pre.id)
                                    .map(review => (
                                            <li key={review.id}>
                                                <div>
                                                    <div>{review.rating}</div>
                                                    <h4>{review.title}</h4>
                                                </div>
                                                <div>{Date(review.createdAt)}</div>
                                                <div>Verified Purchase</div>
                                                <p>{review.content}</p>
                                            </li>
                                        )
                                    )
                            }
                        </ul>
                    </div>
                    )
                }
            </div>
        )
    }
}

const mapState = ({ beer }) => ({ beer })

const mapDispatch = (dispatch, ownProps) => {
    const paramId = ownProps.match.params.beerId
    return {
        fetchBeer: () => dispatch(fetchBeer(paramId))
    }
}

export default connect(mapState, mapDispatch)(BeerReview)
