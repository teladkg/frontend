import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { connect } from 'react-redux';
import { userActions } from '../../redux/auth/_actions'

import Header from '../header/header';
import Footer from '../footer/footer';

import './registration.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';

const Registration = (props) => {

  useEffect(() => {
    // window.scrollTo(0, 0)
  });


  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
    props.registration(data);
    alert("Пользователь успешно создан");
    props.history.push('/');
  };


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
          <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
            <TextField type="text" id="outlined-lastname" label="Фамилия" variant="outlined" name="lastname" inputRef={register({required: true, maxLength: 100})}/>
            <TextField type="text" id="outlined-firstname" label="Имя" variant="outlined" name="firstname" inputRef={register({required: true, maxLength: 80})}/>
            {/* <TextField type="text" id="outlined-patronymic" label="Отчество" variant="outlined" name="patronymic" inputRef={register({maxLength: 100})}/> */}
            <button id="registration_page_attachbutton">Прикрепить документ</button>
            <p>*Загрузите скан или фото документа профильный диплом, 
            свидетельство или лицензию на оказываемые услуги</p>
            <button  type="submit" id="registration_page_button">Зарегистрироваться</button>
          </form>

          <Link to="/login"><button id="registration_page_login_button">Войти</button></Link>
        </div>
      
      </section>

      <Footer />
    </>
  )
}


const mapStateToProps = state => {
  const { registering, registered } = state.registration;
  return { registering, registered }
}


const mapDispatchToProps = {
  registration: userActions.registration,
}


export default connect(mapStateToProps, mapDispatchToProps)(Registration);


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