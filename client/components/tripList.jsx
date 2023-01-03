import React from 'react';
import ItineraryMap from '../components/itineraryMap';

export default class TripList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
      isEditing: false,
      id: null,
      matches: window.matchMedia('(min-width: 700px)').matches
    };
  }

  componentDidMount() {
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

  render() {
    let list;
    if ((this.props.itineraries && this.props.itineraries.length === 0) || this.props.itineraries === null) {
      list = null;
    } else {
      list = this.props.itineraries.map(itinerary => {
        const listIcon = this.state.isEditing && itinerary.tripId !== 'loginNotice'
          ? <button className="delete button delete-itinerary" onClick={() => this.setState({ isDeleting: true, id: itinerary.tripId })}>
            <i className="fas fa-trash"></i>
          </button>
          : null;
        let locations;
        if (itinerary.tripId === 'loginNotice') {
          locations = itinerary.locations;
        } else if (itinerary.locations.length > 1) {
          locations = `${itinerary.locations.length} locations`;
        } else {
          locations = `${itinerary.locations.length} location`;
        }
        const href = itinerary.tripId === 'loginNotice'
          ? '#login'
          : `#itinerary/${itinerary.tripId}`
        const active = itinerary.tripId === this.props.activeItinerary.tripId
          ? ' active-trip'
          : '';
        const anchorPosition = this.state.isEditing
          ? ' editing-position'
          : '';
        const listItemAnchor = this.props.activeItinerary.tripId === itinerary.tripId
          ? <a className={`mobile-list-item-anchor${anchorPosition}`} onClick={() => this.props.switchView()}>View</a>
          : null;
        const listItem = this.state.matches
          ? <div className={`list-item${active}`}>
            <div>
              {itinerary.tripName}
            </div>
            <div className="locations">
              {locations}
            </div>
          </div>
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
              if (this.props.activeItinerary.tripId !== itinerary.tripId && this.state.matches && itinerary.tripId !== 'loginNotice') {
                this.props.switchItinerary(itinerary);
              }
            }}
            onClick={event => {
              if (!this.state.isEditing) {
                if (this.props.activeItinerary.tripId !== itinerary.tripId && !this.state.matches && itinerary.tripId !== 'loginNotice') {
                  this.props.switchItinerary(itinerary);
                }
                if (this.state.matches) {
                  this.props.switchView();
                }
              }
            }}>
            {listIcon}
            {listItem}
            <div className={this.setDeleteClass(itinerary.tripId)} id={itinerary.tripName}>
              Delete {itinerary.tripName}?
              <div>
                <button className='delete-poi button' onClick={() => {
                  this.props.deleteItinerary(itinerary.tripId);
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
      editIcon = <button className="edit-button" onClick={() => this.setState({ isEditing: false, isDeleting: false })}>
        <i className="fas fa-times x-icon"></i>
      </button>;
    }

    return (
      <div className='trip-list-module'>
        <div className='trip-list-header'>
          <h2 style={{ fontSize: '1.5rem' }}>Itineraries</h2>
          {editIcon}
        </div>
        <ul className="trip-list">{list}</ul>
      </div>
    );
  }
}
