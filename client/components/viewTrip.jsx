import React from 'react';

export default class ViewTrip extends React.Component {
  render() {
    const { name, locations } = this.props.trip;
    const locationsList = locations.map(location => <li key={location.split(',')[0]}>{location}</li>);
    return (
      <>
        <h1>{name}</h1>
        <ul>{locationsList}</ul>
      </>
    );
  }
}
