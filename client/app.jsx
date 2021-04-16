import React from 'react';
import Home from './pages/home';
import Create from './pages/create';
import AppContext from '../server/app-context';
import Itinerary from './pages/itinerary';
import LocationPage from './pages/locationPage';
import parseRoute from '../server/parseRoute';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false,
      view: 'itinerary',
      locationView: {},
      currentTripName: '',
      currentLocations: [],
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: window.location.hash });
    });
  }

  toggleView(location) {
    if (this.state.view === 'itinerary') {
      this.setState({
        view: 'location',
        locationView: location
      });
    } else if (this.state.view === 'location') {
      this.setState({ view: 'itinerary' });
    }
  }

  renderPage() {
    const { route } = this.state;
    if (route === '') {
      return <Home />;
    } if (route === '#create') {
      return <Create toggleCreate={this.toggleCreate} />;
    } if (route === '#itinerary') {
      return <Itinerary view={this.state.view} toggleView={this.toggleView} />;
    } else {
      return <LocationPage trip={route.trip} location={route.location} />;
    }
  }

  render() {
    const { isCreating } = this.state;
    const { toggleCreate } = this;
    const contextValue = { isCreating, toggleCreate };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}
