import React from 'react';
import Header from '../components/header';
import NavBar from '../components/navbar';

export default class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: [],
      isDeleting: null,
      isEditing: null
    };
  }

  componentDidMount() {
    fetch('/api/travelPlanner/itineraries')
      .then(res => res.json())
      .then(itineraries => {
        if (itineraries.length === 0) {
          this.setState({ itineraries: 'No trips added yet' });
        } else {
          this.setState({ itineraries });
        }
      });
  }

  render() {
    let list;
    let listIcon = <i className="fas fa-arrow-right trip-list-arrow"></i>;
    if (this.state.isEditing) {
      listIcon =
        <button className="delete button delete-itinerary" onClick={() => this.setState({ isDeleting: true })}>
          <i className="fas fa-trash"></i>
        </button>;
    }
    if (typeof this.state.itineraries === 'string') {
      list = <div className="trip-list-item">{this.state.itineraries}</div>;
    } else {
      list = this.state.itineraries.map(itinerary => {
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
        <Header />
        <div className="page-container">
          <div className="main trip">
            <div className="itinerary-list">
              <div className="name trip-title">
                <a className="back" href="" onClick={() => history.back()}><i className="fas fa-arrow-left back-arrow"></i></a>
                Itineraries
                {editIcon}
              </div>
              <ul className="trip-list">{list}</ul>
            </div>
          </div>
        </div>
        <NavBar />
      </>
    );
  }
}
