import React from 'react';

export default class ViewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itinerary: {
        locations: []
      }
    };
  }

  componentDidMount() {
    fetch('/api/travelPlanner/itineraries')
      .then(res => res.json())
      .then(itineraries => this.setState({ itinerary: itineraries[(itineraries.length - 1)] }));
  }

  render() {
    const { itinerary } = this.state;
    const tripName = itinerary.tripName;
    const locationsList = itinerary.locations.map(location => {
      return (
        <li className="trip-list-item" key={location.name.split(',')[0]} >
          <a href={`#location?${tripName}/${location.name.split(',')[0]}`}>
            <div>
              {location.name}
              <i className="fas fa-arrow-right list-arrow"></i>
            </div>
            <div className="icons">
              {location.restaurants.length} <i className="fas fa-utensils"></i>
              {location.poi.length} <i className="fas fa-map-marker-alt"></i>
            </div>
          </a>
        </li>
      );
    });
    return (
      <>
        <div className="main">
          <div className="name">
            <i onClick={() => this.props.toggleView()} className="fas fa-arrow-left back-arrow"></i>
            <h1>{tripName}</h1>
          </div>
          <ul>{locationsList}</ul>
        </div>
      </>
    );
  }
}
