import React from 'react';
import ViewLocation from '../components/viewLocation';
import Header from '../components/header';

export default class LocationPage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ViewLocation toggleView={this.toggleView} />
      </>
    );
  }
}
