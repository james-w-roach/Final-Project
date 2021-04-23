import React from 'react';
import Header from '../components/header';
import HomeButtons from '../components/homeButtons';
import NavBar from '../components/navbar';

const token = process.env.MAPBOX_API_KEY;

export default function Home(props) {
  return (
    <>
      <img className="background-img" src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/12.4935,41.8279,9.94,0/375x692?access_token=${token}`} />
      <Header/>
      <div className="page-container">
        <HomeButtons />
      </div>
      <NavBar />
    </>
  );
}
