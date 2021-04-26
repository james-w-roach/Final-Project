import React from 'react';
import Header from '../components/header';
import HomeButtons from '../components/homeButtons';
import NavBar from '../components/navbar';

export default function Home(props) {
  return (
    <>
      <Header/>
      <div className="page-container">
        <HomeButtons />
      </div>
      <NavBar />
    </>
  );
}
