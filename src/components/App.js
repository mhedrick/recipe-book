import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import withAuthentication from './withAuthentication';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import CreatePage from './Create';
import ViewPage from './View';
import EditPage from './Edit';

import * as routes from '../_constants/routes';

const App = () =>
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.CREATE} component={() => <CreatePage />} />
      <Route exact path={routes.VIEW} component={({match}) => <ViewPage id={match.params.id} />} />
      <Route exact path={routes.EDIT} component={() => <EditPage />} />
    </div>
  </Router>

export default withAuthentication(App);
