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
      lng: -40,
      lat: 30,
      zoom: 2
    };
    this.mapContainer = React.createRef();
    this.map = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map.current = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
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

    this.map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        flyTo: { speed: 0.8 }
      })
        .on('result', result => {
          document.activeElement.blur();
          this.props.addLocation(result);
        })
    );
  }

  componentWillUnmount() {
    this.map.current.remove();
  }

  render() {
    let addClass;
    if (this.props.showFinish) {
      addClass = 'hidden';
    } else if (!this.props.location.name) {
      addClass = 'add button init';
    } else if (!this.props.inLocations) {
      addClass = 'add button not-in-locations';
    } else {
      addClass = 'add button added';
    }
    return (
      <>
        <div className="map-box">
          <div ref={this.mapContainer} className="map-container" />
        </div>
        <button onClick={() => this.props.handleClick()} className={addClass}>{this.props.getButtonText()}</button>
      </>
    );
  }
};
