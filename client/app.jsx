import React from 'react';
import Home from './pages/home';
import Create from './pages/create';
import Itinerary from './pages/itinerary';
import LocationPage from './pages/locationPage';
import ItineraryList from './pages/itineraryList';
import Login from './pages/login';
import Header from './components/header';
import NavDrawer from './components/navDrawer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'itinerary',
      location: null,
      tripId: null,
      loggedIn: null,
      userId: null,
      route: window.location.hash,
      viewingNavDrawer: false
    };
    this.renderPage = this.renderPage.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('UserID')) {
      const userIdParse = JSON.parse(localStorage.getItem('UserID'));
      this.setState({ userId: userIdParse });
    }
    window.addEventListener('hashchange', () => {
      const route = window.location.hash;
      this.setState({ route });
    });
    window.addEventListener('beforeunload', () => {
      const loggedInJSON = JSON.stringify(this.state.loggedIn);
      localStorage.setItem('LoggedIn', loggedInJSON);
      if (this.state.userId) {
        const userIdJSON = JSON.stringify(this.state.userId);
        localStorage.setItem('UserID', userIdJSON);
      }
      if (this.state.guestTrip) {
        const guestTripJSON = JSON.stringify(this.state.guestTrip);
        localStorage.setItem('Guest Trip', guestTripJSON);
      }
    });
    if (localStorage.getItem('Location')) {
      const locationParse = JSON.parse(localStorage.getItem('Location'));
      this.setState({ location: locationParse });
    }
    if (localStorage.getItem('TripID')) {
      const tripIdParse = JSON.parse(localStorage.getItem('TripID'));
      this.setState({ tripId: tripIdParse });
    }
    if (localStorage.getItem('LoggedIn')) {
      const loggedInParse = JSON.parse(localStorage.getItem('LoggedIn'));
      this.setState({ loggedIn: loggedInParse });
    }
    if (localStorage.getItem('Guest Trip')) {
      const guestTripParse = JSON.parse(localStorage.getItem('Guest Trip'));
      this.setState({ guestTrip: guestTripParse });
    }
  }

  toggleView(location, tripId) {
    if (this.state.route.startsWith('#itinerary')) {
      this.setState({
        location,
        tripId
      }, () => {
        const locationJSON = JSON.stringify(this.state.location);
        localStorage.setItem('Location', locationJSON);
        const tripIdJSON = JSON.stringify(this.state.tripId);
        localStorage.setItem('TripID', tripIdJSON);
        window.location.hash = '#location';
      });
    } else if (this.state.route === '#location') {
      window.location.hash = '#itinerary';
    }
  }

  onSignIn(result) {
    localStorage.setItem('LoggedIn', true);
    localStorage.setItem('UserID', result.user.userId);
    if (this.state.guestTrip) {
      const { guestTrip } = this.state;
      const body = {
        trip: guestTrip,
        userId: result.user.userId
      };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(body)
      };
      fetch('/api/travelPlanner/itineraries', req)
        .then(res => {
          res.json();
          window.location.hash = '#itineraryList';
        });

      localStorage.removeItem('Guest Trip');
    }
    this.setState({ loggedIn: true, userId: result.user.userId, guestTrip: null });
    window.location.hash = '#create';
  }

  onSignOut() {
    localStorage.setItem('LoggedIn', false);
    localStorage.removeItem('UserID');
    localStorage.removeItem('Location');
    localStorage.removeItem('TripID');
    window.location.hash = '';
    this.setState({ loggedIn: null, userId: null, location: null, tripId: null });
  }

  showDrawer() {
    this.setState({ viewingNavDrawer: !this.state.viewingNavDrawer });
  }

  addGuestTrip = trip => {
    this.setState({ guestTrip: trip});
    localStorage.setItem('Guest Trip', JSON.stringify(trip));
    window.location.hash = '#itinerary'
  }

  updateGuestTrip = itinerary => {
    const guestTrip = itinerary;
    localStorage.setItem('Guest Trip', JSON.stringify(guestTrip));
    this.setState({ guestTrip });
  }

  updateGuestPOI = locations => {
    const { guestTrip } = this.state;
    guestTrip.locations = locations;
    localStorage.setItem('Guest Trip', JSON.stringify(guestTrip));
    this.setState({ guestTrip });
  }

  renderPage() {
    const { route } = this.state;
    const hash = window.location.hash;
    if (route === '') {
      return <Home loggedIn={this.state.loggedIn} />;
    } if (route === '#create') {
      return <Create addGuestTrip={this.addGuestTrip} userId={this.state.userId} />;
    } if (route === '#itinerary') {
      return <Itinerary updateGuestTrip={this.updateGuestTrip} route={false} toggleView={this.toggleView} userId={this.state.userId} guestTrip={this.state.guestTrip} />;
    } if (route.startsWith('#itinerary/')) {
      const trip = parseInt(route.split('/')[1], 10);
      return <Itinerary updateGuestTrip={this.updateGuestTrip} route={true} trip={trip} toggleView={this.toggleView} userId={this.state.userId} />;
    } else if (route === '#location') {
      return <LocationPage updateGuestPOI={this.updateGuestPOI} loggedIn={this.state.loggedIn} toggleView={this.toggleView} location={this.state.location} tripId={this.state.tripId} />;
    } else if (route === '#itineraryList') {
      return <ItineraryList updateGuestTrip={this.updateGuestTrip} guestTrip={this.state.guestTrip} userId={this.state.userId} />;
    } else if (route === '#login' || route === '#sign-up') {
      return <Login onSignIn={this.onSignIn} action={route.split('#')[1]} />;
    }
  }

  render() {
    const { viewingNavDrawer } = this.state;
    const navDrawerClass = !viewingNavDrawer
      ? 'nav-drawer'
      : 'nav-drawer drawer-visible';
    return (
      <>
        <Header loggedIn={this.state.loggedIn} onSignOut={this.onSignOut} showDrawer={this.showDrawer} />
        { this.renderPage() }
        <NavDrawer loggedIn={this.state.loggedIn} onSignOut={this.onSignOut} showDrawer={this.showDrawer} navDrawerClass={navDrawerClass} />
      </>
    );
  }
}
