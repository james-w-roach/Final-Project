import React from 'react';
import ViewLocation from '../components/viewLocation';
import Header from '../components/header';

export default class LocationPage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ViewLocation location={this.props.locationView} toggleView={this.props.toggleView} />
      </>
    );
  }
}
