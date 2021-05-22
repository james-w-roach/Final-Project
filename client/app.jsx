import React from 'react';
import Home from './pages/home';
import Create from './pages/create';
import Itinerary from './pages/itinerary';
import LocationPage from './pages/locationPage';
import parseRoute from '../server/parseRoute';
import ItineraryList from './pages/itineraryList';
import Login from './pages/login';
import Header from './components/header';
import NavBar from './components/navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'itinerary',
      location: null,
      tripId: null,
      loggedIn: null,
      userId: null,
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = window.location.hash;
      this.setState({ route });
    });
    window.addEventListener('beforeunload', () => {
      const locationJSON = JSON.stringify(this.state.location);
      localStorage.setItem('Location', locationJSON);
      const tripIdJSON = JSON.stringify(this.state.tripId);
      localStorage.setItem('TripID', tripIdJSON);
      const loggedInJSON = JSON.stringify(this.state.loggedIn);
      localStorage.setItem('LoggedIn', loggedInJSON);
      const userIdJSON = JSON.stringify(this.state.userId);
      localStorage.setItem('UserID', userIdJSON);
    });
    if (localStorage.getItem('Location')) {
      const locationParse = JSON.parse(localStorage.getItem('Location'));
      this.setState({ location: locationParse });
      localStorage.removeItem('Location');
    }
    if (localStorage.getItem('TripID')) {
      const tripIdParse = JSON.parse(localStorage.getItem('TripID'));
      this.setState({ tripId: tripIdParse });
      localStorage.removeItem('TripID');
    }
    if (localStorage.getItem('LoggedIn')) {
      const loggedInParse = JSON.parse(localStorage.getItem('LoggedIn'));
      this.setState({ loggedIn: loggedInParse });
    }
    if (localStorage.getItem('UserID')) {
      const userIdParse = JSON.parse(localStorage.getItem('UserID'));
      this.setState({ userId: userIdParse });
      localStorage.removeItem('UserID');
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

  onSignIn(result) {
    localStorage.setItem('LoggedIn', true);
    this.setState({ loggedIn: true, userId: result.user.userId });
    window.location.hash = '#create';
  }

  onSignOut() {
    localStorage.setItem('LoggedIn', false);
    this.setState({ loggedIn: null });
    window.location.hash = '';
  }

  renderPage() {
    const { route } = this.state;
    const hash = window.location.hash;
    if (!JSON.parse(localStorage.getItem('LoggedIn')) && (hash === '#create' || hash === '#itineraryList' || hash === '#location' || hash.startsWith('#itinerary'))) {
      window.location.hash = '#login';
      return <Login onSignIn={this.onSignIn} action={route.split('#')[1]} />;
    }
    if (route === '') {
      return <Home loggedIn={this.state.loggedIn} />;
    } if (route === '#create') {
      return <Create userId={this.state.userId} />;
    } if (route === '#itinerary') {
      return <Itinerary route={false} toggleView={this.toggleView} userId={this.state.userId} />;
    } if (route.startsWith('#itinerary/')) {
      const trip = parseInt(route.split('/')[1], 10);
      return <Itinerary route={true} trip={trip} toggleView={this.toggleView} userId={this.state.userId} />;
    } else if (route === '#location') {
      return <LocationPage toggleView={this.toggleView} location={this.state.location} tripId={this.state.tripId} />;
    } else if (route === '#itineraryList') {
      return <ItineraryList userId={this.state.userId} />;
    } else if (route === '#login' || route === '#sign-up') {
      return <Login onSignIn={this.onSignIn} action={route.split('#')[1]} />;
    }
  }

  render() {
    return (
      <>
        <Header loggedIn={this.state.loggedIn} onSignOut={this.onSignOut} />
        { this.renderPage() }
        <NavBar loggedIn={this.state.loggedIn} onSignOut={this.onSignOut} />
      </>
    );
  }
}
