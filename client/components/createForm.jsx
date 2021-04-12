import React from 'react';
import AppContext from '../../server/app-context';
import Mapbox from './map';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setClass = this.setClass.bind(this);
  }

  handleSubmit(trip) {
    const { toggleCreate } = this.context;
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
    toggleCreate();
  }

  setClass(hideFinish) {
    if (!hideFinish) {
      return 'hidden';
    }
    return 'finish button';
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

CreateForm.contextType = AppContext;
