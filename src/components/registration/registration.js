import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import './registration.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const Registration = () => {

  const classes = useStyles();

  return (
    <>
      <Header />

      <div className="registration_page">
        <div className="registration_page_container">
          <h1>Регистрация</h1>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Фамилия" variant="outlined" />
            <TextField id="outlined-basic" label="Имя" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Пароль" variant="outlined" />
            <TextField id="outlined-basic" label="Прикрепить документ" variant="outlined" />
            <p>* Документ удостоверяющий что вы врач</p>
            <button id="registration_page_button">Зарегистрироваться</button>
          </form>
          <Link to="/login"><button id="registration_page_login_button">Войти</button></Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Registration;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));