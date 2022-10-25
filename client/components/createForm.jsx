import React from 'react';
import Mapbox from './map';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(trip) {
    if (this.props.userId) {
      const userId = this.props.userId;
      const body = {
        trip,
        userId
      };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(body)
      };
      fetch('/api/travelPlanner/itineraries', req)
        .then(res => {
          res.json();
          window.location.hash = '#itinerary';
        });
    } else {
      trip.tripId = 1;
      this.props.addGuestTrip(trip);
    }
  }

  render() {
    return (
      <div className="main">
        <Mapbox
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
