import React from 'react';
import ViewTrip from '../components/viewTrip';
import Header from '../components/header';

export default class Itinerary extends React.Component {
  render() {
    const trip = this.props.trip;
    return (
      <>
        <Header />
        <ViewTrip trip={trip} toggleView={this.toggleView} />
      </>
    );
  }
}
