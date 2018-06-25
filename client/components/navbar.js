import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
  <div className="navbar">
  <Link to="/">
  <div className="logo">
    <img src='http://127.0.0.1:8080/websiteImages/True-brew-logo.png'/>
    </div>
    </Link>
    <div className='login'>
    <nav>
      {isLoggedIn ? (
        <div className='cart-logout'>
        <Link to='/checkout'>
          <img src='http://127.0.0.1:8080/websiteImages/Cart.png'/>
        </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
        <div className='login-box'>
          <Link  to="/login">Login</Link>
        </div>
          <div className='signup-box'>
          <Link className= "SignUp" to="/signup">Sign Up</Link>
          </div>
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
