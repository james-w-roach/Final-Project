import React from 'react';
import LocationMap from './locationMap';
import ViewPOI from './viewPOI';

export default class ViewLocation extends React.Component {
  render() {
    if (!this.props.location) return null;
    return (
     <div className="location-page">
        <div className="trip-list-item center">
          <a onClick={() => history.back()}><i className="fas fa-arrow-left location back-arrow"></i></a>
          <h2>{this.props.location.name.split(',')[0]} </h2>
        </div>
        <LocationMap location={this.props.location} />
        <div className="trip-list-item center">
          <h2>Points of Interest</h2>
        </div>
        <ViewPOI />
        <button className="button add">Add Points of Interest +</button>
      </div>
    );
  }
}
