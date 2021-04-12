import mapboxgl from 'mapbox-gl';
import React from 'react';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -70.9,
      lat: 42.35,
      zoom: 9,
      location: '',
      inLocations: null,
      tripName: '',
      locations: [],
      showFinish: null
    };
    this.mapContainer = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.getButtonText = this.getButtonText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLift = this.handleLift.bind(this);
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
        .on('result', result => {
          this.setState({ inLocations: null, showFinish: false });
          const locationName = result.result['place_name_en-US'];
          if (!this.state.locations[0]) {
            this.setState({
              location: locationName,
              inLocations: false
            });
          } else {
            for (let i = 0; i < this.state.locations.length; i++) {
              if (this.state.locations[i] === locationName) {
                this.setState({
                  location: locationName,
                  inLocations: true
                }, () => setTimeout(() => {
                  this.setState({
                    showFinish: true
                  });
                }, 2000));
                break;
              }
            }
            if (!this.state.inLocations) {
              this.setState({
                location: locationName,
                inLocations: false
              });
            }
          }
        })
    );
  }

  handleClick() {
    if (!this.state.location) {
      return;
    }
    if (!this.state.inLocations) {
      const newLocation = this.state.location;
      this.setState({
        locations: this.state.locations.concat(newLocation),
        inLocations: true,
        showFinish: false
      }, () => setTimeout(() => {
        this.setState({
          showFinish: true
        });
      }, 2000));
    } else {
      window.alert(`${this.state.location.split(',')[0]} has already been added.`);
    }
  }

  getButtonText() {
    if (!this.state.location) {
      return 'Search for a location to add';
    } else if (!this.state.inLocations || this.state.inLocations === null) {
      return `Add ${this.state.location.split(',')[0]}`;
    } else {
      return `${this.state.location.split(',')[0]} Added!`;
    }
  }

  handleChange(event) {
    const name = event.target.value;
    this.setState({
      tripName: name
    });
  }

  handleLift() {
    event.preventDefault();
    const trip = {
      tripName: this.state.tripName,
      locations: this.state.locations
    };
    this.props.onSubmit(trip);
  }

  render() {
    let addClass;
    let finishClass;
    if (this.state.showFinish) {
      addClass = 'hidden';
      finishClass = 'finish button';
    } else if (!this.state.inLocations) {
      addClass = 'add button';
      finishClass = 'hidden';
    } else if (!this.state.location) {
      addClass = 'add button';
      finishClass = 'hidden';
    } else {
      finishClass = 'finish hidden';
      addClass = 'add button added';
    }
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
        <button onClick={this.handleClick} className={addClass}>{this.getButtonText()}</button>
        <form onSubmit={this.handleLift}>
          <input className="name" type="text" name="trip-name" placeholder="New Itinerary" onChange={this.handleChange} />
          <input className={finishClass} type="submit" value="Finish Itinerary" />
        </form>
      </div>
    );
  }
}

export default Mapbox;
