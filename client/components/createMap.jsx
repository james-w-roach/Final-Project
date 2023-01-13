import mapboxgl from 'mapbox-gl';
import React from 'react';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

export default class CreateMap extends React.Component {
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
    this.map = React.createRef();
  }

  handleClick = () => {
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

  getButtonText = () => {
    if (!this.state.location.name) {
      return 'Search For a Location';
    } else if (!this.state.inLocations || this.state.inLocations === null) {
      return `Add ${this.state.location.name.split(',')[0]}`;
    } else {
      return `${this.state.location.name.split(',')[0]} Added!`;
    }
  }

  handleChange = event => {
    const name = event.target.value;
    this.setState({
      tripName: name
    });
  }

  handleLift = () => {
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

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map.current = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    this.map.current.on('move', () => {
      this.setState({
        lng: this.map.current.getCenter().lng.toFixed(4),
        lat: this.map.current.getCenter().lat.toFixed(4),
        zoom: this.map.current.getZoom().toFixed(2)
      });
    });

    this.map.current.on('load', () => {
      if (!this.props.userId && this.props.guestTrip) {
        window.alert(`Your current guest itinerary, ${this.props.guestTrip.tripName}, will be deleted if you add another itinerary. Please create an account to save more than one trip.`)
      }
    });

    this.map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        flyTo: { speed: 1 }
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

  componentWillUnmount() {
    this.map.current.remove();
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
        {deletionNotice}
        <div className="map-box">
          <div ref={this.mapContainer} className="map-container" />
        </div>
        <button onClick={this.handleClick} className={addClass}>{this.getButtonText()}</button>
        <input className={finishClass} type="submit" value="Finish Itinerary" />
      </>
    );
  }
};
