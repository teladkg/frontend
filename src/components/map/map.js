import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';

import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
import Geocode from "react-geocode";

import './map.css';


const Map = () => {


  /* FOR AUTOCOMPLETE GROUP */
  const search_options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });


  const classes = useStyles();


  /* RESET BUTTON */
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };


  /* GOOGLE MAPS */
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCLhoRTvmMAP14kkJuL1BW9K03HuLpBytU"
  })
  Geocode.setApiKey("AIzaSyCLhoRTvmMAP14kkJuL1BW9K03HuLpBytU");
  Geocode.setLanguage("ru");
  Geocode.setRegion("ky-KG");
  Geocode.enableDebug();
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


  return (
    <>
      <Header />

      <section className="map_page">

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="map_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="map_page_breadcrumb_active" to="/map">Карта</Link>
          </LinkMaterial>
        </Breadcrumbs>      

        <h1 id="map_page_article1">Карта</h1>

        <div id="map_page_sort_group_reset">
          <Chip label="Сбросить" onDelete={handleDelete} />
        </div>

        <div className="map_page_search_group">
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: "49%" }}
            renderInput={(params) => <TextField {...params} label="Клиники" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: "49%" }}
            renderInput={(params) => <TextField {...params} label="Врачи" variant="outlined" />}
          />
        </div>

        <div id="map-container">
          <GoogleMap
            id="map"
            center={{lat: 42.867695, lng: 74.610897}}
            zoom={12}
          >
          </GoogleMap>
        </div>
        

      </section>
      
      <Footer />
    </>
  )
}

export default Map;


/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


/* DATA FOR AUTOCOMPLETE */
const top100Films = [
  { title: 'Клиники' },
  { title: 'Врачи' },
];


/* SOME STYLES */
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


/* FOR GOOGLE MAPS */
