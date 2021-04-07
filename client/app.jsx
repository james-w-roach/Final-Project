import React from 'react';
import Home from './pages/home';
import Create from './pages/create';
import AppContext from '../server/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false
    };
    this.renderPage = this.renderPage.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
  }

  toggleCreate() {
    if (this.state.isCreating) {
      this.setState({
        isCreating: false
      });
    } else {
      this.setState({
        isCreating: true
      });
    }
  }

  renderPage() {
    if (!this.state.isCreating) {
      return <Home />;
    } if (this.state.isCreating) {
      return <Create />;
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
