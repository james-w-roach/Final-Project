import React from 'react';
import AppContext from '../../server/app-context';

export default class CreateButton extends React.Component {
  render() {
    return (
      <div className="main">
        <a className="create button" href={'#create'}>
          Create New Itinerary +
        </a>
      </div>
    );
  }
}

CreateButton.contextType = AppContext;
