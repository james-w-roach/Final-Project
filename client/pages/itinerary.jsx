import React from 'react';
import ViewTrip from '../components/viewTrip';
import Header from '../components/header';

export default class Itinerary extends React.Component {
  render() {
    const tripName = this.props.tripName;
    const locations = this.props.locations;
    return (
      <>
        <Header />
        <ViewTrip tripName={tripName} locations={locations}/>
      </>
    );
  }
}
