import React from 'react';
import CreateForm from '../components/createForm';

export default class Create extends React.Component {
  render() {
    return (
      <>
        <div className="page">
          <div className="page-container">
            <CreateForm userId={this.props.userId} addGuestTrip={this.props.addGuestTrip} guestTrip={this.props.guestTrip} />
          </div>
        </div>
      </>
    );
  }
}
