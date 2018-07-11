import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
  <div className="navbar">
  <div className="logo">
  <Link to="/">
    <img src='http://127.0.0.1:8080/websiteImages/True-brew-logo.png'/>
    </Link>
    </div>
    <ul className='other-info'>
    <Link to='/about'>
    <li><h1>ABOUT</h1></li>
    </Link>
    <Link to='/resources'>
    <li><h1>RESOURCES</h1></li>
    </Link>
    <Link to='/good-causes'>
    <li><h1>GOOD CAUSES</h1></li>
    </Link>
    </ul>
    <div className='login'>
    <nav>
      {isLoggedIn ? (
        <div className='cart-logout'>
        <Link to='/checkout'>
          <img src='http://127.0.0.1:8080/websiteImages/Cart.png'/>
        </Link>
          <a href="#" onClick={handleClick} className='logout'>
            Logout
          </a>
        </div>
      ) : (
        <div className='login-container'>
          <Link  to="/login">
        <div className='login-box'>
          <h3>Login</h3>
        </div>
        </Link>
        <Link to="/signup">
          <div className='login-box'>
          <h3>Sign Up</h3>
          </div>
          </Link>
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
