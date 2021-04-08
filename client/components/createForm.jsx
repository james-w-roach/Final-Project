import React from 'react';
import AppContext from '../../server/app-context';
import Mapbox from './map';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.value;
    this.setState({
      tripName: name
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { toggleCreate } = this.context;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/planner/itineraries', req)
      .then(res => res.json());
    toggleCreate();
  }

  render() {
    return (
      <div className="main">
        <Mapbox />
        <form onSubmit={this.handleSubmit}>
          <input className="name" type="text" name="trip-name" placeholder="New Itinerary" onChange={this.handleChange}/>
          <input className="finish button" type="submit" value="Finish Itinerary"/>
        </form>
      </div>
    );
  }
}

CreateForm.contextType = AppContext;
