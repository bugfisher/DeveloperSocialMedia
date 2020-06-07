import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import {logout} from '../../actions/auth';


const Navbar = ({auth,logout}) => {
    
  const guestlinks = (

    <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  );


  const authlinks = (

    <ul>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/profiles">Developers</Link></li>
        <li>
          <Link to="/dashboard">
          <i className="fas fa-user"></i>{' '}
          <span className='hide-sm'>Dashboard</span>
          </Link>
          </li>

        <li><a onClick={logout}  href="#!" >
        <i className="fas fa-sign-out-alt"></i>{'  '}
        <span className='hide-sm'>Logout</span></a>
        </li>
        
      </ul>

  );
  
  
  
  
  return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {
        !auth.loading && (<Fragment>
          {
            auth.isAuthenticated ? authlinks : guestlinks
          }
        </Fragment>)
      }
    </nav>
    )
}

const mapStatetoProps = state=>({
  auth:state.auth
});

Navbar.propTypes = {
  auth:PropTypes.object.isRequired,
  logout:PropTypes.func.isRequired
}

export default connect(mapStatetoProps,{logout})(Navbar)

