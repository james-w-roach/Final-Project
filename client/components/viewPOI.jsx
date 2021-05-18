import React from 'react';
import logo from '../../server/public/images/powered-by-foursquare-blue.png';
import fsLogo from '../../server/public/images/FS_logo.png';

export default class ViewPOI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleting: null,
      id: null
    };
    this.setDeleteClass = this.setDeleteClass.bind(this);
  }

  setDeleteClass(id) {
    if (this.state.isDeleting && id === this.state.id) {
      return 'delete-module';
    } else {
      return 'hidden';
    }
  }

  render() {
    if (!this.props.location.poi[0]) {
      return <li className="location-text">No places added yet. To add a place, use the &apos;+&apos; button.</li>;
    } else {
      const placesList = this.props.location.poi.map(place => {
        return (
          <li key={place.id} className="poi-list-item" >
            <div className="list-item-content">
              <h3>{place.name}</h3> <br />
              <h4>{`${place.location.address}, ${place.location.formattedAddress[1]}, ${place.location.cc}`}</h4>
            </div>
            <a href={`http://foursquare.com/v/${place.id}`} rel="noreferrer" target="_blank"><img className="fs-logo" src={fsLogo}></img></a>
            <button className="delete button" onClick={() => this.setState({ isDeleting: true, id: place.id })}>
              <i className="fas fa-trash"></i>
            </button>
            <div className={this.setDeleteClass(place.id)} id={place.name}>
              <h3>Are you sure you want to delete {place.name}?</h3>
              <div>
                <button className='delete-poi button' onClick={() => this.props.deletePOI(place.id)}>Delete</button>
                <button className='cancel button' onClick={() => this.setState({ isDeleting: false })}>Cancel</button>
              </div>
            </div>
          </li>
        );
      });
      return (
        <>
          <div className="poi-list-container">
            <ul className="poi-list">
              {placesList}
            </ul>
            <img className="foursquare-logo" src={logo} />
          </div>
        </>
      );
    }
  }
}
