import React from 'react';
import ViewTrip from '../components/viewTrip';
import ViewLocation from '../components/viewLocation';
import Header from '../components/header';

export default class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  renderPage() {
    const trip = this.props.trip;
    if (this.props.view === 'location') {
      return <ViewTrip trip={trip} toggleView={this.props.toggleView} />;
    } else {
      return <ViewLocation toggleView={this.props.toggleView} location={location} />;
    }
  }

  render() {
    return (
      <>
        <Header />
        { this.renderPage() }
      </>
    );
  }
}
