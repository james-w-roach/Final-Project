import React from 'react';
import ViewTrip from '../components/viewTrip';
import Header from '../components/header';
import NavBar from '../components/navbar';

export default class Itinerary extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ViewTrip toggleView={this.props.toggleView} trip={this.props.trip} />
        <NavBar />
      </>
    );
  }
}
