import React from 'react';

export default class HomeButtons extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="home-buttons">
          <a className="create button" href='#create' >
            Create New Itinerary +
          </a>
        </div>
      </div>
    );
  }
}
