import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';

import { load } from '@2gis/mapgl';

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

  useEffect(() => {
    let map;
    load().then((mapglAPI) => {
        // container — id of the div element in your html
        map = new mapglAPI.Map('map-container', {
            center: [74.59968, 42.85888],
            zoom: 13,
            key: 'ca6b71bc-b872-45c6-bec0-ebb977a1eaa4',
        });
    });

    // Destroy the map on unmounted
    return () => map && map.destroy();
  }, []);

  /* 2GIS MAP */
  const MapWrapper = React.memo(
    () => {
        return <div id="map-container" style={{ width: '100%', height: '100%'}}></div>;
    },
    () => true,
  );
  const [mapInstance, setMapInstance] = useState();

  return (
    <>
      <Header />

      <Breadcrumbs aria-label="breadcrumb">
        <LinkMaterial color="inherit" onClick={handleClick}>
          <Link id="map_page_breadcrumb_passive" to="/">Главная</Link>
        </LinkMaterial>
        <LinkMaterial
          color="textPrimary"
          onClick={handleClick}
          aria-current="page"
        >
          <Link id="map_page_breadcrumb_active" to="/clinic">Карта</Link>
        </LinkMaterial>
      </Breadcrumbs>      

      <h1 id="map_page_article1">Карта</h1>

      <div className="map_page_search_group">
        <Autocomplete
          id="grouped-demo"
          options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.title}
          style={{ width: 390 }}
          renderInput={(params) => <TextField {...params} label="Выберите тип сортировки" variant="outlined" />}
        />
      </div>

      <div id="map-cont" style={{ width: '100%', height: '600px', padding: "0 85px 50px"}}>
        <MapWrapper />
      </div>

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
  { title: 'Клиники', year: 1994 },
  { title: 'Врачи', year: 1972 },
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