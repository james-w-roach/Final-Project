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
    this.map = React.createRef();
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
  }

  componentWillUnmount() {
    this.map.current.remove();
  }

  render() {
    return <div ref={this.mapContainer} className="location-map" />;
  }
}
