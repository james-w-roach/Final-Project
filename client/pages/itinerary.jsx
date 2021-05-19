import React from 'react';
import ViewTrip from '../components/viewTrip';
import Header from '../components/header';
import NavBar from '../components/navbar';

export default class Itinerary extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="page-container">
          <ViewTrip toggleView={this.props.toggleView} trip={this.props.trip} route={this.props.route} />
        </div>
        <NavBar />
      </>
    );
  }
}
