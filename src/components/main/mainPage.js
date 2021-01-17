import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../redux/auth/_actions';
import { getDoctors, getSpecialties, getCities, getClinics } from '../../redux/actions/actions';

import Footer from '../footer/footer';

import './mainPage.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CircleArrow as ScrollUpButton} from "react-scroll-up-button";

import sanitizeHtml from 'sanitize-html';

const MainPage = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getDoctors();
    props.getSpecialties();
    props.getCities();
    props.getClinics();
  }, []);

  let history = useHistory();


  /* FOR MENU DROPDOWN */
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);


  /* FOR AUTOCOMPLETE GROUP */
  const search_options1 = props.specialties.results && props.specialties.results.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const search_options2 = props.cities && props.cities.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const search_options3 = radius.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });


  /* FOR SPECIALTIES SLIDER */
  const customSpecSlider = useRef();
  const specNext = () => {
    customSpecSlider.current.slickNext();
  }
  const specPrevious = () => {
    customSpecSlider.current.slickPrev();
  }
  const specialties_slider = {
    rows: 2,
    slidesPerRow: 4,
    arrows: false,
    // infinite: props.specialties.results > 8,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1470,
        settings: {
          slidesPerRow: 3,
        }
      },
      {
        breakpoint: 1135,
        settings: {
          slidesPerRow: 2,
        }
      },
      {
        breakpoint: 730,
        settings: {
          slidesPerRow: 1,
        }
      },
    ]
  };


  /* FOR CLINICS SLIDER */
  const customClinicSlider = useRef();
  const clinicNext = () => {
    customClinicSlider.current.slickNext();
  }
  const clinicPrevious = () => {
    customClinicSlider.current.slickPrev();
  }
  const clinics_slider = {
    // dots: true,
    // infinite: props.clinics.results && props.clinics.results > 3,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    variableWidth: true,
    // adaptiveHeight: true
    responsive: [
      {
        breakpoint: 1430,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          // dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          // dots: true
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          // initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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
    // infinite: props.data.results && props.data.results.length > 3,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    variableWidth: true, 
    // swipeToSlide: true,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1430,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          // dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          // dots: true
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          // initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


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


  /* FOR LOGOUT */ 
  const handleLogout = () => {
    userActions.logout();
    history.push('/');
  }


  /* MAINPAGE HEADER */ 
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  const doctors = props.data.results;
  // const doctorsFiltred = doctors && doctors.filter(doctor => doctor.rate>0 && doctor<6)
  const specialties = props.specialties.results;
  const clinics = props.clinics.results;
  console.log(doctors);
  // console.log(doctorsFiltred);


  return (
    <>
      <section className="search">
        <div className="main_header">
          <div className="main_header_nav">

            <Link to="/">
              <svg width="101" height="28" viewBox="0 0 101 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.56 6.15995H0V1.19995H21.56V6.15995H14V26.96H7.56V6.15995Z" fill="white"/>
                <path d="M32.76 27.36C29.3734 27.36 26.6934 26.52 24.72 24.84C22.7734 23.16 21.8 20.7066 21.8 17.48C21.8 14.3866 22.64 11.9733 24.32 10.24C26.0267 8.47997 28.4934 7.59998 31.72 7.59998C34.68 7.59998 37 8.37331 38.68 9.91998C40.3601 11.4666 41.2001 13.5466 41.2001 16.16V19.56H27.76C28.0534 20.7866 28.72 21.6533 29.76 22.16C30.8 22.6666 32.2934 22.92 34.24 22.92C35.28 22.92 36.3334 22.8266 37.4001 22.64C38.4934 22.4533 39.4001 22.2133 40.1201 21.92V26.12C38.3067 26.9466 35.8534 27.36 32.76 27.36ZM35.6 15.84V15C35.6 12.9733 34.3734 11.96 31.92 11.96C30.4001 11.96 29.3201 12.2666 28.68 12.88C28.0667 13.4933 27.76 14.48 27.76 15.84H35.6Z" fill="white"/>
                <path d="M50.4401 27.36C48.3601 27.36 46.8668 26.9067 45.9601 26C45.0534 25.0933 44.6001 23.64 44.6001 21.64V0H51.0401V21C51.0401 21.6133 51.1601 22.04 51.4001 22.28C51.6401 22.4933 52.0268 22.6 52.5601 22.6C53.2801 22.6 53.9201 22.5067 54.4801 22.32V26.68C53.8401 26.92 53.2134 27.0933 52.6001 27.2C52.0134 27.3067 51.2934 27.36 50.4401 27.36Z" fill="white"/>
                <path d="M63.52 27.36C61.5734 27.36 59.96 26.8533 58.68 25.84C57.4267 24.8 56.8 23.32 56.8 21.4C56.8 19.4266 57.4667 17.8933 58.8 16.8C60.16 15.7066 62.1334 15.16 64.72 15.16H70.0001V14.72C70.0001 13.7333 69.6667 13.04 69 12.64C68.36 12.24 67.1734 12.04 65.44 12.04C63.28 12.04 61.16 12.3733 59.08 13.04V8.87997C60.04 8.50664 61.2 8.19998 62.56 7.95998C63.92 7.71998 65.32 7.59998 66.76 7.59998C69.7734 7.59998 72.0934 8.21331 73.7201 9.43998C75.3467 10.6666 76.1601 12.56 76.1601 15.12V26.96H70.5201L70.2001 25.36C68.7334 26.6933 66.5067 27.36 63.52 27.36ZM65.56 23.4C67.4801 23.4 68.9601 22.7866 70.0001 21.56V18.88H65.44C64.48 18.88 63.76 19.0666 63.28 19.44C62.8267 19.8133 62.6 20.3866 62.6 21.16C62.6 22.6533 63.5867 23.4 65.56 23.4Z" fill="white"/>
                <path d="M88.56 27.36C85.6534 27.36 83.4667 26.6533 82 25.24C80.5334 23.8 79.8 21.44 79.8 18.16C79.8 15.92 80.1867 14.0133 80.96 12.44C81.76 10.84 82.8534 9.64 84.24 8.84C85.6534 8.01333 87.28 7.6 89.12 7.6C90.96 7.6 92.5867 8.02667 94 8.88V0H100.44V26.96H94.8801L94.5201 25.36C93.72 26.0267 92.84 26.5333 91.88 26.88C90.92 27.2 89.8134 27.36 88.56 27.36ZM90.4 22.68C91.8134 22.68 93.0134 22.2 94 21.24V13.56C93.0934 12.7333 91.9334 12.32 90.5201 12.32C89.16 12.32 88.12 12.84 87.4 13.88C86.7067 14.8933 86.36 16.3333 86.36 18.2C86.36 19.9333 86.68 21.12 87.32 21.76C87.96 22.3733 88.9867 22.68 90.4 22.68Z" fill="white"/>
              </svg>
            </Link> 

            <div className="main_header_nav_bar">
              <ul className={click ? "main_header_nav_items_mobile" : "main_header_nav_items"}>
                { localStorage.getItem('userToken') && localStorage.getItem('userToken') !== 'false' 
                  ? localStorage.getItem('clientType') === 'doctor'
                    ? <li onClick={closeMobileMenu}><Link to="/pc-doctor/info">Мой кабинет</Link></li> 
                    : <li onClick={closeMobileMenu}><Link to="/pc-client">Мой кабинет</Link></li>  
                  : ''
                }
                <li onClick={closeMobileMenu}><Link to="/search">Врачи</Link></li>
                <li onClick={closeMobileMenu}><Link to="/clinics-search">Клиники</Link></li>
                <li onClick={closeMobileMenu}><Link to="/map">Карта</Link></li>
                <div className="log-buttons-mobile">
                  { !localStorage.getItem('userToken') || localStorage.getItem('userToken') === 'false' 
                    ? 
                      <div id="login-reg-mobile">
                        <Link id="reg-mobile" to="/phone-auth" title="Зарегистрироваться">Зарегистрироваться</Link>
                        <Link id="login-mobile" to="/phone-auth" title="Войти">Войти</Link>
                      </div>
                    : '' 
                  }
                  { localStorage.getItem('userToken') && localStorage.getItem('userToken') !== 'false' 
                    ? <button id="logout-mobile" title="Выйти" onClick={handleLogout}>Выйти</button>
                    : '' 
                  }
                </div>
              </ul>
            </div>

            <div className="main_header_icon_group">
              <Link to="/search" onClick={closeMobileMenu}>
                <svg id="main_header_icon_group_first" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0625 18.6875C14.826 18.6875 18.6875 14.826 18.6875 10.0625C18.6875 5.29904 14.826 1.4375 10.0625 1.4375C5.29904 1.4375 1.4375 5.29904 1.4375 10.0625C1.4375 14.826 5.29904 18.6875 10.0625 18.6875Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.5312 16.5312L21.5625 21.5625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link>
              { !localStorage.getItem('userToken') || localStorage.getItem('userToken') === 'false' 
                ? 
                  <div>
                    <Button
                      ref={anchorRef}
                      aria-controls={open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                      title="Авторизация"
                    >
                      <svg id="main_header_icon_group_second" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 17L11 12L16 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11 12H23" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <Link to="/phone-auth" title="Зарегистрироваться"><MenuItem onClick={handleClose}>Зарегистрироваться</MenuItem></Link>
                                <Link to="/phone-auth" title="Войти"><MenuItem onClick={handleClose}>Войти</MenuItem></Link>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                : '' 
              }
              { localStorage.getItem('userToken') && localStorage.getItem('userToken') !== 'false'
                ? 
                  <button id="main_header_logout-button" title="Выйти" onClick={handleLogout}>
                    {/* <img id="main_header_logout-button-icon" src={require('../../content/images/main/logout.svg')} alt="Выйти"/> */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6 15L1 10L6 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1 10H13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                : '' 
              }
            </div>

            <div className="mobile-menu" onClick={handleClick}>
              {click ? (
                <svg id="x-mark" className="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              ) : (
                <svg id="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </div>

          </div>
        </div>
        <p id="search_title1">Найдите проверенного врача и запишитесь на приём</p>
        <div className="search_group">
          <Autocomplete
            id="grouped-demo"
            options={search_options1 && search_options1.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Врач, специальность" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options2 && search_options2.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Город" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options3 && search_options3.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Радиус" variant="outlined" />}
          />
          <Link to="/search"><button id="search_button">Найти</button></Link>
        </div>
      </section>

      <section className="search_group_mobile">
        <Autocomplete
          id="grouped-demo"
          options={search_options1 && search_options1.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          style={{ width: "26%" }}
          renderInput={(params) => <TextField {...params} label="Врач, специальность" variant="outlined" />}
        />
        <Autocomplete
          id="grouped-demo"
          options={search_options2 && search_options2.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          style={{ width: "26%" }}
          renderInput={(params) => <TextField {...params} label="Город" variant="outlined" />}
        />
        <Autocomplete
          id="grouped-demo"
          options={search_options3 && search_options3.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.title}
          style={{ width: "26%" }}
          renderInput={(params) => <TextField {...params} label="Радиус" variant="outlined" />}
        />
        <Link id="search_group_mobile_button_link" to="/search"><button id="search_group_mobile_button">Найти</button></Link>
      </section>

      <section className="specialties">
        <div className="specialties_titles">
          <p id="specialties_titles_1">Популярные специальности</p>
          <Link to="/specialties"><p id="specialties_titles_link">Все специализации</p></Link>
        </div>
        <Slider ref={customSpecSlider} {...specialties_slider}>
          {
            specialties &&
            specialties.map(specialty => {
              return(
                <Link id="specialties_slide-link" to={{pathname: '/search', state: {filterParam: specialty.name}}}>
                  <div id="specialties_slide">
                    <div id="specialties_slide_content">
                      <div id="specialties_slide_content_left">
                        <h3>{specialty.name}</h3>
                        <p>{specialty.doctors_count}</p>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.20477 5.95121C7.01192 5.95121 6.04492 6.91821 6.04492 8.11106C6.04492 9.30391 7.01192 10.2709 8.20477 10.2709C9.39761 10.2709 10.3646 9.30391 10.3646 8.11106C10.3646 6.91821 9.39761 5.95121 8.20477 5.95121ZM4.9668 8.11106C4.9668 6.32278 6.41649 4.87309 8.20477 4.87309C9.99305 4.87309 11.4427 6.32278 11.4427 8.11106C11.4427 9.89934 9.99305 11.349 8.20477 11.349C6.41648 11.349 4.9668 9.89934 4.9668 8.11106Z" fill="white"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.19028 11.9456C8.97863 11.9452 9.75935 12.1 10.4878 12.4013C11.2164 12.7027 11.8785 13.1447 12.4362 13.702C12.9939 14.2594 13.4364 14.9212 13.7382 15.6496C14.0401 16.378 14.1954 17.1587 14.1954 17.9472V18.4863H2.18872V17.9472C2.18872 16.3555 2.82103 14.829 3.94654 13.7034C5.07197 12.578 6.5987 11.9457 8.19028 11.9456C8.1904 11.9456 8.19017 11.9456 8.19028 11.9456ZM8.19028 12.4847V11.9456V12.4847ZM8.19028 13.0238C6.88451 13.0238 5.63221 13.5425 4.70889 14.4658C3.91352 15.2612 3.41839 16.3006 3.29643 17.4081H2.72778V17.9472H3.26685C3.26685 17.7662 3.27681 17.5863 3.29643 17.4081H13.0877C13.1074 17.5868 13.1173 17.7667 13.1173 17.9472H13.6564V17.4081H13.0877C13.0368 16.9464 12.9208 16.4932 12.7422 16.0623C12.4946 15.4648 12.1317 14.9219 11.6741 14.4646C11.2166 14.0074 10.6735 13.6448 10.0758 13.3976C9.47804 13.1504 8.83711 13.0233 8.19028 13.0238Z" fill="white"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8593 8.147C14.9562 8.147 14.2241 8.87909 14.2241 9.78216C14.2241 10.6852 14.9562 11.4173 15.8593 11.4173C16.7623 11.4173 17.4944 10.6852 17.4944 9.78216C17.4944 8.87909 16.7623 8.147 15.8593 8.147ZM13.146 9.78216C13.146 8.28366 14.3608 7.06888 15.8593 7.06888C17.3578 7.06888 18.5726 8.28366 18.5726 9.78216C18.5726 11.2807 17.3578 12.4954 15.8593 12.4954C14.3608 12.4954 13.146 11.2807 13.146 9.78216Z" fill="white"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8588 13.0094C16.5079 13.0079 17.1509 13.1345 17.7511 13.3818C18.3516 13.6292 18.8974 13.9927 19.3572 14.4513C19.817 14.91 20.1818 15.4549 20.4307 16.0548C20.6796 16.6546 20.8077 17.2977 20.8077 17.9472L20.8077 18.4863H15.2374V17.4081H19.6917C19.6463 17.0859 19.5601 16.7699 19.4349 16.468C19.2403 15.9991 18.9552 15.5732 18.5957 15.2146C18.2363 14.8561 17.8097 14.572 17.3404 14.3786C16.871 14.1852 16.3681 14.0863 15.8604 14.0875L15.8584 14.0875C15.2264 14.0867 14.6038 14.2415 14.0458 14.5383L13.5396 13.5864C14.2536 13.2066 15.0501 13.0085 15.8588 13.0094Z" fill="white"/>
                        </svg>
                      </div>              
                      <svg id="specialties_slide_content_right" width="11" height="21" viewBox="0 0 11 21" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.125 1.75L9.875 10.5L1.125 19.25"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </Slider>
        {/* {
          specialties && specialties.length > 8 && */}
          <div className="specialties_button_group">
            <button id="specialties_button_group_prev" onClick={specPrevious}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M41.6667 26C41.6667 25.4477 41.219 25 40.6667 25H16.1459L26.418 14.7279C26.7919 14.3541 26.8101 13.7538 26.4596 13.3579L26.4045 13.2957C26.0226 12.8643 25.3561 12.844 24.9487 13.2514L12.8655 25.3346C12.475 25.7251 12.475 26.3583 12.8655 26.7488L24.9487 38.8319C25.3561 39.2393 26.0226 39.2191 26.4045 38.7877L26.4596 38.7254C26.8101 38.3296 26.7919 37.7293 26.418 37.3554L16.1459 27.0833H40.6667C41.219 27.0833 41.6667 26.6356 41.6667 26.0833V26Z"/>
              </svg>
            </button>
            <button id="specialties_button_group_next" onClick={specNext}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33325 26C8.33325 25.4477 8.78097 25 9.33325 25H33.8541L23.582 14.7279C23.2081 14.3541 23.1899 13.7538 23.5404 13.3579L23.5955 13.2957C23.9774 12.8643 24.6439 12.844 25.0513 13.2514L37.1345 25.3346C37.525 25.7251 37.525 26.3583 37.1345 26.7488L25.0513 38.8319C24.6439 39.2393 23.9774 39.2191 23.5955 38.7877L23.5404 38.7254C23.1899 38.3296 23.2081 37.7293 23.582 37.3554L33.8541 27.0833H9.33325C8.78097 27.0833 8.33325 26.6356 8.33325 26.0833V26Z"/>
              </svg>
            </button>
          </div>
        {/* } */}
      </section>

      <section className="clinics">
        <div className="clinics_titles">
          <p id="clinics_titles_1">Лучшие клиники</p>
          <Link to="/clinics-search"><p id="clinics_titles_link">Все клиники</p></Link>
        </div>      
        {/* <div id="doctors_slider_container"> */}
        <Slider ref={customClinicSlider} {...clinics_slider}>
          {
            clinics &&
            clinics.map(clinic => {
              return( 
                <div id="clinics_slide">
                  <img id="clinics_slide_image" src={require('../../content/images/main/Frame_67.png')} alt="clinic pic"/>
                  <div id="clinics_slide_info">
                    <Link to={`/clinic/${clinic.id}`}><h3>{clinic.name}</h3></Link>
                    <p id="clinics_slide_info_typeofclinic">Детская клиника</p>
                    <p id="clinics_slide_info_article">{sanitizeHtml(clinic.description)}</p>
                    <p id="clinics_slide_info_address">{clinic.address}</p>
                    <div id="clinics_slide_info_lastblock">
                      <div id="clinics_slide_info_phonegroup">
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.2812 23.9375C11.263 23.9375 9.36686 23.4492 7.59277 22.4727L0 25.5L3.02734 17.9072C2.05078 16.1331 1.5625 14.237 1.5625 12.2188C1.5625 10.6237 1.87174 9.10596 2.49023 7.66553C3.10872 6.2251 3.94287 4.97998 4.99268 3.93018C6.04248 2.88037 7.2876 2.04622 8.72803 1.42773C10.1685 0.809245 11.6862 0.5 13.2812 0.5C14.8763 0.5 16.394 0.809245 17.8345 1.42773C19.2749 2.04622 20.52 2.88037 21.5698 3.93018C22.6196 4.97998 23.4538 6.2251 24.0723 7.66553C24.6908 9.10596 25 10.6237 25 12.2188C25 13.8138 24.6908 15.3315 24.0723 16.772C23.4538 18.2124 22.6196 19.4575 21.5698 20.5073C20.52 21.5571 19.2749 22.3913 17.8345 23.0098C16.394 23.6283 14.8763 23.9375 13.2812 23.9375ZM17.1875 14.5625H15.625L14.7461 15.3438C14.0137 15.1484 13.1144 14.5177 12.0483 13.4517C10.9823 12.3856 10.3516 11.4863 10.1562 10.7539L10.9375 9.875V8.3125C10.9375 8.03581 10.8398 7.75911 10.6445 7.48242C10.4492 7.20573 10.2336 7.00635 9.99756 6.88428C9.76156 6.76221 9.59473 6.75 9.49707 6.84766L8.34961 7.99512C7.71484 8.62988 7.62126 9.61865 8.06885 10.9614C8.51644 12.3042 9.37093 13.6063 10.6323 14.8677C11.8937 16.1291 13.1958 16.9836 14.5386 17.4312C15.8813 17.8787 16.8701 17.7852 17.5049 17.1504L18.6523 16.0029C18.75 15.9053 18.7378 15.7384 18.6157 15.5024C18.4937 15.2664 18.2943 15.0508 18.0176 14.8555C17.7409 14.6602 17.4642 14.5625 17.1875 14.5625Z" fill="#18C661"/>
                        </svg>
                        <p>{clinic.phone!=="" ? clinic.phone : "Нет данных"}</p>
                      </div>
                      <div id="clinics_slide_info_stargroup">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.003 18.9828C12.3109 18.8065 12.6891 18.8065 12.997 18.9828L18.1996 21.9624C18.9626 22.3994 19.8776 21.7097 19.6676 20.8559L18.3254 15.3975C18.2335 15.0238 18.3642 14.6305 18.6615 14.3861L23.0883 10.748C23.7831 10.1771 23.4299 9.05073 22.5335 8.97868L16.6045 8.50208C16.2401 8.4728 15.9208 8.24707 15.7717 7.91339L13.4129 2.63679C13.0601 1.84758 11.9398 1.84759 11.587 2.63679L9.22835 7.91339C9.07919 8.24707 8.75986 8.4728 8.39553 8.50208L2.46649 8.97868C1.57013 9.05073 1.21695 10.1771 1.91169 10.748L6.33849 14.3861C6.63582 14.6305 6.76653 15.0238 6.67463 15.3975L5.33239 20.8559C5.12242 21.7097 6.03741 22.3994 6.80044 21.9624L12.003 18.9828Z" fill="#F2C94C"/>
                        </svg>
                        <p>{clinic.rate ? clinic.rate/2 : clinic.rate}</p>
                      </div>
                    </div>            
                  </div>
                </div>
              )
            })
          }
        </Slider>
        {/* </div> */}
        {/* {
          clinics && clinics.length > 3 && */}
          <div className="clinics_button_group">
            <button id="clinics_button_group_prev" onClick={clinicPrevious}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M41.6667 26C41.6667 25.4477 41.219 25 40.6667 25H16.1459L26.418 14.7279C26.7919 14.3541 26.8101 13.7538 26.4596 13.3579L26.4045 13.2957C26.0226 12.8643 25.3561 12.844 24.9487 13.2514L12.8655 25.3346C12.475 25.7251 12.475 26.3583 12.8655 26.7488L24.9487 38.8319C25.3561 39.2393 26.0226 39.2191 26.4045 38.7877L26.4596 38.7254C26.8101 38.3296 26.7919 37.7293 26.418 37.3554L16.1459 27.0833H40.6667C41.219 27.0833 41.6667 26.6356 41.6667 26.0833V26Z"/>
              </svg>
            </button>
            <button id="clinics_button_group_next" onClick={clinicNext}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33325 26C8.33325 25.4477 8.78097 25 9.33325 25H33.8541L23.582 14.7279C23.2081 14.3541 23.1899 13.7538 23.5404 13.3579L23.5955 13.2957C23.9774 12.8643 24.6439 12.844 25.0513 13.2514L37.1345 25.3346C37.525 25.7251 37.525 26.3583 37.1345 26.7488L25.0513 38.8319C24.6439 39.2393 23.9774 39.2191 23.5955 38.7877L23.5404 38.7254C23.1899 38.3296 23.2081 37.7293 23.582 37.3554L33.8541 27.0833H9.33325C8.78097 27.0833 8.33325 26.6356 8.33325 26.0833V26Z"/>
              </svg>
            </button>
          </div>
        {/* } */}
      </section>

      <section className="doctors">
        <div className="doctors_titles">
          <p id="doctors_titles_1">Лучшие врачи</p>
          <Link to="/search"><p id="doctors_titles_link">Все врачи</p></Link>
        </div>
        {/* <div id="doctors_slider_container"> */}
          <Slider ref={customDoctorSlider} {...doctors_slider}>
            {
              doctors &&
              doctors.map(elem => {
                return(
                  <div id="doctors_slide">
                    <img id="doctors_slide_image" src={elem.user.avatar == null ? require('../../content/images/main/image_10.png') : elem.user.avatar} alt="clinic pic"/>
                    <div id="doctors_slide_info">
                      <Link to={`/doctor/${elem.id}`}><h3>{elem.user.last_name} {elem.user.first_name} {elem.user.patronymic}</h3></Link>
                      <div className="doctors_slide_info_chipgroup">
                        {/* <Chip label="Психолог"/>
                        <Chip label="Психолог"/>
                        <Chip label="Психолог"/>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                          })}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <Chip label="Психолог"/>
                          <Chip label="Психолог"/>
                          <Chip label="Психолог"/>
                        </Collapse> */}
                        {
                          elem.specialty.length === 0
                          ? <p id="search_page_doctors_slide_info_specialties">Специализация: отсутствует</p>
                            : elem.specialty.map(spec => {
                              return(
                                <Chip label={spec.name}/>
                              )
                            })
                        }
                      </div>         
                      {elem.experience !== null    
                        ? <p id="doctors_slide_info_experience">Стаж: {elem.experience} лет</p>
                        : <p id="doctors_slide_info_experience">Стаж: отсутствует</p>
                      }
                      {elem.locations.length !== 0 && elem.locations[0].address
                        ? <p id="doctors_slide_info_address">{elem.locations[0].address}</p>
                        : <p id="doctors_slide_info_address">Адрес отсутствует</p>
                      }
                      <div id="doctors_slide_info_lastblock">
                        <div id="doctors_slide_info_phonegroup">
                          <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2812 23.9375C11.263 23.9375 9.36686 23.4492 7.59277 22.4727L0 25.5L3.02734 17.9072C2.05078 16.1331 1.5625 14.237 1.5625 12.2188C1.5625 10.6237 1.87174 9.10596 2.49023 7.66553C3.10872 6.2251 3.94287 4.97998 4.99268 3.93018C6.04248 2.88037 7.2876 2.04622 8.72803 1.42773C10.1685 0.809245 11.6862 0.5 13.2812 0.5C14.8763 0.5 16.394 0.809245 17.8345 1.42773C19.2749 2.04622 20.52 2.88037 21.5698 3.93018C22.6196 4.97998 23.4538 6.2251 24.0723 7.66553C24.6908 9.10596 25 10.6237 25 12.2188C25 13.8138 24.6908 15.3315 24.0723 16.772C23.4538 18.2124 22.6196 19.4575 21.5698 20.5073C20.52 21.5571 19.2749 22.3913 17.8345 23.0098C16.394 23.6283 14.8763 23.9375 13.2812 23.9375ZM17.1875 14.5625H15.625L14.7461 15.3438C14.0137 15.1484 13.1144 14.5177 12.0483 13.4517C10.9823 12.3856 10.3516 11.4863 10.1562 10.7539L10.9375 9.875V8.3125C10.9375 8.03581 10.8398 7.75911 10.6445 7.48242C10.4492 7.20573 10.2336 7.00635 9.99756 6.88428C9.76156 6.76221 9.59473 6.75 9.49707 6.84766L8.34961 7.99512C7.71484 8.62988 7.62126 9.61865 8.06885 10.9614C8.51644 12.3042 9.37093 13.6063 10.6323 14.8677C11.8937 16.1291 13.1958 16.9836 14.5386 17.4312C15.8813 17.8787 16.8701 17.7852 17.5049 17.1504L18.6523 16.0029C18.75 15.9053 18.7378 15.7384 18.6157 15.5024C18.4937 15.2664 18.2943 15.0508 18.0176 14.8555C17.7409 14.6602 17.4642 14.5625 17.1875 14.5625Z" fill="#18C661"/>
                          </svg>
                          <p>{elem.user.phone}</p>
                        </div>
                        <div id="doctors_slide_info_stargroup">
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.003 18.9828C12.3109 18.8065 12.6891 18.8065 12.997 18.9828L18.1996 21.9624C18.9626 22.3994 19.8776 21.7097 19.6676 20.8559L18.3254 15.3975C18.2335 15.0238 18.3642 14.6305 18.6615 14.3861L23.0883 10.748C23.7831 10.1771 23.4299 9.05073 22.5335 8.97868L16.6045 8.50208C16.2401 8.4728 15.9208 8.24707 15.7717 7.91339L13.4129 2.63679C13.0601 1.84758 11.9398 1.84759 11.587 2.63679L9.22835 7.91339C9.07919 8.24707 8.75986 8.4728 8.39553 8.50208L2.46649 8.97868C1.57013 9.05073 1.21695 10.1771 1.91169 10.748L6.33849 14.3861C6.63582 14.6305 6.76653 15.0238 6.67463 15.3975L5.33239 20.8559C5.12242 21.7097 6.03741 22.3994 6.80044 21.9624L12.003 18.9828Z" fill="#F2C94C"/>
                          </svg>
                          <p>{elem.rate ? elem.rate/2 : elem.rate}</p>
                        </div>
                      </div>            
                    </div>
                  </div>
                )
              })
            }
          </Slider>
        {/* </div> */}
        
        {/* {
          doctors && doctors.length > 3 && */}
          <div className="doctors_button_group">
            <button id="doctors_button_group_prev" onClick={doctorPrevious}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M41.6667 26C41.6667 25.4477 41.219 25 40.6667 25H16.1459L26.418 14.7279C26.7919 14.3541 26.8101 13.7538 26.4596 13.3579L26.4045 13.2957C26.0226 12.8643 25.3561 12.844 24.9487 13.2514L12.8655 25.3346C12.475 25.7251 12.475 26.3583 12.8655 26.7488L24.9487 38.8319C25.3561 39.2393 26.0226 39.2191 26.4045 38.7877L26.4596 38.7254C26.8101 38.3296 26.7919 37.7293 26.418 37.3554L16.1459 27.0833H40.6667C41.219 27.0833 41.6667 26.6356 41.6667 26.0833V26Z"/>
              </svg>
            </button>
            <button id="doctors_button_group_next" onClick={doctorNext}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33325 26C8.33325 25.4477 8.78097 25 9.33325 25H33.8541L23.582 14.7279C23.2081 14.3541 23.1899 13.7538 23.5404 13.3579L23.5955 13.2957C23.9774 12.8643 24.6439 12.844 25.0513 13.2514L37.1345 25.3346C37.525 25.7251 37.525 26.3583 37.1345 26.7488L25.0513 38.8319C24.6439 39.2393 23.9774 39.2191 23.5955 38.7877L23.5404 38.7254C23.1899 38.3296 23.2081 37.7293 23.582 37.3554L33.8541 27.0833H9.33325C8.78097 27.0833 8.33325 26.6356 8.33325 26.0833V26Z"/>
              </svg>
            </button>
          </div>
        {/* } */}
        
      </section>

      <ScrollUpButton ShowAtPosition={350}/>

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


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);


/* DATA FOR AUTOCOMPLETE */
const radius = [
  { title: '500 м', id: 1 },
  { title: '1 км', id: 2 },
  { title: '3 км', id: 3 },
  { title: '5 км', id: 4 },
  { title: '10 км', id: 5 },
];