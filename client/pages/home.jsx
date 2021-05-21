import React from 'react';
import BackgroundMap from '../components/backgroundMap';
import HomeButtons from '../components/homeButtons';
import NavBar from '../components/navbar';

export default function Home(props) {
  return (
    <>
      <BackgroundMap />
      <div className="page-container">
        <HomeButtons />
      </div>
      <NavBar />
    </>
  );
}
