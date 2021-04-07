import React from 'react';
import AppContext from '../../server/app-context';

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
    const { tripName } = this.state;
    toggleCreate();
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="trip-name" placeholder="New Itinerary" onChange={this.handleChange}/>
          <input type="submit" value="Finish Itinerary"/>
        </form>
      </>
    );
  }
}

CreateForm.contextType = AppContext;
