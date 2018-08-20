import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import PasswordForgetForm from '../forms/PasswordForget';
import PasswordChangeForm from '../forms/PasswordChange';
import withAuthorization from '../../hoc/withAuthorization';

export class AccountPage extends Component {
  state = {
    healthy: false
  }
  componentDidMount() {
    const { authUser } = this.props;
    authUser.getIdToken().then((idToken) => {
      return fetch('/api/health', {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": `bearer ${idToken}`
        }
      })
        .then(response => response.json())
        .then(json => this.setState({ healthy: true }));
    }).catch(console.log);
  }

  render() {
    const { authUser } = this.props;
    const { healthy } = this.state;
    return (<div>
      <h2>{authUser.email}</h2>
      <p>The API is currently {healthy ? 'healthy' : 'not connecting properly'}</p>
      <hr />
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>);
  }
}
const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);