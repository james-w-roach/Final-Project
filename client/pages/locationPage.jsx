import React from 'react';
import ViewLocation from '../components/viewLocation';
import AddPOI from '../components/addPOI';

export default class LocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'location',
      locations: [],
      currentPOI: []
    };
    this.changeComponent = this.changeComponent.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.sendPutRequest = this.sendPutRequest.bind(this);
    this.deletePOI = this.deletePOI.bind(this);
  }

  deletePOI(id) {
    const { locations } = this.state;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].name === this.props.location.name) {
        for (let j = 0; j < locations[i].poi.length; j++) {
          if (locations[i].poi[j].id === id) {
            locations[i].poi.splice(j, 1);
          }
        }
      }
    }
    this.setState({ locations }, () => {
      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.locations)
      };
      fetch(`/api/travelPlanner/itineraries/${this.props.tripId}`, req)
        .then(res => res.json());
    });
  }

  componentDidMount() {
    if (localStorage.getItem('Guest Trip')) {
      const guestTrip = JSON.parse(localStorage.getItem('Guest Trip'));
      this.setState({ locations: guestTrip.locations });
    } else if (this.props.loggedIn) {
      let tripId;
      if (!this.props.tripId) {
        tripId = localStorage.getItem('TripID');
      } else {
        tripId = this.props.tripId;
      }
      fetch(`/api/travelPlanner/itineraries/${tripId}`)
        .then(res => res.json())
        .then(result => {
          this.setState({ locations: result.locations });
        });
    }
  }

  changeComponent() {
    const { component } = this.state;
    if (component === 'location') {
      this.setState({ component: 'add' });
    } else {
      this.setState({ component: 'location' });
    }
  }

  handleAdd(result) {
    const { currentPOI } = this.state;
    const newPOIList = currentPOI.concat(result);
    this.setState({ currentPOI: newPOIList });
  }

  sendPutRequest() {
    const { locations, currentPOI } = this.state;
    for (let i = 0; i < this.state.locations.length; i++) {
      if (locations[i].name === this.props.location.name) {
        locations[i].poi = locations[i].poi.concat(currentPOI);
        this.setState({ locations, currentPOI: [] }, () => this.changeComponent());
      }
    }
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.locations)
    };
    fetch(`/api/travelPlanner/itineraries/${this.props.tripId}`, req)
      .then(res => res.json());
  }

  addGuestPOI = () => {
    const { locations, currentPOI } = this.state;
    for (let i = 0; i < this.state.locations.length; i++) {
      if (locations[i].name === this.props.location.name) {
        locations[i].poi = locations[i].poi.concat(currentPOI);
        this.setState({ locations, currentPOI: [] }, () => {
          this.changeComponent()
        });
      }
    }
    this.props.updateGuestTrip(locations);
  }

  renderPage() {
    const { component, locations } = this.state;
    let location = this.props.location;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].name === this.props.location.name) {
        location = locations[i];
      }
    }
    if (component === 'location') {
      return (
      <ViewLocation
        getLocationData={this.getLocationData}
        location={location}
        changeComponent={this.changeComponent}
        deletePOI={this.deletePOI} />
      );
    } else {
      return (
        <AddPOI
        location={location}
        tripId={this.props.tripId}
        locations={this.state.locations}
        changeComponent={this.changeComponent}
        handleAdd={this.handleAdd}
        sendPutRequest={this.sendPutRequest}
        addGuestPOI={this.addGuestPOI} />
      );
    }
  }

  render() {
    return (
      <>
        <div className="page-container">
          { this.renderPage() }
        </div>
      </>
    );
  }
}
