import React from 'react';
import ViewTrip from '../components/viewTrip';
import ViewLocation from '../components/viewLocation';
import Header from '../components/header';

export default class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView(view) {
    const trip = this.props.trip;
    if (!view) {
      return <ViewTrip trip={trip} toggleView={this.toggleView} />;
    } else if (view === 'location') {
      return <ViewLocation toggleView={this.toggleView} />;
    } else {
      <ViewTrip trip={trip} toggleView={this.toggleView} />;
    }
  }

  render() {
    return (
      <>
        <Header />
        { this.toggleView() }
      </>
    );
  }
}
