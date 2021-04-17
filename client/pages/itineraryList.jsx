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
      .then(itineraries => {
        if (itineraries.length === 0) {
          this.setState({ itineraries: 'No trips added yet' });
        } else {
          this.setState({ itineraries });
        }
      });
  }

  render() {
    let list;
    if (typeof this.state.itineraries === 'string') {
      list = <div className="trip-list-item">{this.state.itineraries}</div>;
    } else {
      list = this.state.itineraries.map(itinerary => {
        return (
          <li className="trip-list-item" key={itinerary.tripId}>
            <i className="fas fa-arrow-right trip-list-arrow"></i>
            <a className="list-item" href={`#itinerary/${itinerary.tripId}`} onClick={() => history.forward()}>
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
    }
    return (
      <>
        <Header />
        <div className="main">
          <div className="name">
            <a className="back" href="" onClick={() => history.back()}><i className="fas fa-arrow-left back-arrow"></i></a>
            Itineraries
          </div>
          <ul className="trip-list">{list}</ul>
        </div>
      </>
    );
  }
}
