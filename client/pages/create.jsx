import React from 'react';
import CreateForm from '../components/createForm';
import Header from '../components/header';

export default class Create extends React.Component {
  render() {
    return (
      <>
        <Header />
        <CreateForm toggleCreate={this.props.toggleCreate} />
      </>
    );
  }
}
