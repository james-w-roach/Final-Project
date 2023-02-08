import React from 'react';
import CreateForm from '../components/createForm';
import CreateMap from '../components/createMap';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      location: {},
      inLocations: null,
      tripName: '',
      showFinish: null
    }
  }

  componentDidUpdate() {
    if (!this.props.editingTrip && this.state.editingEnabled) {
      this.setState({ locations: [], tripName: '', showFinish: false, editingEnabled: false });
    } else if (this.props.editingTrip && !this.state.editingEnabled && this.props.activeItinerary) {
      this.setState({ locations: this.props.activeItinerary.locations, tripName: this.props.activeItinerary.tripName, showFinish: true, editingEnabled: true });
    }
  }

  componentDidMount() {
    if (this.props.editingTrip && this.props.activeItinerary) {
      this.setState({ locations: this.props.activeItinerary.locations, tripName: this.props.activeItinerary.tripName, showFinish: true, editingEnabled: true });
    }
  }

  handleSubmit = () => {
    event.preventDefault();
    if (!this.state.locations[0]) {
      document.activeElement.blur();
      window.alert('Please add at least one location to your itinerary to continue.');
      return;
    } else if (!this.state.tripName) {
      document.activeElement.blur();
      window.alert('Please add a name for your trip to continue.');
      return;
    }
    if (this.props.userId) {
      const userId = this.props.userId;
      const trip = {
        tripName: this.state.tripName,
        locations: this.state.locations
      }
      const body = {
        trip,
        userId
      };
      const method = this.props.activeItinerary && this.props.editingTrip
        ? 'PUT'
        : 'POST';
      const tripId = this.props.activeItinerary && this.props.editingTrip
        ? this.props.activeItinerary.tripId
        : null;
      const route = this.props.activeItinerary && this.props.editingTrip
        ? `/api/travelPlanner/itineraries/${tripId}`
        : '/api/travelPlanner/itineraries';
      const req = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(body)
      };
      fetch(route, req)
        .then(res => res.json())
        .then(() => {
          this.props.updateItineraries(true);
        });
    } else {
      const trip = {
        tripName: this.state.tripName,
        locations: this.state.locations,
        tripId: 1
      }
      this.props.addGuestTrip(trip);
    }
  }

  addLocation = result => {
    this.setState({ inLocations: null }, () => this.toggleFinish(false));
    let locationName;
    if (result.result['place_name_en-us']) {
      locationName = result.result['place_name_en-us'];
    } else {
      locationName = result.result['place_name_en-US'];
    }
    const lng = result.result.center[0];
    const lat = result.result.center[1];
    if (!this.state.locations[0]) {
      this.setState({
        location: {
          name: locationName,
          lat,
          lng,
          restaurants: [],
          poi: []
        },
        inLocations: false
      });
    } else {
      for (let i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].name === locationName) {
          this.setState({
            location: {
              name: locationName,
              lat,
              lng,
              restaurants: [],
              poi: []
            },
            inLocations: true
          }, () => setTimeout(() => {
            this.toggleFinish(true);
          }, 2000));
          break;
        }
      }
      if (!this.state.inLocations) {
        this.setState({
          location: {
            name: locationName,
            lat,
            lng,
            restaurants: [],
            poi: []
          },
          inLocations: false
        });
      }
    }
  }

  handleClick = () => {
    if (!this.state.location.name) {
      return;
    }
    if (!this.state.inLocations) {
      if (this.state.locations.length === 20) {
        window.alert('You have reached the limit of 20 locations.');
        return;
      }
      const newLocation = this.state.location;
      this.setState({
        locations: this.state.locations.concat(newLocation),
        inLocations: true
      }, () => {
        this.toggleFinish(false);
        setTimeout(() => {
          this.toggleFinish(true);
        }, 2000);
      }
      );
    } else {
      window.alert(`${this.state.location.name.split(',')[0]} has already been added.`);
    }
  }

  getButtonText = () => {
    if (!this.state.location.name) {
      return 'Search For a Location';
    } else if (!this.state.inLocations || this.state.inLocations === null) {
      return `Add ${this.state.location.name.split(',')[0]}`;
    } else {
      return `${this.state.location.name.split(',')[0]} Added!`;
    }
  }

  updateTripName = event => {
    const tripName = event.target.value;
    this.setState({ tripName });
  }

  toggleFinish = boolean => {
    if (boolean) {
      this.setState({ showFinish: true });
    } else {
      this.setState({ showFinish: false });
    }
  }

  deleteLocation = location => {
    if (location) {
      const { locations } = this.state;
      for (let i = 0; i < locations.length; i++) {
        if (locations[i].name === location) {
          locations.splice(i, 1);
        }
      }
      this.setState({ locations });
    }
  }

  render() {
    return (
      <>
        <div className="page">
          <div className="page-container">
            <div className="main create-page">
              <CreateForm
                handleSubmit={this.handleSubmit}
                showFinish={this.state.showFinish}
                updateTripName={this.updateTripName}
                locations={this.state.locations}
                deleteLocation={this.deleteLocation}
                userId={this.props.userId}
                guestTrip={this.props.guestTrip}
                editingTrip={this.props.editingTrip}
                activeItinerary={this.props.activeItinerary}
              />
              <CreateMap
                userId={this.props.userId}
                guestTrip={this.props.guestTrip}
                addLocation={this.addLocation}
                showFinish={this.state.showFinish}
                toggleFinish={this.toggleFinish}
                location={this.state.location}
                inLocations={this.state.inLocations}
                handleClick={this.handleClick}
                getButtonText={this.getButtonText}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
