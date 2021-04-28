import mapboxgl from 'mapbox-gl';
import React from 'react';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

export default class BackgroundMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [
        {
          lat: 41.3926,
          lng: 2.1409
        },
        {
          lat: 51.5275,
          lng: -0.0995
        },
        {
          lat: 40.6979,
          lng: -73.9797
        },
        {
          lat: 34.031,
          lng: -118.3241
        },
        {
          lat: 35.6693,
          lng: 139.7408
        },
        {
          lat: 48.8588,
          lng: 2.3470
        },
        {
          lat: -23.682,
          lng: -46.5956
        },
        {
          lat: -33.848,
          lng: 150.9320
        },
        {
          lat: 41.8987,
          lng: 12.5452
        },
        {
          lat: 45.5580,
          lng: -73.7230
        }
      ],
      zoom: 8
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const randomNumber = Math.floor(Math.random() * 10);
    const { lng, lat } = this.state.locations[randomNumber];
    const zoom = this.state.zoom;
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
    return (
      <div className="background-map">
        <div ref={this.mapContainer} className="map-container background" />
      </div>
    );
  }
}
