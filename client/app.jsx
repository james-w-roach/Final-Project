import React from 'react';
import Create from './pages/create';
import LocationPage from './pages/locationPage';
import ItineraryPage from './pages/itineraryPage';
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
      viewingNavDrawer: false,
      itineraries: null,
      activeItinerary: null,
      view: 'itineraries',
      editingTrip: false
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
      if (this.state.activeItinerary) {
        const activeItineraryJSON = JSON.stringify(this.state.activeItinerary);
        localStorage.setItem('Active Itinerary', activeItineraryJSON);
      }
      if (this.state.activeLocation || this.state.activeLocation === null) {
        const activeLocationJSON = JSON.stringify(this.state.activeLocation);
        localStorage.setItem('Active Location', activeLocationJSON);
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

    this.updateItineraries();
  }

  updateItineraries = newItinerary => {
    let userId = this.state.userId;
    if (!userId) {
      userId = localStorage.getItem('UserID');
    }

    if (userId) {
      fetch(`/api/travelPlanner/itineraries/users/${userId}`)
        .then(res => res.json())
        .then(itineraries => {
          if (itineraries.length === 0) {
            this.setState({ itineraries: [] });
          } else {
            this.setState({ itineraries }, () => {
              if (window.location.hash === '#create' && newItinerary) {
                this.setState({ activeItinerary: itineraries[itineraries.length - 1] });
                window.location.hash = '#itineraries';
              } else {
                if (!this.state.activeItinerary && localStorage.getItem('Active Itinerary')) {
                  const activeItineraryParse = JSON.parse(localStorage.getItem('Active Itinerary'));
                  this.setState({ activeItinerary: activeItineraryParse });
                } else {
                  let activeItinerary;
                  for (let i = 0; i < itineraries.length; i++) {
                    if (this.state.activeItinerary && itineraries[i].tripId === this.state.activeItinerary.tripId) {
                      activeItinerary = itineraries[i];
                    }
                  }
                  if (activeItinerary) {
                    this.setState({ activeItinerary });
                  } else {
                    this.setState({ activeItinerary: itineraries[0] });
                  }
                }
                if (!this.state.activeLocation && localStorage.getItem('Active Location')) {
                  const activeLocationParse = JSON.parse(localStorage.getItem('Active Location'));
                  if (activeLocationParse) {
                    this.setState({ activeLocation: activeLocationParse, view: 'itinerary' });
                  }
                }
              }
            });
          }
        });
    } else {
      let { guestTrip } = this.state;
      if (!guestTrip && localStorage.getItem('Guest Trip')) {
        guestTrip = JSON.parse(localStorage.getItem('Guest Trip'));
      }
      if (guestTrip) {
        if (!this.state.activeLocation && localStorage.getItem('Active Location')) {
          const activeLocationParse = JSON.parse(localStorage.getItem('Active Location'));
          if (activeLocationParse) {
            this.setState({ activeLocation: activeLocationParse, view: 'itinerary' });
          }
        }
        const loginNotice = {
          tripName: 'Sign in to create more than one trip.',
          locations: 'Your guest trip will be saved.',
          tripId: 'loginNotice'
        };
        this.setState({ itineraries: [guestTrip, loginNotice], activeItinerary: guestTrip });
      } else {
        this.setState({ itineraries: [] });
      }
    }
  }

  setDeleteClass = tripId => {
    if (this.state.isDeleting && tripId === this.state.id) {
      return 'delete-module';
    } else {
      return 'hidden';
    }
  }

  deleteItinerary = tripId => {
    const { itineraries } = this.state;
    let currentIndex;
    for (let i = 0; i < itineraries.length; i++) {
      if (itineraries[i].tripId === tripId) {
        itineraries.splice(i, 1);
        currentIndex = i;
      }
    }
    if (this.state.itineraries.length === 0) {
      this.setState({ itineraries: [], activeItinerary: null });
    } else if (this.state.itineraries.length <= currentIndex) {
      this.setState({ activeItinerary: this.state.itineraries[currentIndex - 1] });
    } else {
      this.setState({ activeItinerary: this.state.itineraries[currentIndex] });
    }
    if (this.state.userId) {
      const req = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(`/api/travelPlanner/itineraries/${tripId}`, req)
        .then(res => res.json());
    } else {
      this.setState({ itineraries: [], activeItinerary: null });
      this.updateGuestTrip(null);
    }
  }

  toggleView(location, tripId) {
    if (this.state.route === '#itineraries') {
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
      window.location.hash = '#itineraries';
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
          window.location.hash = '#itineraries';
        });

      localStorage.removeItem('Guest Trip');
    }
    this.setState({ loggedIn: true, userId: result.user.userId, itineraries: [], guestTrip: null }, () => this.updateItineraries());
    window.location.hash = '#itineraries';
  }

  onSignOut() {
    localStorage.setItem('LoggedIn', false);
    localStorage.removeItem('UserID');
    localStorage.removeItem('Location');
    localStorage.removeItem('TripID');
    window.location.hash = '';
    this.setState({ loggedIn: null, userId: null, location: null, tripId: null, itineraries: [], view: 'itineraries' });
  }

  showDrawer() {
    this.setState({ viewingNavDrawer: !this.state.viewingNavDrawer });
  }

  addGuestTrip = trip => {
    this.setState({ guestTrip: trip }, () => this.updateItineraries());
    localStorage.setItem('Guest Trip', JSON.stringify(trip));
    window.location.hash = '#itineraries'
  }

  updateGuestTrip = itinerary => {
    const guestTrip = itinerary;
    localStorage.setItem('Guest Trip', JSON.stringify(guestTrip));
    this.setState({ guestTrip }, () => this.updateItineraries());
  }

  updateGuestPOI = locations => {
    const { guestTrip } = this.state;
    guestTrip.locations = locations;
    localStorage.setItem('Guest Trip', JSON.stringify(guestTrip));
    this.setState({ guestTrip });
  }

  switchView = view => {
    if (view && view === 'itineraries') {
      this.setState({ view: 'itineraries' }, () => this.switchActiveLocation());
    } else {
      if (this.state.view === 'itineraries') {
        this.setState({ view: 'itinerary' });
      } else {
        this.setState({ view: 'itineraries' });
      }
    }
  }

  switchItinerary = activeItinerary => {
    this.setState({ activeItinerary });
  }

  switchActiveLocation = activeLocation => {
    if (!activeLocation) {
      this.setState({ activeLocation: null });
    } else {
      this.setState({ activeLocation });
    }
  }

  editTrip = boolean => {
    if (boolean) {
      this.setState({ editingTrip: true }, () => window.location.hash = '#edit');
    }
  }

  renderPage() {
    const { route } = this.state;
    const hash = window.location.hash;
    if (route === '' || route === '#create' || route === '#edit') {
      return <Create
        updateItineraries={this.updateItineraries}
        addGuestTrip={this.addGuestTrip}
        guestTrip={this.state.guestTrip}
        userId={this.state.userId}
        editingTrip={this.state.editingTrip}
        activeItinerary={this.state.activeItinerary}
      />;
    } else if (route === '#location') {
      return <LocationPage
        userId={this.state.userId}
        updateGuestPOI={this.updateGuestPOI}
        loggedIn={this.state.loggedIn}
        toggleView={this.toggleView}
        location={this.state.location}
        tripId={this.state.tripId}
        updateItineraries={this.updateItineraries}
      />;
    } else if (route === '#itineraries') {
      return <ItineraryPage
        toggleView={this.toggleView}
        itineraries={this.state.itineraries}
        updateItineraries={this.updateItineraries}
        activeItinerary={this.state.activeItinerary}
        activeLocation={this.state.activeLocation}
        switchItinerary={this.switchItinerary}
        switchActiveLocation={this.switchActiveLocation}
        switchView={this.switchView}
        view={this.state.view}
        deleteItinerary={this.deleteItinerary}
        guestTrip={this.state.guestTrip}
        updateGuestTrip={this.updateGuestTrip}
        userId={this.state.userId}
        editTrip={this.editTrip}
      />;
    } else if (route === '#login' || route === '#sign-up') {
      if (this.state.userId && this.state.loggedIn) {
        window.location.hash = '#itineraries';
      } else {
        return <Login onSignIn={this.onSignIn} action={route.split('#')[1]} />;
      }
    } else {
      window.location.hash = '#create';
    }
  }

  render() {
    const { viewingNavDrawer } = this.state;
    const navDrawerClass = !viewingNavDrawer
      ? 'nav-drawer'
      : 'nav-drawer drawer-visible';
    return (
      <>
        <Header loggedIn={this.state.loggedIn} onSignOut={this.onSignOut} showDrawer={this.showDrawer} switchView={this.switchView} />
        { this.renderPage() }
        <NavDrawer loggedIn={this.state.loggedIn} onSignOut={this.onSignOut} showDrawer={this.showDrawer} switchView={this.switchView} navDrawerClass={navDrawerClass} />
      </>
    );
  }
}
