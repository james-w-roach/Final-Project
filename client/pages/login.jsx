import React from 'react';
import AuthModule from '../components/authModule';
import BackgroundMap from '../components/backgroundMap';

export default class Login extends React.Component {
  render() {
    return (
      <>
        <BackgroundMap />
        <div className="page">
          <div className="page-container">
            <div className="main">
              <AuthModule onSignIn={this.props.onSignIn} action={this.props.action} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
