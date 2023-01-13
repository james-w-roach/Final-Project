import React from 'react';

export default class CreateForm extends React.Component {

  render() {
    const finishClass = this.props.showFinish
      ? 'finish button'
      : 'hidden';
    return (
      <div className="map-form">
        <h2 className='create-form-header'>New Itinerary</h2>
        <form onSubmit={() => this.props.handleSubmit()} autoComplete="off">
          <label className='create-form-label' htmlFor='trip-name'>Itinerary Name</label>
          <input className="name create-form-name" required="required" type="text" name="trip-name" placeholder="Give your trip a name." onChange={event => this.props.updateTripName(event)} />
          <input className={finishClass} type="submit" value="Finish Itinerary" />
        </form>
        <h3 className='create-form-subheader'>Add Locations</h3>
        <ul className="trip-list create-list"></ul>
      </div>
    );
  }
}
