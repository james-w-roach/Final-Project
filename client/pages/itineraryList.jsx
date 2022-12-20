import React from 'react';
import ItineraryMap from '../components/itineraryMap';

export default class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: [],
      activeItinerary: null,
      isDeleting: null,
      isEditing: null,
      id: null,
      matches: window.matchMedia('(min-width: 700px)').matches
    };
    this.deleteItinerary = this.deleteItinerary.bind(this);
    this.setDeleteClass = this.setDeleteClass.bind(this);
  }

  componentDidMount() {
    let userId = this.props.userId;
    if (!userId) {
      userId = localStorage.getItem('UserID');
    }
    if (userId) {
      fetch(`/api/travelPlanner/itineraries/users/${userId}`)
        .then(res => res.json())
        .then(itineraries => {
          if (itineraries.length === 0) {
            this.setState({ itineraries: null });
          } else {
            this.setState({ itineraries, activeItinerary: itineraries[0] });
          }
        });
    } else {
      let { guestTrip } = this.props;
      if (!guestTrip && localStorage.getItem('Guest Trip')) {
        guestTrip = JSON.parse(localStorage.getItem('Guest Trip'));
      }
      if (guestTrip) {
        const loginNotice = {
          tripName: 'Sign in to create more than one trip.',
          locations: 'Your guest trip will be saved.',
          tripId: 'loginNotice'
        };
        this.setState({ itineraries: [guestTrip, loginNotice], activeItinerary: guestTrip });
      } else {
        this.setState({ itineraries: null });
      }
    }

    window.matchMedia('(min-width: 700px)').addEventListener('change', e => {
      this.setState({ matches: e.matches })
    });
  }

  setDeleteClass(tripId) {
    if (this.state.isDeleting && tripId === this.state.id) {
      return 'delete-module';
    } else {
      return 'hidden';
    }
  }

  deleteItinerary(tripId) {
    const { itineraries } = this.state;
    for (let i = 0; i < itineraries.length; i++) {
      if (itineraries[i].tripId === tripId) {
        itineraries.splice(i, 1);
      }
    }
    if (this.state.itineraries.length === 0) {
      this.setState({ itineraries: null });
    }
    if (this.props.userId) {
      const req = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(`/api/travelPlanner/itineraries/${tripId}`, req)
        .then(res => res.json());
    } else {
      this.setState({ itineraries: null });
      this.props.updateGuestTrip(null);
    }
  }

  render() {
    let list;
    if ((this.state.itineraries && this.state.itineraries.length === 0) || this.state.itineraries === null) {
      list = null;
    } else {
      list = this.state.itineraries.map(itinerary => {
        const listIcon = this.state.isEditing && itinerary.tripId !== 'loginNotice'
          ? <button className="delete button delete-itinerary" onClick={() => this.setState({ isDeleting: true, id: itinerary.tripId })}>
              <i className="fas fa-trash"></i>
            </button>
          : null;
        const locations = itinerary.tripId === 'loginNotice'
          ? itinerary.locations
          : `${itinerary.locations.length} locations`
        const href = itinerary.tripId === 'loginNotice'
          ? '#login'
          : `#itinerary/${itinerary.tripId}`
        const active = itinerary.tripId === this.state.activeItinerary.tripId
          ? ' active-trip'
          : '';
        const anchorPosition = this.state.isEditing
          ? ' editing-position'
          : '';
        const listItemAnchor = this.state.activeItinerary.tripId === itinerary.tripId
          ? <a className={`mobile-list-item-anchor${anchorPosition}`} href={href}>View</a>
          : null;
        const listItem = this.state.matches
          ? <a className={`list-item${active}`} href={href}>
              <div>
                {itinerary.tripName}
              </div>
              <div className="locations">
                {locations}
              </div>
            </a>
          : <div className={`list-item${active}`}>
              <div>
                {itinerary.tripName}
              </div>
              <div className="locations">
                {locations}
              </div>
              {listItemAnchor}
            </div>;
        return (
          <li className='trip-list-item dynamic' key={itinerary.tripId}
            onMouseEnter={() => {
              if (this.state.activeItinerary.tripId !== itinerary.tripId && this.state.matches) {
                this.setState({ activeItinerary: itinerary })
              };
            }}
            onClick={() => {
              if (this.state.activeItinerary.tripId !== itinerary.tripId && !this.state.matches) {
                this.setState({ activeItinerary: itinerary })
              };
            }}>
            {listIcon}
            {listItem}
            <div className={this.setDeleteClass(itinerary.tripId)} id={itinerary.tripName}>
              Delete {itinerary.tripName}?
              <div>
                <button className='delete-poi button' onClick={() => {
                  this.deleteItinerary(itinerary.tripId);
                  this.setState({ isDeleting: false });
                }}>Delete</button>
                <button className='cancel button' onClick={() => this.setState({ isDeleting: false })}>Cancel</button>
              </div>
            </div>
          </li>
        );
      });
    }
    let editIcon =
      <button className="edit-button" onClick={() => this.setState({ isEditing: true })}>
        <i className="fas fa-pen"></i>
      </button>;
    if (this.state.isEditing) {
      editIcon = <button className="edit-button" onClick={() => this.setState({ isEditing: false })}>
        <i className="fas fa-times x-icon"></i>
      </button>;
    }
    let noTripsModule = null;
    let tripListModule = null;
    if (this.state.itineraries === null) {
      if (!this.props.userId) {
        noTripsModule = <div className="no-trips">
          <h2>Nothing to see here yet. <br />Click below to get started.</h2>
          <a className='create button no-trips-create' href='#create'>Create A Guest Itinerary</a>
          <h2>OR</h2>
          <a className='create button no-trips-create' href='#login'>Sign In To Create More</a>
        </div>;
      } else {
        noTripsModule = <div className="no-trips">
          <h2>Nothing to see here yet. <br />Click below to add a trip!</h2>
          <a className='create button no-trips-create' href='#create'>Create An Itinerary</a>
        </div>;
      }
    } else if (this.state.activeItinerary) {
      tripListModule = <>
        <div className='trip-list-module'>
          <div className='trip-list-header'>
            <h2 style={{ fontSize: '1.5rem' }}>Itineraries</h2>
            {editIcon}
          </div>
          <ul className="trip-list">{list}</ul>
          </div>
        <div className='itinerary-map-container'>
          <ItineraryMap activeItinerary={this.state.activeItinerary} />
        </div>
      </>
    }
    return (
      <>
        <div className="page-container">
          <div className="main trip">
            <div className="trip-list-container">
              {noTripsModule}
              {tripListModule}
            </div>
          </div>
        </div>
      </>
    );
  }
}
