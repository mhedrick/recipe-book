import React from 'react';
import { withRouter } from 'react-router-dom';

import { PasswordForgetLink } from './PasswordForget';
import SignInForm from '../forms/SignInForm';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
  </div>

export default withRouter(SignInPage);

export {
  SignInForm,
};