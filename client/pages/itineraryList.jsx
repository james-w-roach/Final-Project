import React from 'react';
import Header from '../components/header';

export default class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: []
    };
  }

  componentDidMount() {
    fetch('/api/travelPlanner/itineraries')
      .then(res => res.json())
      .then(itineraries => this.setState({ itineraries }));
  }

  render() {
    const list = this.state.itineraries.map(itinerary => {
      return (
        <li key={itinerary.tripId}>
          <div>
            {itinerary.tripName}
            <i className="fas fa-arrow-right list-arrow"></i>
          </div>
          <div className="locations">
            {itinerary.locations.length} locations
          </div>
        </li>
      );
    });
    return (
    <>
      <Header />
      {list}
    </>
    );
  }
}
