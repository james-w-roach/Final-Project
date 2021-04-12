import React from 'react';
import Mapbox from './map';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(trip) {
    const toggleCreate = this.props.toggleCreate;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(trip)
    };
    fetch('/api/travelPlanner/itineraries', req)
      .then(res => res.json());
    toggleCreate(trip);
  }

  render() {
    return (
      <div className="main">
        <Mapbox
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
