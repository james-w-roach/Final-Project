import React from 'react';
import ViewLocation from '../components/viewLocation';
import Header from '../components/header';
import AddPOI from '../components/addPOI';

export default class LocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'location',
      locations: null
    };
    this.changeComponent = this.changeComponent.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.getLocationData = this.getLocationData.bind(this);
  }

  getLocationData() {
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
        handleAdd={this.handleAdd} />
      );
    }
  }

  render() {
    return (
      <>
        <Header />
        { this.renderPage() }
      </>
    );
  }
}
