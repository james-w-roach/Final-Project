import React from 'react';
import CreateForm from '../components/createForm';

export default class Create extends React.Component {
  render() {
    return (
      <>
        <div className="page">
          <div className="page-container">
            <CreateForm updateItineraries={this.props.updateItineraries} switchItinerary={this.props.switchItinerary} userId={this.props.userId} addGuestTrip={this.props.addGuestTrip} guestTrip={this.props.guestTrip} />
          </div>
        </div>
      </>
    );
  }
}
