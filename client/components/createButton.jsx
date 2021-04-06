import React from 'react';

export default class CreateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isCreating: true
    });
  }

  render() {
    return (
      <div>
        <button htmlClass="create button" onClick={this.handleClick}>
          Create New Itinerary +
        </button>
      </div>
    );
  }
}
