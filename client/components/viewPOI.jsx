import React from 'react';

export default class ViewPOI extends React.Component {
  render() {
    let placesList;
    if (!this.props.location.poi[0]) {
      placesList = <li className="poi-list-item">No places added yet</li>;
    } else {
      placesList = this.props.location.poi.map(place => {
        return (
          <li key={place.id} className="poi-list-item">
            <div>
              <h3>{place.name}</h3> <br />
              <h4>{`${place.location.address}, ${place.location.formattedAddress[1]}, ${place.location.cc}`}</h4>
            </div>
          </li>
        );
      });
    }
    return (
      <>
        <ul className="poi-list">
          {placesList}
        </ul>
      </>
    );
  }
}
