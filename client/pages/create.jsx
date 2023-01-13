import React from 'react';
import CreateForm from '../components/createForm';
import CreateMap from '../components/createMap';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = trip => {
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
        .then(res => res.json())
        .then(() => {
          this.props.updateItineraries();
          window.location.hash = '#itineraries';
        });
    } else {
      trip.tripId = 1;
      this.props.addGuestTrip(trip);
    }
  }
  render() {
    return (
      <>
        <div className="page">
          <div className="page-container">
            <div className="main create-page">
              <CreateForm
                handleSubmit={this.handleSubmit}
                updateItineraries={this.props.updateItineraries}
                switchItinerary={this.props.switchItinerary}
                userId={this.props.userId}
                addGuestTrip={this.props.addGuestTrip}
                guestTrip={this.props.guestTrip}
              />
              <CreateMap
                onSubmit={this.handleSubmit} userId={this.props.userId} guestTrip={this.props.guestTrip}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
