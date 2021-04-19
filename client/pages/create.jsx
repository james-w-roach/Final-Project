import React from 'react';
import CreateForm from '../components/createForm';
import Header from '../components/header';
import NavBar from '../components/navbar';

export default class Create extends React.Component {
  render() {
    return (
      <>
        <Header />
        <CreateForm />
        <NavBar />
      </>
    );
  }
}
