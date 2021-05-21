import React from 'react';
import BackgroundMap from '../components/backgroundMap';
import HomeButtons from '../components/homeButtons';
import NavBar from '../components/navbar';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <BackgroundMap />
        <div className="page-container">
          <HomeButtons loggedIn={this.props.loggedIn} />
        </div>
        <NavBar />
      </>
    );
  }
}
