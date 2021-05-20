import React from 'react';
import AuthModule from '../components/authModule';
import BackgroundMap from '../components/backgroundMap';
import Header from '../components/header';
import NavBar from '../components/navbar';

export default class Login extends React.Component {
  render() {
    return (
      <>
        <Header />
        <BackgroundMap />
        <div className="page">
          <div className="page-container">
            <div className="main">
              <AuthModule />
            </div>
          </div>
          <NavBar />
        </div>
      </>
    );
  }
}
