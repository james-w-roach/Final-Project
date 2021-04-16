import React from 'react';
import ViewTrip from '../components/viewTrip';
import Header from '../components/header';

export default class Itinerary extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ViewTrip toggleView={this.props.toggleView} view={this.props.view} />
      </>
    );
  }
}

// <ViewTrip trip={itinerary} toggleView={this.props.toggleView} />
