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
      location: ''
    };
    this.mapContainer = React.createRef();
    this.handleAdd = this.handleAdd.bind(this);
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
          const locationName = result.result['place_name_en-US'];
          this.setState({ location: locationName });
        })
    );
  }

  handleAdd() {
    event.preventDefault();
    const newLocation = {
      lng: this.state.lng,
      lat: this.state.lat,
      location: this.state.location
    };
    this.props.onSubmit(newLocation);
  }

  render() {
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
        <form onSubmit={this.handleAdd}>
          <input type="submit" value={`Add ${this.state.location.split(',')[0]}`} />
        </form>
      </div>
    );
  }
}

export default Mapbox;
