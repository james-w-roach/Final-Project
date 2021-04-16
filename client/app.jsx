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
      location: {
        name: '',
        lng: '',
        lat: '',
        poi: [],
        restaurants: []
      },
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
    });
    if (localStorage.getItem('Location')) {
      const locationParse = JSON.parse(localStorage.getItem('Location'));
      this.setState({ location: locationParse });
    }
  }

  toggleView(location) {
    if (this.state.route === '#itinerary') {
      this.setState({
        location
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
    } if (typeof route === 'object') {
      return <Itinerary trip={route[1]} toggleView={this.toggleView} />;
    } else if (route === '#location') {
      return <LocationPage toggleView={this.toggleView} location={this.state.location} />;
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
