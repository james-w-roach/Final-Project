import mapboxgl from 'mapbox-gl';
import React from 'react';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

export default class LocationMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.location.lng,
      lat: this.props.location.lat,
      zoom: 10
    };
    this.mapContainer = React.createRef();
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
  }

  render() {
    return <div ref={this.mapContainer} className="location-map" />;
  }
}
