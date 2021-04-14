import React from 'react';

export default class ViewLocation extends React.Component {
  render() {
    return (
     <>
        <div>
          <i onClick={() => this.props.toggleView()} className="fas fa-arrow-left"></i>
          <h1>{this.props.location.name}</h1>
        </div>
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
