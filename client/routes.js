import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup, UserHome} from './components';
import {me, fetchBeers, fetchBreweries} from './store';
import AllBeers from './components/Beer/allBeers';
import CreateBeer from './components/Beer/addBeer';
import CreateBrewery from './components/Brewery/addBrewery';
import allBreweries from './components/Brewery/allBreweries';
import SingleBrewery from './components/Brewery/singleBrewery';


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
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/addbeer" component={CreateBeer} />
            <Route path="/addbrewery" component={CreateBrewery}/>
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(fetchBeers())
      dispatch(fetchBreweries())
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
