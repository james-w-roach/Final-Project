import React from 'react';

export default class ViewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.logTrip = this.logTrip.bind(this);
  }

  logTrip() {
    console.log(this.props.tripName);
    console.log(this.props.locations);
  }

  render() {
    this.logTrip();
    return <h1>Hello World!</h1>;
  }
}
