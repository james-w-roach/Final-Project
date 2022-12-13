import React from 'react';
import ViewTrip from '../components/viewTrip';

export default class Itinerary extends React.Component {
  render() {
    return (
      <>
        <div className="page-container">
          <ViewTrip toggleView={this.props.toggleView} trip={this.props.trip} updateGuestTrip={this.props.updateGuestTrip} route={this.props.route} userId={this.props.userId} />
        </div>
      </>
    );
  }
}
