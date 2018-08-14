import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import PasswordForgetForm from '../forms/PasswordForget';
import PasswordChangeForm from '../forms/PasswordChange';
import withAuthorization from '../../hoc/withAuthorization';

export const AccountPage = ({ authUser }) =>
  <div>
    <h2>{authUser.email}</h2>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);