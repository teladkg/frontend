import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../../redux/auth/_actions';

import Header from '../../header/header';
import Footer from '../../footer/footer';

import './pc-doctor.css';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { makeStyles } from '@material-ui/core/styles';

import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
import Geocode from "react-geocode";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { CircleArrow as ScrollUpButton} from "react-scroll-up-button";


const PCDoctor = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getPCDoctor();
  }, []);
  

  /* GOOGLE MAPS */
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCLhoRTvmMAP14kkJuL1BW9K03HuLpBytU"
  })
  Geocode.setApiKey("AIzaSyCLhoRTvmMAP14kkJuL1BW9K03HuLpBytU");
  Geocode.setLanguage("ru");
  Geocode.setRegion("ky-KG");
  Geocode.enableDebug();


  /* FOR DOCTORS SHOW MORE BUTTON */
  const useStyles = makeStyles((theme) => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  /* FOR TABS */
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  /* FOR DOCTORS SLIDER */
  const customDoctorSlider = useRef();
  const doctorNext = () => {
    customDoctorSlider.current.slickNext();
  }
  const doctorPrevious = () => {
    customDoctorSlider.current.slickPrev();
  }
  const doctors_slider = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false
  };


  const [selected, setSelected] = useState(null);


  const userData = props.data;

  return (
    <>
      <Header />

      <section className="personal_doctor_page">

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="personal_doctor_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="personal_doctor_page_breadcrumb_active" to="/pc-doctor/info">Мой кабинет</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <h1 id="personal_doctor_page_title">Мой кабинет</h1>
        {
          userData && userData.user && 
          <div className="personal_doctor_page_main">
            <div className="personal_doctor_page_main_left">
              <div id="personal_doctor_page_doctors_data">
                <div className="personal_doctor_page_doctors_data_imagegroup">
                  <img id="personal_doctor_page_doctors_data_image" src={userData.user.avatar == null ? require('../../../content/images/main/image_10.png') : userData.user.avatar} alt="clinic pic"/>
                  <div className="personal_doctor_page_doctors_data_image_buttongroup">
                    <label id="personal_doctor_page_doctors_data_image_deletebutton_label">
                      <input type="button" id="personal_doctor_page_doctors_data_image_deletebutton" />
                      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.4375 2.3125H5.25C5.35313 2.3125 5.4375 2.22812 5.4375 2.125V2.3125H12.5625V2.125C12.5625 2.22812 12.6469 2.3125 12.75 2.3125H12.5625V4H14.25V2.125C14.25 1.29766 13.5773 0.625 12.75 0.625H5.25C4.42266 0.625 3.75 1.29766 3.75 2.125V4H5.4375V2.3125ZM17.25 4H0.75C0.335156 4 0 4.33516 0 4.75V5.5C0 5.60313 0.084375 5.6875 0.1875 5.6875H1.60312L2.18203 17.9453C2.21953 18.7445 2.88047 19.375 3.67969 19.375H14.3203C15.1219 19.375 15.7805 18.7469 15.818 17.9453L16.3969 5.6875H17.8125C17.9156 5.6875 18 5.60313 18 5.5V4.75C18 4.33516 17.6648 4 17.25 4ZM14.1398 17.6875H3.86016L3.29297 5.6875H14.707L14.1398 17.6875Z" fill="#00AFCA"/>
                      </svg>
                    </label>
                    <label id="personal_doctor_page_doctors_data_image_editbutton_label">
                      <input type="button" id="personal_doctor_page_doctors_data_image_editbutton" />
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5795 4.54667L17.6662 0.613334C17.4076 0.356044 17.0577 0.211609 16.6929 0.211609C16.3281 0.211609 15.9781 0.356044 15.7196 0.613334L1.84622 14.4667L0.57955 19.9333C0.535854 20.1332 0.537352 20.3402 0.583934 20.5394C0.630516 20.7386 0.721005 20.9249 0.848792 21.0846C0.976578 21.2443 1.13843 21.3735 1.32253 21.4627C1.50663 21.5518 1.70833 21.5988 1.91288 21.6C2.0082 21.6096 2.10424 21.6096 2.19955 21.6L7.72622 20.3333L21.5795 6.49333C21.8368 6.23474 21.9813 5.88479 21.9813 5.52C21.9813 5.15521 21.8368 4.80526 21.5795 4.54667ZM7.05955 19.1333L1.87955 20.22L3.05955 15.14L13.4396 4.8L17.4396 8.8L7.05955 19.1333ZM18.3329 7.83333L14.3329 3.83333L16.6529 1.52667L20.5862 5.52667L18.3329 7.83333Z" fill="#00AFCA"/>
                      </svg>
                    </label>
                  </div>
                </div>
                <div id="personal_doctor_page_doctors_data_info">
                  {/* <FormLabel component="legend">Фамилия</FormLabel> */}
                  <TextField value={userData.user.last_name} id="personal_doctor_page_doctors_data_info_lastname" label="Фамилия" variant="outlined" InputProps={{readOnly: true}}/> 
                  <TextField value={userData.user.first_name} id="personal_doctor_page_doctors_data_info_firstname" label="Имя" variant="outlined" InputProps={{readOnly: true}}/>
                  <TextField value={userData.user.patronymic} id="personal_doctor_page_doctors_data_info_patronymic" label="Отчество" variant="outlined" InputProps={{readOnly: true}}/> 
                
                  <div className="personal_doctor_page_doctors_data_info_chipgroup">
                    {
                      userData.specialty && userData.specialty.map(spec => {
                        return(
                          <Chip label={spec.name}/>
                        )
                      })
                    }
                  </div>                 
                  
                  <TextField value={userData.started_working} id="personal_doctor_page_doctors_data_info_experience" label="Год начала работы" variant="outlined" InputProps={{readOnly: true}}/> 
                  <TextField value={userData.user.extra_phones[0]} id="personal_doctor_page_doctors_data_info_phone" label="Дополнительный номер телефона" variant="outlined" InputProps={{readOnly: true}}/> 
                  {/* <button id="personal_doctor_page_doctors_data_addbutton">Добавить номер</button>     */}
                  <Link id="edit_link_button" to="/pc-doctor/edit"><button id="personal_doctor_page_doctors_data_editbutton">Редактировать</button></Link>
                </div>
              </div>
            </div>
            <div className="personal_doctor_page_main_right">
              <div className="personal_doctor_page_tabs_container">
                <div className={classes.root}>
                  <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                      <Tab label="О враче" {...a11yProps(0)} />
                      <Tab label="Карта" {...a11yProps(1)} />
                      <Tab label="Прием" {...a11yProps(2)} />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <div id="personal_doctor_page_tabs_about">
                      {userData.description===null ? <p>Информация отсутствует...</p> : userData.description}
                    </div>                 
                  </TabPanel>
                  <TabPanel value={value} index={1}>                  
                    <div id="personal_doctor_page_tabs_map-container">
                      <GoogleMap
                        id="map"
                        center={{lat: 42.867695, lng: 74.610897}}
                        zoom={12}
                      >
                        {userData.locations.map(elem => {
                          return(
                            <>
                              <Marker 
                                key={`${elem.latitude}-${elem.longitude}`} 
                                position={{ lat: elem.latitude, lng: elem.longitude }} 
                                onClick={() => {
                                  setSelected({lat: elem.latitude, lng: elem.longitude});
                                }}
                              />
                                {selected ? (
                                  <InfoWindow 
                                    position={{lat: selected.lat, lng: selected.lng}}
                                    onCloseClick={() => {
                                      setSelected(null);
                                    }}
                                  >
                                    <div>
                                      {/* <p>lat: {selected.lat}</p>
                                      <p>lng: {selected.lng}</p> */}
                                      <p>Адрес: {elem.address}</p>
                                    </div>
                                  </InfoWindow>) : null
                                }
                            </>
                          )
                        })}
                      </GoogleMap>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <div className="personal_doctor_page_tabs_reception">
                      <div className="personal_doctor_page_tabs_reception_type">
                        <p id="personal_doctor_page_tabs_reception_type_title">Тип приема</p>
                        <tbody className="personal_doctor_page_tabs_reception_type_cells">
                          <tr id="personal_doctor_page_tabs_reception_type_cells_titles">
                            <th>В клинике</th>
                            <th>На дому</th>
                            <th>Онлайн</th>
                          </tr>
                          <tr id="personal_doctor_page_tabs_reception_type_cells_cost">
                            {
                              userData.prices ?
                              <>
                                <td>{userData.prices.clinic} сом</td>
                                <td>{userData.prices.home} сом</td>
                                <td>{userData.prices.online} сом</td>
                              </>
                              : 
                              <>
                                <td>Не указано</td>
                                <td>Не указано</td>
                                <td>Не указано</td>
                              </>
                            }
                          </tr>
                        </tbody>
                      </div>
                      <div className="personal_doctor_page_tabs_reception_schedule">
                        <p id="personal_doctor_page_tabs_reception_schedule_title">График работы</p>
                        <tbody className="personal_doctor_page_tabs_reception_schedule_cells">
                          <tr id="personal_doctor_page_tabs_reception_schedule_cells_titles">
                            <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_1">ПН</th>
                            <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_2">ВТ</th>
                            <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_3">СР</th>
                            <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_4">ЧТ</th>
                            <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_5">ПТ</th>
                            <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_6">СБ</th>
                            <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_7">ВС</th>
                          </tr>
                          <tr id="personal_doctor_page_tabs_reception_schedule_cells_cost">
                            {
                              userData.schedules[0] &&
                              <>
                                <td>{(userData.schedules[0].monday!=="" || userData.schedules[0].monday === undefined) ? <p>{userData.schedules[0].monday}</p> : <p></p>}{(userData.schedules[0].monday!=="" || userData.schedules[0].monday === undefined) ? <label id="onClinic">В клинике</label> : <p></p>}</td>
                                <td>{(userData.schedules[0].tuesday!=="" || userData.schedules[0].tuesday === undefined) ? <p>{userData.schedules[0].tuesday}</p> : <p></p>}{(userData.schedules[0].tuesday!=="" || userData.schedules[0].tuesday === undefined) ? <label id="onClinic">В клинике</label> : <p></p>}</td>
                                <td>{(userData.schedules[0].wednesday!=="" || userData.schedules[0].wednesday === undefined) ? <p>{userData.schedules[0].wednesday}</p> : <p></p>}{(userData.schedules[0].wednesday!=="" || userData.schedules[0].wednesday === undefined) ? <label id="onClinic">В клинике</label> : <p></p>}</td>
                                <td>{(userData.schedules[0].thursday!=="" || userData.schedules[0].thursday === undefined) ? <p>{userData.schedules[0].thursday}</p> : <p></p>}{(userData.schedules[0].thursday!=="" || userData.schedules[0].thursday === undefined) ? <label id="onClinic">В клинике</label> : <p></p>}</td>
                                <td>{(userData.schedules[0].friday!=="" || userData.schedules[0].friday === undefined) ? <p>{userData.schedules[0].friday}</p> : <p></p>}{(userData.schedules[0].friday!=="" || userData.schedules[0].friday === undefined) ? <label id="onClinic">В клинике</label> : <p></p>}</td>
                                <td>{(userData.schedules[0].saturday!=="" || userData.schedules[0].saturday === undefined) ? <p>{userData.schedules[0].saturday}</p> : <p></p>}{(userData.schedules[0].saturday!=="" || userData.schedules[0].saturday === undefined) ? <label id="onClinic">В клинике</label> : <p></p>}</td>
                                <td>{(userData.schedules[0].sunday!=="" || userData.schedules[0].sunday === undefined) ? <p>{userData.schedules[0].sunday}</p> : <p></p>}{(userData.schedules[0].sunday!=="" || userData.schedules[0].sunday === undefined) ? <label id="onClinic">В клинике</label> : <p></p>}</td>
                              </>
                            }
                            
                          </tr>
                          <tr id="personal_doctor_page_tabs_reception_schedule_cells_cost">
                            {
                              userData.schedules[1] &&
                              <>
                                <td>{(userData.schedules[1].monday!=="" || userData.schedules[1].monday === undefined) ? <p>{userData.schedules[1].monday}</p> : <p></p>}{(userData.schedules[1].monday!=="" || userData.schedules[1].monday === undefined) ? <label id="onHome">На выезд</label> : <p></p>}</td>
                                <td>{(userData.schedules[1].tuesday!=="" || userData.schedules[1].tuesday === undefined) ? <p>{userData.schedules[1].tuesday}</p> : <p></p>}{(userData.schedules[1].tuesday!=="" || userData.schedules[1].tuesday === undefined) ? <label id="onHome">На выезд</label> : <p></p>}</td>
                                <td>{(userData.schedules[1].wednesday!=="" || userData.schedules[1].wednesday === undefined) ? <p>{userData.schedules[1].wednesday}</p> : <p></p>}{(userData.schedules[1].wednesday!=="" || userData.schedules[1].wednesday === undefined) ? <label id="onHome">На выезд</label> : <p></p>}</td>
                                <td>{(userData.schedules[1].thursday!=="" || userData.schedules[1].thursday === undefined) ? <p>{userData.schedules[1].thursday}</p> : <p></p>}{(userData.schedules[1].thursday!=="" || userData.schedules[1].thursday === undefined) ? <label id="onHome">На выезд</label> : <p></p>}</td>
                                <td>{(userData.schedules[1].friday!=="" || userData.schedules[1].friday === undefined) ? <p>{userData.schedules[1].friday}</p> : <p></p>}{(userData.schedules[1].friday!=="" || userData.schedules[1].friday === undefined) ? <label id="onHome">На выезд</label> : <p></p>}</td>
                                <td>{(userData.schedules[1].saturday!=="" || userData.schedules[1].saturday === undefined) ? <p>{userData.schedules[1].saturday}</p> : <p></p>}{(userData.schedules[1].saturday!=="" || userData.schedules[1].saturday === undefined) ? <label id="onHome">На выезд</label> : <p></p>}</td>
                                <td>{(userData.schedules[1].sunday!=="" || userData.schedules[1].sunday === undefined) ? <p>{userData.schedules[1].sunday}</p> : <p></p>}{(userData.schedules[1].sunday!=="" || userData.schedules[1].sunday === undefined) ? <label id="onHome">На выезд</label> : <p></p>}</td>
                              </>
                            }
                          </tr>
                          <tr id="personal_doctor_page_tabs_reception_schedule_cells_cost">
                            {
                              userData.schedules[2] &&
                              <>
                                <td>{(userData.schedules[2].monday!=="" || userData.schedules[2].monday === undefined) ? <p>{userData.schedules[2].monday}</p> : <p></p>}{(userData.schedules[2].monday!=="" || userData.schedules[2].monday === undefined) ? <label id="onLine">Онлайн</label> : <p></p>}</td>
                                <td>{(userData.schedules[2].tuesday!=="" || userData.schedules[2].tuesday === undefined) ? <p>{userData.schedules[2].tuesday}</p> : <p></p>}{(userData.schedules[2].tuesday!=="" || userData.schedules[2].tuesday === undefined) ? <label id="onLine">Онлайн</label> : <p></p>}</td>
                                <td>{(userData.schedules[2].wednesday!=="" || userData.schedules[2].wednesday === undefined) ? <p>{userData.schedules[2].wednesday}</p> : <p></p>}{(userData.schedules[2].wednesday!=="" || userData.schedules[2].wednesday === undefined) ? <label id="onLine">Онлайн</label> : <p></p>}</td>
                                <td>{(userData.schedules[2].thursday!=="" || userData.schedules[2].thursday === undefined) ? <p>{userData.schedules[2].thursday}</p> : <p></p>}{(userData.schedules[2].thursday!=="" || userData.schedules[2].thursday === undefined) ? <label id="onLine">Онлайн</label> : <p></p>}</td>
                                <td>{(userData.schedules[2].friday!=="" || userData.schedules[2].friday === undefined) ? <p>{userData.schedules[2].friday}</p> : <p></p>}{(userData.schedules[2].friday!=="" || userData.schedules[2].friday === undefined) ? <label id="onLine">Онлайн</label> : <p></p>}</td>
                                <td>{(userData.schedules[2].saturday!=="" || userData.schedules[2].saturday === undefined) ? <p>{userData.schedules[2].saturday}</p> : <p></p>}{(userData.schedules[2].saturday!=="" || userData.schedules[2].saturday === undefined) ? <label id="onLine">Онлайн</label> : <p></p>}</td>
                                <td>{(userData.schedules[2].sunday!=="" || userData.schedules[2].sunday === undefined) ? <p>{userData.schedules[2].sunday}</p> : <p></p>}{(userData.schedules[2].sunday!=="" || userData.schedules[2].sunday === undefined) ? <label id="onLine">Онлайн</label> : <p></p>}</td>
                              </>
                            }
                          </tr>
                        </tbody>
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </div>
            </div>
          </div>
        }

        <ScrollUpButton ShowAtPosition={350}/>

      </section>

      <Footer />
    </>
  )
}


const mapStateToProps = state => {
  const { loggingIn, loggedIn } = state.getPCDoctor;
  return { 
    loggingIn, 
    loggedIn, 
    data: state.getPCDoctor.data,
  }
}

const mapDispatchToProps = {
  getPCDoctor: userActions.getPCDoctor,
}


export default connect(mapStateToProps, mapDispatchToProps)(PCDoctor);


/* FOR TABS */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}