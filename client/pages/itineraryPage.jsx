import React from 'react';
import ItineraryMap from '../components/itineraryMap';
import TripList from '../components/tripList';
import Trip from '../components/trip';

export default class ItineraryPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let itineraryContent = null;
    let noItineraryContent = null;
    let listContent;
    if (this.props.itineraries && !this.props.itineraries.length) {
      if (!this.props.userId) {
        noItineraryContent = <div className="no-trips">
          <h2>Nothing to see here yet. <br />Click below to get started.</h2>
          <a className='create button no-trips-create' href='#create'>Create A Guest Itinerary</a>
          <h2>OR</h2>
          <a className='create button no-trips-create' href='#login'>Sign In To Create More</a>
        </div>;
      } else {
        noItineraryContent = <div className="no-trips">
          <h2>Nothing to see here yet. <br />Click below to add a trip!</h2>
          <a className='create button no-trips-create' href='#create'>Create An Itinerary</a>
        </div>;
      }
    }
    if (this.props.itineraries && this.props.itineraries.length && this.props.activeItinerary) {
      if (this.props.view === 'itineraries') {
        listContent = (
          <TripList
            userId={this.props.userId}
            itineraries={this.props.itineraries}
            activeItinerary={this.props.activeItinerary}
            switchActiveLocation={this.props.switchActiveLocation}
            switchItinerary={this.props.switchItinerary}
            switchView={this.props.switchView}
            view={this.props.view}
            deleteItinerary={this.props.deleteItinerary}
          />
        );
      } else if (this.props.view === 'itinerary') {
        listContent = (
          <Trip
            updateItineraries={this.props.updateItineraries}
            switchActiveLocation={this.props.switchActiveLocation}
            activeLocation={this.props.activeLocation}
            userId={this.props.userId}
            toggleView={this.props.toggleView}
            itineraries={this.props.itineraries}
            activeItinerary={this.props.activeItinerary}
            switchItinerary={this.props.switchItinerary}
            switchView={this.props.switchView}
            view={this.props.view}
            deleteItinerary={this.props.deleteItinerary}
            guestTrip={this.props.guestTrip}
            updateGuestTrip={this.props.updateGuestTrip}
            editTrip={this.props.editTrip}
          />
        );
      }
      itineraryContent = (
        <>
          {listContent}
          <div className='itinerary-map-container'>
            <ItineraryMap activeLocation={this.props.activeLocation} activeItinerary={this.props.activeItinerary} />
          </div>
        </>
      )
    }
    return (
      <>
        <div className="page-container">
          <div className="main trip">
            <div className="trip-list-container">
              {noItineraryContent}
              {itineraryContent}
            </div>
          </div>
        </div>
      </>
    );
  }
}
