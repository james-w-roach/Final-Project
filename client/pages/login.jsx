import React from 'react';
import Header from '../components/header';
import NavBar from '../components/navbar';

export default class Login extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="page">
          <div className="page-container">
          </div>
          <NavBar />
        </div>
      </>
    );
  }
}
