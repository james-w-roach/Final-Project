import React from 'react';
import CreateForm from '../components/createForm';
import NavBar from '../components/navbar';

export default class Create extends React.Component {
  render() {
    return (
      <>
        <div className="page">
          <div className="page-container">
            <CreateForm userId={this.props.userId} />
          </div>
          <NavBar />
        </div>
      </>
    );
  }
}
