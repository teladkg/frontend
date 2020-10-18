import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import './login.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const Login = () => {

  const classes = useStyles();

  return (
    <>
      <Header />

      <div className="login_page">
        <div className="login_page_container">
          <h1>Войти</h1>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Пароль" variant="outlined" />
            <button id="login_page_button">Войти</button>
          </form>
          <Link to="/registration"><button id="login_page_login_button">Зарегистрироваться</button></Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Login;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));