import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDoctors, getSpecialties, getCities, getClinics } from '../../redux/actions/actions';

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


const Map = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getDoctors();
    props.getClinics();
  }, []);
  

  /* FOR AUTOCOMPLETE GROUP */
  const search_options1 = props.clinics.results && props.clinics.results.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const search_options2 = props.data.results && props.data.results.map((option) => {
    const firstLetter = option.user.first_name[0].toUpperCase();
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
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCLhoRTvmMAP14kkJuL1BW9K03HuLpBytU"
  })
  Geocode.setApiKey("AIzaSyCLhoRTvmMAP14kkJuL1BW9K03HuLpBytU");
  Geocode.setLanguage("ru");
  Geocode.setRegion("ky-KG");
  Geocode.enableDebug();


  /* CONFIGURING MAP FILTERS */ 
  const [clinicFilter, setClinicFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');
  // FOR CLINICS FILTER
  const res1 = props.clinics.results && props.clinics.results.find(param => param.name === clinicFilter);
  const setFilterClinic = (event) => {
    setClinicFilter(event.target.textContent);
  };
  console.log(clinicFilter);
  console.log(res1);
  // FOR DOCTORS FILTER
  const res2 = props.data.results && props.data.results.find(param => param.user.first_name + " " + param.user.last_name === doctorFilter);
  const setFilterDoctor = (event) => {
    setDoctorFilter(event.target.textContent);
  };
  console.log(doctorFilter);
  console.log(res2);


  const doctors = props.data.results;
  const clinics = props.clinics.results;

  console.log(selectedDoc);
  console.log(selectedClinic);

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
            options={search_options1 && search_options1.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            style={{ width: "49%" }}
            renderInput={(params) => <TextField {...params} label="Клиники" variant="outlined" />}
            onChange={setFilterClinic}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options2 && search_options2.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.user.first_name + " " + option.user.last_name}
            style={{ width: "49%" }}
            renderInput={(params) => <TextField {...params} label="Врачи" variant="outlined" />}
            onChange={setFilterDoctor}
          />
        </div>

        <div id="map-container">
          {
            isLoaded ?
            <GoogleMap
              id="map"
              center={{lat: 42.867695, lng: 74.610897}}
              zoom={12}
            >
              {res2 && doctors &&
                doctors.find(el => el.user.first_name + " " + el.user.last_name === doctorFilter) 
                ? res2.locations.map(elem => {
                  return(
                    <>
                      <Marker 
                        key={`${elem.latitude}-${elem.longitude}`} 
                        position={{ lat: elem.latitude, lng: elem.longitude }} 
                        onClick={() => {
                          setSelectedDoc({
                            lat: elem.latitude, 
                            lng: elem.longitude, 
                            address: elem.address, 
                            first_name: res2.user.first_name, 
                            last_name: res2.user.last_name,
                            id: res2.id,
                          });
                        }}
                        icon={{ 
                          url: "/doctor.svg",
                          scaledSize: new window.google.maps.Size(35, 35),
                        }}
                      />
                        {selectedDoc ? (
                          <InfoWindow 
                            position={{lat: selectedDoc.lat, lng: selectedDoc.lng}}
                            onCloseClick={() => {
                              setSelectedDoc(null);
                            }}
                          >
                            <div className="doctor-infowindow-container">
                              <p id="doctor-title">{selectedDoc.first_name} {selectedDoc.last_name}</p>
                              <p id="doctor-address">Адрес: {selectedDoc.address}</p>
                              <div id="doctor_info_stargroup">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.003 18.9828C12.3109 18.8065 12.6891 18.8065 12.997 18.9828L18.1996 21.9624C18.9626 22.3994 19.8776 21.7097 19.6676 20.8559L18.3254 15.3975C18.2335 15.0238 18.3642 14.6305 18.6615 14.3861L23.0883 10.748C23.7831 10.1771 23.4299 9.05073 22.5335 8.97868L16.6045 8.50208C16.2401 8.4728 15.9208 8.24707 15.7717 7.91339L13.4129 2.63679C13.0601 1.84758 11.9398 1.84759 11.587 2.63679L9.22835 7.91339C9.07919 8.24707 8.75986 8.4728 8.39553 8.50208L2.46649 8.97868C1.57013 9.05073 1.21695 10.1771 1.91169 10.748L6.33849 14.3861C6.63582 14.6305 6.76653 15.0238 6.67463 15.3975L5.33239 20.8559C5.12242 21.7097 6.03741 22.3994 6.80044 21.9624L12.003 18.9828Z" fill="#F2C94C"/>
                                </svg>
                                <p>{res2.rate ? res2.rate/2 : res2.rate}</p>
                              </div>
                              <Link id="doctor-link" to={`/doctor/${selectedDoc.id}`}>Посмотреть детали</Link>
                            </div>
                          </InfoWindow>) : null
                        }
                    </>
                  )
                })
                : doctors && doctors.map(doctor =>
                  doctor.locations.map(elem => {
                    return(
                      <>
                        <Marker 
                          key={`${elem.latitude}-${elem.longitude}`} 
                          position={{ lat: elem.latitude, lng: elem.longitude }} 
                          onClick={() => {
                            setSelectedDoc({
                              lat: elem.latitude, 
                              lng: elem.longitude, 
                              address: elem.address, 
                              first_name: doctor.user.first_name, 
                              last_name: doctor.user.last_name,
                              id: doctor.id,
                            });
                          }}
                          icon={{ 
                            url: "/doctor.svg",
                            scaledSize: new window.google.maps.Size(35, 35),
                          }}
                        />
                          {selectedDoc ? (
                            <InfoWindow 
                              position={{lat: selectedDoc.lat, lng: selectedDoc.lng}}
                              onCloseClick={() => {
                                setSelectedDoc(null);
                              }}
                            >
                              <div className="doctor-infowindow-container">
                                <p id="doctor-title">{selectedDoc.first_name} {selectedDoc.last_name}</p>
                                <p id="doctor-address">Адрес: {selectedDoc.address}</p>
                                <div id="doctor_info_stargroup">
                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.003 18.9828C12.3109 18.8065 12.6891 18.8065 12.997 18.9828L18.1996 21.9624C18.9626 22.3994 19.8776 21.7097 19.6676 20.8559L18.3254 15.3975C18.2335 15.0238 18.3642 14.6305 18.6615 14.3861L23.0883 10.748C23.7831 10.1771 23.4299 9.05073 22.5335 8.97868L16.6045 8.50208C16.2401 8.4728 15.9208 8.24707 15.7717 7.91339L13.4129 2.63679C13.0601 1.84758 11.9398 1.84759 11.587 2.63679L9.22835 7.91339C9.07919 8.24707 8.75986 8.4728 8.39553 8.50208L2.46649 8.97868C1.57013 9.05073 1.21695 10.1771 1.91169 10.748L6.33849 14.3861C6.63582 14.6305 6.76653 15.0238 6.67463 15.3975L5.33239 20.8559C5.12242 21.7097 6.03741 22.3994 6.80044 21.9624L12.003 18.9828Z" fill="#F2C94C"/>
                                  </svg>
                                  <p>{doctor.rate ? doctor.rate/2 : doctor.rate}</p>
                                </div>
                                <Link id="doctor-link" to={`/doctor/${selectedDoc.id}`}>Посмотреть детали</Link>
                              </div>
                            </InfoWindow>) : null
                          }
                      </>
                    )
                  })
                )
              }
              { res1 && clinics &&
                clinics.find(el => el.name === clinicFilter) 
                ? 
                  <>
                    <Marker 
                      key={`${res1.latitude}-${res1.longitude}`} 
                      position={{ lat: res1.latitude, lng: res1.longitude }} 
                      onClick={() => {
                        setSelectedClinic({
                          lat: res1.latitude, 
                          lng: res1.longitude, 
                          name: res1.name, 
                          address: res1.address,
                          id: res1.id
                        });
                      }}
                      icon={{ 
                        url: "/location.svg",
                        scaledSize: new window.google.maps.Size(35, 35),
                      }}
                    />
                      {selectedClinic ? (
                        <InfoWindow 
                          position={{lat: selectedClinic.lat, lng: selectedClinic.lng}}
                          onCloseClick={() => {
                            setSelectedClinic(null);
                          }}
                        >
                          <div className="clinic-infowindow-container">
                            <p id="clinic-title">{selectedClinic.name}</p>
                            <p id="clinic-address">Адрес: {selectedClinic.address}</p>
                            <Link id="clinic-link" to={`/clinic/${selectedClinic.id}`}>Посмотреть детали</Link>
                          </div>
                        </InfoWindow>) : null
                      }
                  </>
                : clinics && clinics.map(elem => {            
                  return (
                    <>
                      <Marker 
                        key={`${elem.latitude}-${elem.longitude}`} 
                        position={{ lat: elem.latitude, lng: elem.longitude }} 
                        onClick={() => {
                          setSelectedClinic({
                            lat: elem.latitude, 
                            lng: elem.longitude, 
                            name: elem.name, 
                            address: elem.address,
                            id: elem.id
                          });
                        }}
                        icon={{ 
                          url: "/location.svg",
                          scaledSize: new window.google.maps.Size(35, 35),
                        }}
                      />
                        {selectedClinic ? (
                          <InfoWindow 
                            position={{lat: selectedClinic.lat, lng: selectedClinic.lng}}
                            onCloseClick={() => {
                              setSelectedClinic(null);
                            }}
                          >
                            <div className="clinic-infowindow-container">
                              <p id="clinic-title">{selectedClinic.name}</p>
                              <p id="clinic-address">Адрес: {selectedClinic.address}</p>
                              <div id="clinic_info_stargroup">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.003 18.9828C12.3109 18.8065 12.6891 18.8065 12.997 18.9828L18.1996 21.9624C18.9626 22.3994 19.8776 21.7097 19.6676 20.8559L18.3254 15.3975C18.2335 15.0238 18.3642 14.6305 18.6615 14.3861L23.0883 10.748C23.7831 10.1771 23.4299 9.05073 22.5335 8.97868L16.6045 8.50208C16.2401 8.4728 15.9208 8.24707 15.7717 7.91339L13.4129 2.63679C13.0601 1.84758 11.9398 1.84759 11.587 2.63679L9.22835 7.91339C9.07919 8.24707 8.75986 8.4728 8.39553 8.50208L2.46649 8.97868C1.57013 9.05073 1.21695 10.1771 1.91169 10.748L6.33849 14.3861C6.63582 14.6305 6.76653 15.0238 6.67463 15.3975L5.33239 20.8559C5.12242 21.7097 6.03741 22.3994 6.80044 21.9624L12.003 18.9828Z" fill="#F2C94C"/>
                                </svg>
                                <p>{elem.rate ? elem.rate/2 : elem.rate}</p>
                              </div>
                              <Link id="clinic-link" to={`/clinic/${selectedClinic.id}`}>Посмотреть детали</Link>
                            </div>
                          </InfoWindow>) : null
                        }
                    </>
                  )
                })
              }
            </GoogleMap>
            : <div>Map cannot be loaded right now, sorry.</div>
          }
          
        </div>
        

      </section>
      
      <Footer />
    </>
  )
}


const mapStateToProps = state => {
  return {
    data: state.getDoctors.data,
    specialties: state.getSpecialties.specialties,
    cities: state.getCities.cities,
    clinics: state.getClinics.clinics
  }
}

const mapDispatchToProps = {
  getDoctors,
  getSpecialties,
  getCities,
  getClinics
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);



/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


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