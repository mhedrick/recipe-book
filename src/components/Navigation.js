import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as routes from '../_constants/routes';


import { auth } from '../firebase';

export const Navigation = ({ authUser }) =>
  <nav className="navigation">
    <div className="container">
      { authUser
          ? <NavigationAuth />
          : <NavigationNonAuth />
      }
      </div>
  </nav>

export const NavigationAuth = () =>
<Fragment>
  <ul className="navigation-list">
    <li className="navigation-item"><Link to={routes.LANDING} className="navigation-link">Home</Link></li>
    <li className="navigation-item"><Link to={routes.HOME} className="navigation-link">Recipes</Link></li>
    <li className="navigation-item"><Link to={routes.ACCOUNT} className="navigation-link">Account</Link></li>
  </ul>
  <ul className="navigation-list float-right">
    <li className="navigation-item"><a className="navigation-link" onClick={auth.doSignOut}>Sign Out</a></li>
  </ul>
</Fragment>

export const NavigationNonAuth = () =>
<Fragment>
  <ul className="navigation-list">
    <li className="navigation-item"><Link to={routes.LANDING} className="navigation-link">Home</Link></li>
  </ul>
  <ul className="navigation-list float-right">
    <li className="navigation-item"><Link to={routes.SIGN_IN} className="navigation-link">Sign In</Link></li>
  </ul>
</Fragment>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);