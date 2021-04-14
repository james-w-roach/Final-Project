import React from 'react';
import LocationMap from './locationMap';

export default class ViewLocation extends React.Component {
  render() {
    return (
     <>
        <div>
          <i onClick={() => this.props.toggleView()} className="fas fa-arrow-left"></i>
          <h1>{this.props.location.name}</h1>
        </div>
        <LocationMap location={this.props.location} />
        <div>
          <div className="trip-list-item">
            Points of Interest
            <i className="fas fa-arrow-right"></i>
          </div>
          <div className="trip-list-item">
            Restaurants
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </>
    );
  }
}
