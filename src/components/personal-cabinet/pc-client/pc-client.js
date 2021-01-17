import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { getDoctors, getDoctorById } from '../../../redux/actions/actions';

import Header from '../../header/header';
import Footer from '../../footer/footer';

import './pc-client.css';

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

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CircleArrow as ScrollUpButton} from "react-scroll-up-button";


const PCClient = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);


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


  return (
    <>
      <Header />

      <section className="personal_client_page">

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="personal_client_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="personal_client_page_breadcrumb_active" to="/pc-client">Мой кабинет</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <h1 id="personal_client_page_title">Избранное</h1>

        <div className="personal_client_page_main_right">
          <div className="personal_client_page_tabs_container">
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Врачи" {...a11yProps(0)} />
                  <Tab label="Клиники" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <div className="search_page_doctors_list">
                  {/* <div id="search_page_doctors_slide">
                    <div className="search_page_doctors_slide_imagegroup">
                    <img id="search_page_doctors_slide_image" src={require('../../../content/images/main/image_10.png')} alt="doctor pic"/>
                      <div className="search_page_doctors_slide_image_buttongroup">
                        <button id="search_page_doctors_slide_image_likebutton">
                          <svg width="29" height="26" viewBox="0 0 29 26" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.8899 4.13405C26.7267 1.7469 23.376 -0.206223 19.4785 0.930929C17.616 1.4689 15.9911 2.62258 14.8691 4.2035C13.7471 2.62258 12.1222 1.4689 10.2597 0.930929C6.35345 -0.188862 3.01144 1.7469 1.84824 4.13405C0.216298 7.47607 0.893382 11.2347 3.86213 15.3059C6.18852 18.4917 9.51318 21.7209 14.3396 25.4709C14.4921 25.5898 14.68 25.6544 14.8734 25.6544C15.0669 25.6544 15.2547 25.5898 15.4073 25.4709C20.225 21.7295 23.5583 18.5264 25.8847 15.3059C28.8448 11.2347 29.5219 7.47607 27.8899 4.13405Z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div id="search_page_doctors_slide_info">
                      <Link to={`/doctor/1`}><h3>Макеев Макей Макеевич</h3></Link>
                      <div className="search_page_doctors_slide_info_chipgroup">
                        <Chip label="Психолог"/>
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
                        </Collapse>
                      </div>             
                      <p id="search_page_doctors_slide_info_experience">Стаж: 20 лет</p>
                      <p id="search_page_doctors_slide_info_address">Городская больница №6, Чуй 127</p>
                      <div id="search_page_doctors_slide_info_lastblock">
                        <div id="search_page_doctors_slide_info_phonegroup">
                          <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2812 23.9375C11.263 23.9375 9.36686 23.4492 7.59277 22.4727L0 25.5L3.02734 17.9072C2.05078 16.1331 1.5625 14.237 1.5625 12.2188C1.5625 10.6237 1.87174 9.10596 2.49023 7.66553C3.10872 6.2251 3.94287 4.97998 4.99268 3.93018C6.04248 2.88037 7.2876 2.04622 8.72803 1.42773C10.1685 0.809245 11.6862 0.5 13.2812 0.5C14.8763 0.5 16.394 0.809245 17.8345 1.42773C19.2749 2.04622 20.52 2.88037 21.5698 3.93018C22.6196 4.97998 23.4538 6.2251 24.0723 7.66553C24.6908 9.10596 25 10.6237 25 12.2188C25 13.8138 24.6908 15.3315 24.0723 16.772C23.4538 18.2124 22.6196 19.4575 21.5698 20.5073C20.52 21.5571 19.2749 22.3913 17.8345 23.0098C16.394 23.6283 14.8763 23.9375 13.2812 23.9375ZM17.1875 14.5625H15.625L14.7461 15.3438C14.0137 15.1484 13.1144 14.5177 12.0483 13.4517C10.9823 12.3856 10.3516 11.4863 10.1562 10.7539L10.9375 9.875V8.3125C10.9375 8.03581 10.8398 7.75911 10.6445 7.48242C10.4492 7.20573 10.2336 7.00635 9.99756 6.88428C9.76156 6.76221 9.59473 6.75 9.49707 6.84766L8.34961 7.99512C7.71484 8.62988 7.62126 9.61865 8.06885 10.9614C8.51644 12.3042 9.37093 13.6063 10.6323 14.8677C11.8937 16.1291 13.1958 16.9836 14.5386 17.4312C15.8813 17.8787 16.8701 17.7852 17.5049 17.1504L18.6523 16.0029C18.75 15.9053 18.7378 15.7384 18.6157 15.5024C18.4937 15.2664 18.2943 15.0508 18.0176 14.8555C17.7409 14.6602 17.4642 14.5625 17.1875 14.5625Z" fill="#18C661"/>
                          </svg>
                          <p>+996 777 777 777</p>
                        </div>
                        <div id="search_page_doctors_slide_info_stargroup">
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.003 18.9828C12.3109 18.8065 12.6891 18.8065 12.997 18.9828L18.1996 21.9624C18.9626 22.3994 19.8776 21.7097 19.6676 20.8559L18.3254 15.3975C18.2335 15.0238 18.3642 14.6305 18.6615 14.3861L23.0883 10.748C23.7831 10.1771 23.4299 9.05073 22.5335 8.97868L16.6045 8.50208C16.2401 8.4728 15.9208 8.24707 15.7717 7.91339L13.4129 2.63679C13.0601 1.84758 11.9398 1.84759 11.587 2.63679L9.22835 7.91339C9.07919 8.24707 8.75986 8.4728 8.39553 8.50208L2.46649 8.97868C1.57013 9.05073 1.21695 10.1771 1.91169 10.748L6.33849 14.3861C6.63582 14.6305 6.76653 15.0238 6.67463 15.3975L5.33239 20.8559C5.12242 21.7097 6.03741 22.3994 6.80044 21.9624L12.003 18.9828Z" fill="#F2C94C"/>
                          </svg>
                          <p>3.5</p>
                        </div>
                      </div>            
                    </div>
                  </div> */}
                </div>                
              </TabPanel>
              <TabPanel value={value} index={1}>       
                <div className="clinics_page_clinics">         
                  {/* <div id="clinics_page_clinics_slide">
                    <div className="clinics_page_clinics_slide_imagegroup">
                      <img id="clinics_page_clinics_slide_image" src={require('../../../content/images/main/Frame_67.png')} alt="clinic pic"/>
                      <div className="clinics_page_clinics_slide_image_buttongroup">
                        <button id="clinics_page_clinics_slide_image_likebutton">
                          <svg width="29" height="26" viewBox="0 0 29 26" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.8899 4.13405C26.7267 1.7469 23.376 -0.206223 19.4785 0.930929C17.616 1.4689 15.9911 2.62258 14.8691 4.2035C13.7471 2.62258 12.1222 1.4689 10.2597 0.930929C6.35345 -0.188862 3.01144 1.7469 1.84824 4.13405C0.216298 7.47607 0.893382 11.2347 3.86213 15.3059C6.18852 18.4917 9.51318 21.7209 14.3396 25.4709C14.4921 25.5898 14.68 25.6544 14.8734 25.6544C15.0669 25.6544 15.2547 25.5898 15.4073 25.4709C20.225 21.7295 23.5583 18.5264 25.8847 15.3059C28.8448 11.2347 29.5219 7.47607 27.8899 4.13405Z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div id="clinics_page_clinics_slide_info">
                      <Link to="/clinic"><h3>МЕДИЦИНСКИЙ ЦЕНТР городской клиники Alanda</h3></Link>
                      <p id="clinics_page_clinics_slide_info_typeofclinic">Детская клиника</p>
                      <p id="clinics_page_clinics_slide_info_article">Медицинский центр «Alanda Clinic» -ооо многопрофильная клиника, которатттлтя работает в Астане и Караганде с 2ььь006 года. «Alanda Clinic» объединяет в сььебе поли...поли...поли...поли...поли...поли...пол</p>
                      <p id="clinics_page_clinics_slide_info_address">Бишкек , ул Чокморова, 154.</p>
                      <div id="clinics_page_clinics_slide_info_lastblock">
                        <div id="clinics_page_clinics_slide_info_phonegroup">
                          <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2812 23.9375C11.263 23.9375 9.36686 23.4492 7.59277 22.4727L0 25.5L3.02734 17.9072C2.05078 16.1331 1.5625 14.237 1.5625 12.2188C1.5625 10.6237 1.87174 9.10596 2.49023 7.66553C3.10872 6.2251 3.94287 4.97998 4.99268 3.93018C6.04248 2.88037 7.2876 2.04622 8.72803 1.42773C10.1685 0.809245 11.6862 0.5 13.2812 0.5C14.8763 0.5 16.394 0.809245 17.8345 1.42773C19.2749 2.04622 20.52 2.88037 21.5698 3.93018C22.6196 4.97998 23.4538 6.2251 24.0723 7.66553C24.6908 9.10596 25 10.6237 25 12.2188C25 13.8138 24.6908 15.3315 24.0723 16.772C23.4538 18.2124 22.6196 19.4575 21.5698 20.5073C20.52 21.5571 19.2749 22.3913 17.8345 23.0098C16.394 23.6283 14.8763 23.9375 13.2812 23.9375ZM17.1875 14.5625H15.625L14.7461 15.3438C14.0137 15.1484 13.1144 14.5177 12.0483 13.4517C10.9823 12.3856 10.3516 11.4863 10.1562 10.7539L10.9375 9.875V8.3125C10.9375 8.03581 10.8398 7.75911 10.6445 7.48242C10.4492 7.20573 10.2336 7.00635 9.99756 6.88428C9.76156 6.76221 9.59473 6.75 9.49707 6.84766L8.34961 7.99512C7.71484 8.62988 7.62126 9.61865 8.06885 10.9614C8.51644 12.3042 9.37093 13.6063 10.6323 14.8677C11.8937 16.1291 13.1958 16.9836 14.5386 17.4312C15.8813 17.8787 16.8701 17.7852 17.5049 17.1504L18.6523 16.0029C18.75 15.9053 18.7378 15.7384 18.6157 15.5024C18.4937 15.2664 18.2943 15.0508 18.0176 14.8555C17.7409 14.6602 17.4642 14.5625 17.1875 14.5625Z" fill="#18C661"/>
                          </svg>
                          <p>+996 777 77 77</p>
                        </div>
                        <div id="clinics_page_clinics_slide_info_stargroup">
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.003 18.9828C12.3109 18.8065 12.6891 18.8065 12.997 18.9828L18.1996 21.9624C18.9626 22.3994 19.8776 21.7097 19.6676 20.8559L18.3254 15.3975C18.2335 15.0238 18.3642 14.6305 18.6615 14.3861L23.0883 10.748C23.7831 10.1771 23.4299 9.05073 22.5335 8.97868L16.6045 8.50208C16.2401 8.4728 15.9208 8.24707 15.7717 7.91339L13.4129 2.63679C13.0601 1.84758 11.9398 1.84759 11.587 2.63679L9.22835 7.91339C9.07919 8.24707 8.75986 8.4728 8.39553 8.50208L2.46649 8.97868C1.57013 9.05073 1.21695 10.1771 1.91169 10.748L6.33849 14.3861C6.63582 14.6305 6.76653 15.0238 6.67463 15.3975L5.33239 20.8559C5.12242 21.7097 6.03741 22.3994 6.80044 21.9624L12.003 18.9828Z" fill="#F2C94C"/>
                          </svg>
                          <p>3.5</p>
                        </div>
                      </div>            
                    </div>
                  </div> */}
                </div>  
              </TabPanel>
            </div>
          </div>
        </div>
        
        <ScrollUpButton ShowAtPosition={350}/>

      </section>

      <Footer />
    </>
  )
}


export default PCClient;


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