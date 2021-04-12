import React from 'react';
import Home from './pages/home';
import Create from './pages/create';
import AppContext from '../server/app-context';
import Itinerary from './pages/itinerary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false,
      currentTripName: '',
      currentLocations: []
    };
    this.renderPage = this.renderPage.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
  }

  toggleCreate(trip) {
    if (trip) {
      const { tripName, locations } = trip;
      this.setState({
        currentTripName: tripName,
        currentLocations: locations
      });
    }
    if (this.state.isCreating) {
      this.setState({
        isCreating: null
      });
    } else {
      this.setState({
        isCreating: true
      });
    }
  }

  renderPage() {
    if (this.state.isCreating === false) {
      return <Home />;
    } if (this.state.isCreating) {
      return <Create toggleCreate={this.toggleCreate} />;
    } if (this.state.isCreating === null) {
      return <Itinerary tripName={this.state.currentTripName} locations={this.state.currentLocations} />;
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
