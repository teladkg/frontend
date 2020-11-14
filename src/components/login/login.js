import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import './login.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const Login = () => {

  useEffect(() => {
    // window.scrollTo(0, 0)
  });


  const classes = useStyles();


  /* FOR RADIO BUTTONS */
  const [value, setValue] = React.useState('client');
  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <>
      <Header />

      <section className="login_page">

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="login_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="login_page_breadcrumb_active" to="/login">Войти</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <div className="login_page_container">
          <h1>Войти</h1>
          <p id="status_title">Ваш статус на сайте:</p>
          <FormControl component="fieldset">
            <RadioGroup aria-label="client_type" name="client_type1" value={value} onChange={handleChange}>
              <FormControlLabel value="client" control={<Radio />} label="Гость" />
              <FormControlLabel value="doctor" control={<Radio />} label="Врач" />
            </RadioGroup>
          </FormControl>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-phone" label="Номер телефона" variant="outlined" />
            <button id="login_page_button">Войти</button>
          </form>
          {/* <Link to="/registration"><button id="login_page_registration_button">Зарегистрироваться</button></Link> */}
        </div>

      </section>

      <Footer />
    </>
  )
}

export default Login;

/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


/* SOME STYLES */
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '100%',
    },
  },
}));