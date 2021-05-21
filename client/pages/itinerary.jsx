import React from 'react';
import ViewTrip from '../components/viewTrip';
import NavBar from '../components/navbar';

export default class Itinerary extends React.Component {
  render() {
    return (
      <>
        <div className="page-container">
          <ViewTrip toggleView={this.props.toggleView} trip={this.props.trip} route={this.props.route} userId={this.props.userId} />
        </div>
        <NavBar />
      </>
    );
  }
}
