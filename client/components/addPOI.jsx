import React from 'react';

const clientId = process.env.FS_CLIENT_ID;
const clientSecret = process.env.FS_CLIENT_SECRET;

export default class AddPOI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
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
    const req = {
      qs: {
        client_id: clientId,
        client_secret: clientSecret,
        ll,
        query: this.state.searchInput,
        limit: 4
      }
    };
    fetch('https://api.foursquare.com/v2/venues/search', req)
      .then(res => res.json());
  }

  render() {
    return (
      <>
        <form onSubmit={this.search}>
          <input className="name" required="required" type="text" name="trip-name" placeholder="New Itinerary" onChange={this.handleChange} />
          <input type="submit" placeholder="Search for a place:" />
        </form>
      </>
    );
  }
}
