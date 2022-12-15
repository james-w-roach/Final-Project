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
      location: {},
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

    map.on('load', () => {
      if (!this.props.userId && this.props.guestTrip) {
        window.alert(`Your current guest itinerary, ${this.props.guestTrip.tripName}, will be deleted if you add another itinerary. Please create an account to save more than one trip.`)
      }
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
        .on('result', result => {
          document.activeElement.blur();
          this.setState({ inLocations: null, showFinish: false });
          let locationName;
          if (result.result['place_name_en-us']) {
            locationName = result.result['place_name_en-us'];
          } else {
            locationName = result.result['place_name_en-US'];
          }
          const lng = result.result.center[0];
          const lat = result.result.center[1];
          if (!this.state.locations[0]) {
            this.setState({
              location: {
                name: locationName,
                lat,
                lng,
                restaurants: [],
                poi: []
              },
              inLocations: false
            });
          } else {
            for (let i = 0; i < this.state.locations.length; i++) {
              if (this.state.locations[i].name === locationName) {
                this.setState({
                  location: {
                    name: locationName,
                    lat,
                    lng,
                    restaurants: [],
                    poi: []
                  },
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
                location: {
                  name: locationName,
                  lat,
                  lng,
                  restaurants: [],
                  poi: []
                },
                inLocations: false
              });
            }
          }
        })
    );
  }

  handleClick() {
    if (!this.state.location.name) {
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
      window.alert(`${this.state.location.name.split(',')[0]} has already been added.`);
    }
  }

  getButtonText() {
    if (!this.state.location.name) {
      return 'Search For a Location';
    } else if (!this.state.inLocations || this.state.inLocations === null) {
      return `Add ${this.state.location.name.split(',')[0]}`;
    } else {
      return `${this.state.location.name.split(',')[0]} Added!`;
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
    if (!this.state.locations[0]) {
      document.activeElement.blur();
      window.alert('Please add at least one location to your itinerary to continue.');
    } else {
      const trip = {
        tripName: this.state.tripName,
        locations: this.state.locations
      };
      this.props.onSubmit(trip);
    }
  }

  render() {
    let addClass;
    let finishClass;
    if (this.state.showFinish) {
      addClass = 'hidden';
      finishClass = 'finish button';
    } else if (!this.state.location.name) {
      addClass = 'add button init';
      finishClass = 'hidden';
    } else if (!this.state.inLocations) {
      addClass = 'add button not-in-locations';
      finishClass = 'hidden';
    } else {
      finishClass = 'finish hidden';
      addClass = 'add button added';
    }
    const deletionNotice = !this.props.userId && this.props.guestTrip
      ? <div className='deletion-notice'>
        <p>{`${this.props.guestTrip.tripName} will be deleted if you add another itinerary. Please create an account to save more than one trip.`}</p>
      </div>
      : null;
    return (
      <>
        <div className="map-box">
          <div ref={this.mapContainer} className="map-container" />
          <button onClick={this.handleClick} className={addClass}>{this.getButtonText()}</button>
        </div>
        <div className="map-form">
          {deletionNotice}
          <form onSubmit={this.handleLift} autoComplete="off">
            <input className="name" required="required" type="text" name="trip-name" placeholder="Itinerary Name" onChange={this.handleChange} />
            <input className={finishClass} type="submit" value="Finish Itinerary" />
          </form>
        </div>
      </>
    );
  }
}

export default Mapbox;
