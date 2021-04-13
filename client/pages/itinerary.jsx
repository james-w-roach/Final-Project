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
    if (view === 'location') {
      return <ViewTrip trip={trip} toggleView={this.toggleView} />;
    } else {
      return <ViewLocation toggleView={this.toggleView} />;
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
