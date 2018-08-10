import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import withAuthentication from '../hoc/withAuthentication';

import 'milligram';
import './App.css';
import '../utils/fontawesome';

import Navigation from './Navigation';
import LandingPage from './pages/Landing';
import SignInPage from './pages/SignIn';
import PasswordForgetPage from './pages/PasswordForget';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import CreatePage from './pages/RecipeCreate';
import ViewPage from './pages/RecipeView';
import EditPage from './pages/RecipeEdit';

import * as routes from '../_constants/routes';

const App = () =>
  <Router>
    <div id="app">
      <Navigation />
      <section className="container">
        <Route exact path={routes.LANDING} component={() => <LandingPage />} />
        <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
        <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
        <Route exact path={routes.HOME} component={() => <HomePage />} />
        <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
        <Route exact path={routes.CREATE} component={() => <CreatePage />} />
        <Route exact path={routes.VIEW} component={({match}) => <ViewPage id={match.params.id} />} />
        <Route exact path={routes.EDIT} component={() => <EditPage />} />
      </section>
    </div>
  </Router>

export default withAuthentication(App);
