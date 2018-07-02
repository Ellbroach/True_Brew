import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup, UserHome} from './components';
import {me, fetchBeers, fetchBreweries, fetchReviews} from './store';
import AllBeers from './components/Beer/allBeers';
import CreateBeer from './components/Beer/addBeer';
import CreateBrewery from './components/Brewery/addBrewery';
import allBreweries from './components/Brewery/allBreweries';
import SingleBrewery from './components/Brewery/singleBrewery';
import BeerReview from './components/Beer/beerReview'
import Cart from './components/cart'
import SingleBeer from './components/Beer/singleBeer';


class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        
        <Route className="Login" path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={allBreweries}/>
        <Route exact path="/breweries/:breweryId" component={SingleBrewery} />
        <Route path="/beers/:beerId/reviews" component={BeerReview} />
        <Route path="/beers/:beerId" component={SingleBeer}/>
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/addbeer" component={CreateBeer} />
            <Route path="/addbrewery" component={CreateBrewery}/>
            <Route path="/checkout" component={Cart}/>
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(fetchBeers())
      dispatch(fetchBreweries())
      dispatch(fetchReviews())
      dispatch(me())
    }
  }
}


export default withRouter(connect(mapState, mapDispatch)(Routes))


Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
