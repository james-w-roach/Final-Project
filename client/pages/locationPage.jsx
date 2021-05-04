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
      locations: []
    };
    this.changeComponent = this.changeComponent.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.sendPutRequest = this.sendPutRequest.bind(this);
  }

  componentDidMount() {
    fetch(`/api/travelPlanner/itineraries/${this.props.tripId}`)
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
    const { locations } = this.state;
    for (let i = 0; i < this.state.locations.length; i++) {
      if (this.state.locations[i].name === this.props.location.name) {
        locations[i].poi = locations[i].poi.concat(result);
        this.setState({ locations });
      }
    }
  }

  sendPutRequest() {
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.locations)
    };
    fetch(`/api/travelPlanner/itineraries/${this.props.tripId}`, req)
      .then(res => res.json())
      .then(this.changeComponent());
  }

  renderPage() {
    const { component } = this.state;
    const { locations } = this.state;
    let location;
    if (!locations) {
      location = this.props.location;
    } else {
      for (let i = 0; i < locations.length; i++) {
        if (locations[i].name === this.props.location.name) {
          location = locations[i];
        } else {
          location = this.props.location;
        }
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
        location={this.props.location}
        tripId={this.props.tripId}
        locations={this.state.locations}
        changeComponent={this.changeComponent}
        handleAdd={this.handleAdd}
        getLocationData={this.getLocationData}
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
