import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
  <div className="navbar">
  <div className="intro">
    <h1>True Craft Distributors</h1>
    </div>
    <div>
    <nav>
      {isLoggedIn ? (
        <div className="login">
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="login">
          <Link  to="/login">Login</Link>
          <Link className= "SignUp" to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    </div>
    <hr />
  </div>
  <div className="navbar-bottom"></div>
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
