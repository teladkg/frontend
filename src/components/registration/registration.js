import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import './registration.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';

const Registration = () => {

  const classes = useStyles();

  
  return (
    <>
      <Header />

      <section className="registration_page">

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="registration_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="registration_page_breadcrumb_active" to="/registration">Регистрация</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <div className="registration_page_container">
          <h1>Регистрация</h1>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Фамилия" variant="outlined" />
            <TextField id="outlined-basic" label="Имя" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Пароль" variant="outlined" />
            <button id="registration_page_attachbutton">Прикрепить документ</button>
            <p>*Загрузите скан или фото документа профильный диплом, 
            свидетельство или лицензию на оказываемые услуги</p>
            <button id="registration_page_button">Зарегистрироваться</button>
          </form>
          <Link to="/login"><button id="registration_page_login_button">Войти</button></Link>
        </div>
      
      </section>

      <Footer />
    </>
  )
}

export default Registration;


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