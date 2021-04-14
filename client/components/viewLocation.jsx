import React from 'react';

export default class ViewLocation extends React.Component {
  render() {
    return <h1 onClick={this.props.toggleView()}>Hello World</h1>;
  }
}
