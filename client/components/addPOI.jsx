import React from 'react';

const clientId = process.env.FS_CLIENT_ID;
const clientSecret = process.env.FS_CLIENT_SECRET;

export default class AddPOI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchResult: null,
      poi: []
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const input = event.target.value;
    this.setState({
      searchInput: input
    });
  }

  search() {
    event.preventDefault();
    const { lat, lng } = this.props.location;
    const ll = `${lat},${lng}`;
    const query = this.state.searchInput;
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&ll=${ll}&query=${query}&limit=25&v=20210417`)
      .then(res => res.json())
      .then(result => this.setState({ searchResult: result.response.venues }));
  }

  render() {
    let results;
    if (!this.state.searchResult) {
      results = <li className="trip-list-item">No places added yet</li>;
    } else {
      results = this.state.searchResult.map(result => {
        return (
          <li className="trip-list-item" key={result.id}>
            {result.name}
            {`${result.location.address}, ${result.location.city}, ${result.location.cc}`}
          </li>
        );
      });
    }
    return (
      <>
        <form className="poi-form" onSubmit={this.search}>
          <input className="trip-list-item search" required="required" type="text" name="trip-name" placeholder="Search for a place to go:" onChange={this.handleChange} />
          <input type="submit" className="poi-search" placeholder="Search for a place:" />
        </form>
        <ul className="results">{results}</ul>
        <button className="button add" onClick={() => this.props.changeComponent()}>Finish</button>
      </>
    );
  }
}
