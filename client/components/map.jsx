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
      inLocalStorage: null
    };
    this.mapContainer = React.createRef();
    this.handleAdd = this.handleAdd.bind(this);
    this.setAddClass = this.setAddClass.bind(this);
    this.setAddValue = this.setAddValue.bind(this);
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
          this.setState({
            inLocalStorage: null
          });
          const locationName = result.result['place_name_en-US'];
          if (localStorage.getItem('locations')) {
            const localStorageParse = JSON.parse(localStorage.getItem('locations'));
            for (let i = 0; i < localStorageParse.length; i++) {
              if (localStorageParse[i].location === locationName) {
                this.setState({
                  location: locationName,
                  inLocalStorage: true
                });
              }
              if (this.state.inLocalStorage === null) {
                this.setState({
                  location: locationName,
                  inLocalStorage: false
                });
              }
            }
          } else {
            this.setState({
              location: locationName,
              inLocalStorage: false
            });
          }
        })
    );
  }

  handleAdd() {
    event.preventDefault();
    if (!this.state.inLocalStorage) {
      const newLocation = {
        lng: this.state.lng,
        lat: this.state.lat,
        location: this.state.location
      };
      this.props.onSubmit(newLocation);
      this.setState({
        inLocalStorage: true
      });
      this.setAddClass();
    } else {
      window.alert(`${this.state.location.split(',')[0]} has already been added.`);
      this.setAddClass();
    }
  }

  setAddClass() {
    if (!this.state.inLocalStorage || this.state.inLocalStorage === null) {
      return 'add-button not-added';
    } else {
      return 'add-button added';
    }
  }

  setAddValue() {
    if (!this.state.inLocalStorage || this.state.inLocalStorage === null) {
      return `Add ${this.state.location.split(',')[0]}`;
    } else {
      return `${this.state.location.split(',')[0]} Added!`;
    }
  }

  render() {
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
        <form onSubmit={this.handleAdd}>
          <input type="submit" className={this.setAddClass()} value={this.setAddValue()} />
        </form>
      </div>
    );
  }
}

export default Mapbox;
