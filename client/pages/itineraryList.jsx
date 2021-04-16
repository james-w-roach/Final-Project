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
        <li className="trip-list-item" key={itinerary.tripId}>
          <i className="fas fa-arrow-right list-arrow"></i>
          <a href={'#itinerary'}>
            <div>
              {itinerary.tripName}
            </div>
            <div className="locations">
              {itinerary.locations.length} locations
            </div>
          </a>
        </li>
      );
    });
    return (
      <>
        <Header />
        <div className="main">
          <div className="name">
            <a href=""><i className="fas fa-arrow-left back-arrow"></i></a>
            Itineraries
          </div>
          <ul>{list}</ul>
        </div>
      </>
    );
  }
}
