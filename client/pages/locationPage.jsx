import React from 'react';
import ViewLocation from '../components/viewLocation';
import Header from '../components/header';
import AddPOI from '../components/addPOI';

export default class LocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'location'
    };
    this.changeComponent = this.changeComponent.bind(this);
    this.renderPAge = this.renderPage.bind(this);
  }

  changeComponent() {
    const { component } = this.state;
    if (component === 'location') {
      this.setState({ component: 'add' });
    } else {
      this.setState({ component: 'location' });
    }
  }

  renderPage() {
    const { component } = this.state;
    if (component === 'location') {
      return <ViewLocation location={this.props.location} />;
    } else {
      return <AddPOI location={this.props.location} />;
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
