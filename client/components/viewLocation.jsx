import React from 'react';
import LocationMap from './locationMap';
import ViewPOI from './viewPOI';

export default class ViewLocation extends React.Component {

  render() {
    if (!this.props.location) return null;
    return (
      <div className="location-page">
        <div className="row">
          <div className="location-text center">
            <a onClick={() => history.back()}><i className="fas fa-arrow-left location back-arrow"></i></a>
            <h2>{this.props.location.name.split(',')[0]} </h2>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <LocationMap location={this.props.location} coordinates={this.state} />
          </div>
          <div className="column">
            <div className="location-text center">
              <h2>Points of Interest</h2>
            </div>
            <ViewPOI location={this.props.location} setCoordinates={this.setCoordinates} />
            <button className="button add-poi-large" onClick={() => this.props.changeComponent()}>Add Points of Interest +</button>
          </div>
        </div>
      </div>
    );
  }
}
