import React from 'react';
import logo from '../../server/public/powered-by-foursquare-blue.png';
import fsLogo from '../../server/public/FS_logo.png';

export default class ViewPOI extends React.Component {
  render() {
    if (!this.props.location.poi[0]) {
      return <li className="trip-list-item">No places added yet</li>;
    } else {
      const placesList = this.props.location.poi.map(place => {
        return (
          <li key={place.id} className="poi-list-item" onClick={() => this.props.setCoordinates(place.location.lat, place.location.lng)}>
            <div>
              <h3>{place.name}</h3> <br />
              <h4>{`${place.location.address}, ${place.location.formattedAddress[1]}, ${place.location.cc}`}</h4>
            </div>
            <a href={`http://foursquare.com/v/${place.id}`} rel="noreferrer" target="_blank"><img className="fs-logo" src={fsLogo}></img></a>
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
