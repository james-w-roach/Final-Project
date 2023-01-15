import React from 'react';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isDeleting: false,
      name: ''
    }
  }

  setDeleteClass(name) {
    if (this.state.isDeleting && name === this.state.name) {
      return 'delete-module delete-location';
    } else {
      return 'hidden';
    }
  }

  render() {
    let editIcon =
      <button className="edit-button edit-locations" onClick={() => this.setState({ isEditing: true })}>
        <i className="fas fa-pen"></i>
      </button>;
    if (this.state.isEditing) {
      editIcon = <button className="edit-button edit-locations" onClick={() => this.setState({ isEditing: false, isDeleting: false })}>
        <i className="fas fa-times x-icon"></i>
      </button>;
    }

    const finishClass = this.props.showFinish
      ? 'finish button'
      : 'hidden';
    const locations = this.props.locations[0]
     ? this.props.locations.map(location => {
      const name = location.name.includes(',')
        ? location.name.split(',')[0]
        : location.name;
      let listIcon;
      if (this.state.isEditing) {
        listIcon =
          <button className="delete button delete-itinerary" style={{ top: '15%', height: '70%', right: '10px' }} onClick={() => this.setState({ isDeleting: true, name: location.name })}>
            <i className="fas fa-trash"></i>
          </button>;
      }
      return (
        <li className="trip-list-item" key={location.name}>
          <div className='list-item'>
            <div className="list-item-content">
              {name}
            </div>
          </div>
          {listIcon}
          <div className={this.setDeleteClass(location.name)} id={location.name}>
            <button className='delete-poi button' style={{ margin: '0', width: 'calc(50% - 5px)' }} onClick={() => {
              this.props.deleteLocation(location.name);
              this.setState({ isDeleting: false });
            }}>Delete</button>
            <button className='cancel button' style={{ margin: '0', width: 'calc(50% - 5px)' }} onClick={() => this.setState({ isDeleting: false })}>Cancel</button>
          </div>
        </li>
       );
     })
      : <li className = "trip-list-item">
        <div className='list-item'>
          <div className="list-item-content">
            No locations added yet.
          </div>
        </div>
      </li>;
    return (
      <div className="map-form">
        <h2 className='create-form-header'>New Itinerary</h2>
        <form onSubmit={() => this.props.handleSubmit()} autoComplete="off" className='itinerary-form'>
          <label className='create-form-label' htmlFor='trip-name'>Itinerary Name</label>
          <input className="create-form-name" required="required" type="text" maxLength='20' name="trip-name" placeholder="Give your trip a name." onChange={event => this.props.updateTripName(event)} />
          <input className={finishClass} type="submit" value="Finish Itinerary" />
        </form>
        <h3 className='create-form-subheader add-locations'>Add Locations</h3>
        <div className='locations-subheader-container'>
          <h3 className='create-form-subheader'>Locations</h3>
          {editIcon}
        </div>
        <ul className="trip-list create-list">{locations}</ul>
      </div>
    );
  }
}
