import React from 'react';

export default class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: [],
      isDeleting: null,
      isEditing: null,
      id: null
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
            this.setState({ itineraries: 'No trips added yet' });
          } else {
            this.setState({ itineraries }, () => console.log(this.state.itineraries));
          }
        });
    } else {
      let { guestTrip } = this.props;
      if (!guestTrip && localStorage.getItem('Guest Trip')) {
        guestTrip = JSON.parse(localStorage.getItem('Guest Trip'));
      }
      if (guestTrip) {
        this.setState({ itineraries: [guestTrip] });
      }
    }
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
      this.setState({ itineraries: 'No trips added yet' });
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
      this.props.updateGuestTrip(null);
    }
  }

  render() {
    let list;
    let listIcon = <i className="fas fa-arrow-right trip-list-arrow"></i>;
    if (this.state.itineraries.length === 0) {
      list = <div className="no-trips">
        <h2>Nothing to see here yet. <br />Click below to get started.</h2>
        <a className='create button no-trips-create' href='#create'>Create A Guest Itinerary</a>
        <h2>OR</h2>
        <a className='create button no-trips-create' href='#login'>Sign In To Create More</a>
      </div>;
    } else {
      list = this.state.itineraries.map(itinerary => {
        if (this.state.isEditing) {
          listIcon =
            <button className="delete button delete-itinerary" onClick={() => this.setState({ isDeleting: true, id: itinerary.tripId })}>
              <i className="fas fa-trash"></i>
            </button>;
        }
        return (
          <li className="trip-list-item dynamic" key={itinerary.tripId}>
            {listIcon}
            <a className="list-item" href={`#itinerary/${itinerary.tripId}`} >
              <div>
                {itinerary.tripName}
              </div>
              <div className="locations">
                {itinerary.locations.length} locations
              </div>
            </a>
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
    return (
      <>
        <div className="page-container">
          <div className="main trip">
            <div className="itinerary-list">
              <div className="name trip-title">
                <h2 style={{ fontSize: '2.5rem' }}>Itineraries</h2>
                {editIcon}
              </div>
              <ul className="trip-list">{list}</ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
