import React from 'react';

export default class HomeButtons extends React.Component {
  render() {
    let createHref = '#create';
    if (!this.props.loggedIn) {
      createHref = '#login';
    }
    return (
      <div className="main">
        <div className="home-buttons">
          <a className="create button" href={createHref}>
            Create New Itinerary +
          </a>
        </div>
      </div>
    );
  }
}
