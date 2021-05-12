import React from 'react';
import Home from './pages/home';
import Create from './pages/create';
import Itinerary from './pages/itinerary';
import LocationPage from './pages/locationPage';
import parseRoute from '../server/parseRoute';
import ItineraryList from './pages/itineraryList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'itinerary',
      location: null,
      tripId: null,
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: window.location.hash });
    });
    window.addEventListener('beforeunload', () => {
      const locationJSON = JSON.stringify(this.state.location);
      localStorage.setItem('Location', locationJSON);
      const tripIdJSON = JSON.stringify(this.state.tripId);
      localStorage.setItem('TripID', tripIdJSON);
    });
    if (localStorage.getItem('Location')) {
      const locationParse = JSON.parse(localStorage.getItem('Location'));
      this.setState({ location: locationParse });
    }
    if (localStorage.getItem('TripID')) {
      const tripIdParse = JSON.parse(localStorage.getItem('TripID'));
      this.setState({ tripId: tripIdParse });
    }
  }

  toggleView(location, tripId) {
    if (this.state.route.startsWith('#itinerary')) {
      this.setState({
        location,
        tripId
      }, () => { window.location.hash = '#location'; });
    } else if (this.state.route === '#location') {
      window.location.hash = '#itinerary';
    }
  }

  renderPage() {
    const { route } = this.state;
    if (route === '') {
      return <Home />;
    } if (route === '#create') {
      return <Create />;
    } if (route === '#itinerary') {
      return <Itinerary toggleView={this.toggleView} />;
    } if (route.startsWith('#itinerary/')) {
      const trip = parseInt(route.split('/')[1]);
      return <Itinerary trip={trip} toggleView={this.toggleView} />;
    } else if (route === '#location') {
      return <LocationPage toggleView={this.toggleView} location={this.state.location} tripId={this.state.tripId} />;
    } else if (route === '#itineraryList') {
      return <ItineraryList />;
    }
  }

  render() {
    return (
      <>
        { this.renderPage() }
      </>
    );
  }
}
