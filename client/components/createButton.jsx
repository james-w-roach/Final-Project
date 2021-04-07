import React from 'react';
import AppContext from '../../server/app-context';

export default class CreateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false
    };
  }

  render() {
    const { toggleCreate } = this.context;
    return (
      <div>
        <button htmlClass="create button" onClick={toggleCreate}>
          Create New Itinerary +
        </button>
      </div>
    );
  }
}

CreateButton.contextType = AppContext;
