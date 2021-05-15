import React from 'react';
import ViewLocation from '../components/viewLocation';
import Header from '../components/header';
import AddPOI from '../components/addPOI';
import NavBar from '../components/navbar';

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
  }

  componentDidMount() {
    let tripId;
    if (!this.props.tripId) {
      tripId = localStorage.getItem('TripID');
    } else {
      tripId = this.props.tripId;
    }
    fetch(`/api/travelPlanner/itineraries/${tripId}`)
      .then(res => res.json())
      .then(result => this.setState({ locations: result.locations }));
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
        changeComponent={this.changeComponent} />
      );
    } else {
      return (
        <AddPOI
        location={location}
        tripId={this.props.tripId}
        locations={this.state.locations}
        changeComponent={this.changeComponent}
        handleAdd={this.handleAdd}
        sendPutRequest={this.sendPutRequest} />
      );
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="page-container">
          { this.renderPage() }
        </div>
        <NavBar />
      </>
    );
  }
}
