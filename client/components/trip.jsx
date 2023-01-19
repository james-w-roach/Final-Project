import React from 'react';

export default class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itinerary: {
        locations: [],
        isEditing: null,
        isDeleting: null,
        name: null,
        max: null
      },
      matches: window.matchMedia('(min-width: 900px)').matches
    };
    this.deleteLocation = this.deleteLocation.bind(this);
    this.setDeleteClass = this.setDeleteClass.bind(this);
  }

  componentDidMount() {
    window.matchMedia('(min-width: 900px)').addEventListener('change', e => {
      this.setState({ matches: e.matches });
    });
    let userId;
    if (localStorage.getItem('UserID')) {
      userId = localStorage.getItem('UserID');
    } else {
      userId = this.props.userId;
    }
    if (userId && this.props.activeItinerary) {
      this.setState({ itinerary: this.props.activeItinerary });
    } else {
      if (this.props.guestTrip) {
        this.setState({ itinerary: this.props.guestTrip });
      } else if (localStorage.getItem('Guest Trip')) {
        this.setState({ itinerary: JSON.parse(localStorage.getItem('Guest Trip')) });
      }
    }
  }

  componentWillUnmount() {
    window.matchMedia('(min-width: 900px)').removeEventListener('change', this.handler);
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
    if (this.props.userId && this.props.activeItinerary) {
      const tripId = this.props.activeItinerary.tripId;
      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itinerary.locations)
      };
      fetch(`/api/travelPlanner/itineraries/${tripId}`, req)
        .then(res => res.json())
        .then(() => {
          this.props.updateItineraries();
          if (itinerary.locations.length) {
            this.props.switchActiveLocation(itinerary.locations[0]);
          } else {
            this.props.switchActiveLocation();
          }
        });
    } else {
      if (itinerary.locations.length) {
        this.props.switchActiveLocation(itinerary.locations[0]);
      } else {
        this.props.switchActiveLocation();
      }
      this.props.updateGuestTrip(itinerary);
    }
  }

  render() {
    const { itinerary } = this.state;
    const tripName = itinerary.tripName;
    let listIcon = null;
    const locationsList = itinerary.locations.length
    ? itinerary.locations.map(location => {
      if (this.state.isEditing) {
        listIcon =
          <button className="delete button delete-itinerary" onClick={() => this.setState({ isDeleting: true, name: location.name })}>
            <i className="fas fa-trash"></i>
          </button>;
      }
      const name = location.name.includes(',')
        ? location.name.split(',')[0]
        : location.name;
      let active = this.props.activeLocation && location.name === this.props.activeLocation.name
        ? ' active-location'
        : '';
      const listItemAnchor = this.props.activeLocation && this.props.activeLocation.name === location.name && !this.state.isEditing
        ? <a className={`mobile-list-item-anchor`} href={'#location'} onClick={() => {
          this.props.toggleView(location, itinerary.tripId);
        }}>View</a>
        : null;
      return (
        <li className="trip-list-item dynamic" key={location.name}
          onClick={event => {
            if (event.target.className !== 'delete-poi button') {
              this.props.switchActiveLocation(location);
            }
          }}>
          <div className={`list-item${active}`}>
            <div className="list-item-content">
              {name}
            </div>
            <div className="icons">
              {location.poi.length} <i className="fas fa-map-marker-alt"></i>
            </div>
            {listItemAnchor}
          </div>
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
    })
    : <li className="trip-list-item dynamic">
      <div className={`list-item active-location`}>
        <div className="list-item-content">
          No locations found.
        </div>
      </div>
    </li>;

    // Users will be able to add more locations from here soon

    let editIcon;
    if (this.state.matches) {
      if (this.state.isEditing) {
        editIcon = <button className="text-button" onClick={() => this.setState({ isEditing: false, isDeleting: false })}>
          Done
        </button>;
      } else {
        editIcon = <button className="text-button" onClick={() => this.setState({ isEditing: true })}>
          Edit
        </button>;
      }
    } else {
      if (this.state.isEditing) {
        editIcon = <button className="edit-button" onClick={() => this.setState({ isEditing: false, isDeleting: false })}>
          <i className="fas fa-times x-icon"></i>
        </button>;
      } else {
        editIcon = <button className="edit-button" onClick={() => this.setState({ isEditing: true })}>
          <i className="fas fa-pen"></i>
        </button>;
      }
    }
    const headerContent = this.state.matches
      ? <div className='trip-list-header' style={{ marginBottom: '5px' }}>
          <div className='trip-list-header-row'>
            <h2 className="trip-list-h2" style={{ height: '35px' }}>{tripName}</h2>
          </div>
          <div className='trip-list-header-row header-button-row'>
            <button className='text-button' onClick={() => {
              this.props.switchView();
              this.props.switchActiveLocation();
            }}>Back</button>
            {editIcon}
          </div>
        </div>
      : <div className='trip-list-header trip-header'>
          <a className='back' onClick={() => {
            this.props.switchView();
            this.props.switchActiveLocation();
          }}><i className="fas fa-arrow-left back-arrow"></i></a>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{tripName}</h2>
          {editIcon}
        </div>;
    return (
      <>
        <div className='trip-list-module'>
          {headerContent}
          <ul className="trip-list itinerary">{locationsList}</ul>
        </div>
      </>
    );
  }
}
