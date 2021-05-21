import React from 'react';

export default class ViewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itinerary: {
        locations: [],
        isEditing: null,
        isDeleting: null,
        name: null,
        max: null
      }
    };
    this.deleteLocation = this.deleteLocation.bind(this);
    this.setDeleteClass = this.setDeleteClass.bind(this);
  }

  componentDidMount() {
    let userId;
    if (localStorage.getItem('UserID')) {
      userId = localStorage.getItem('UserID');
    } else {
      userId = this.props.userId;
    }
    fetch(`/api/travelPlanner/itineraries/users/${userId}`)
      .then(res => res.json())
      .then(itineraries => {
        if (!this.props.trip) {
          let max = itineraries[0].tripId;
          let newestTrip = itineraries[0];
          for (let i = 1; i < itineraries.length; i++) {
            if (itineraries[i].tripId > max) {
              max = itineraries[i].tripId;
              newestTrip = itineraries[i];
            }
          }
          this.setState({ itinerary: newestTrip, max });
        } else {
          for (let i = 0; i < itineraries.length; i++) {
            if (itineraries[i].tripId === this.props.trip) {
              this.setState({
                itinerary: itineraries[i]
              });
            }
          }
        }
      });
  }

  setDeleteClass(name) {
    if (this.state.isDeleting && name === this.state.name) {
      return 'delete-module';
    } else {
      return 'hidden';
    }
  }

  deleteLocation(name) {
    const { itinerary } = this.state;
    for (let i = 0; i < itinerary.locations.length; i++) {
      if (itinerary.locations[i].name === name) {
        itinerary.locations.splice(i, 1);
      }
    }
    this.setState({
      itinerary
    });
    let tripId = this.props.trip;
    if (!this.props.trip) {
      tripId = this.state.max;
    }
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itinerary.locations)
    };
    fetch(`/api/travelPlanner/itineraries/${tripId}`, req)
      .then(res => res.json());
  }

  render() {
    const { itinerary } = this.state;
    const tripName = itinerary.tripName;
    let backClass;
    if (this.props.route) {
      backClass = 'back';
    } else {
      backClass = 'hidden';
    }
    let listIcon = <i className="fas fa-arrow-right trip-list-arrow"></i>;
    const locationsList = itinerary.locations.map(location => {
      if (this.state.isEditing) {
        listIcon =
          <button className="delete button delete-itinerary" onClick={() => this.setState({ isDeleting: true, name: location.name })}>
            <i className="fas fa-trash"></i>
          </button>;
      }
      return (
        <li className="trip-list-item dynamic" key={location.name.split(',')[0]} >
          <a className="list-item" href={'#location'}
            onClick={() => {
              this.props.toggleView(location, itinerary.tripId);
            }}>
            <div className="list-item-content">
              {location.name}
            </div>
            <div className="icons">
              {location.poi.length} <i className="fas fa-map-marker-alt"></i>
            </div>
          </a>
          {listIcon}
          <div className={this.setDeleteClass(location.name)} id={location.name}>
            Delete {location.name.split(',')[0]}?
            <div>
              <button className='delete-poi button' onClick={() => {
                this.deleteLocation(location.name);
                this.setState({ isDeleting: false });
              }}>Delete</button>
              <button className='cancel button' onClick={() => this.setState({ isDeleting: false })}>Cancel</button>
            </div>
          </div>
        </li>
      );
    });
    let editIcon =
      <button className="edit-button" onClick={() => this.setState({ isEditing: true })}>
        <i className="fas fa-pen"></i>
      </button>;
    if (this.state.isEditing) {
      editIcon = <button className="edit-button" onClick={() => this.setState({ isEditing: false })}>
        <i className="fas fa-times x-icon"></i>
      </button>;
    }
    return (
      <>
        <div className="main trip">
          <div className="name trip-title">
            <a className={backClass} href={'#itineraryList'} onClick={() => history.back()}><i className="fas fa-arrow-left back-arrow"></i></a>
            {tripName}
            {editIcon}
          </div>
          <ul className="trip-list">{locationsList}</ul>
        </div>
      </>
    );
  }
}
