import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../redux/auth/_services/firebase';

import Header from '../header/header';
import Footer from '../footer/footer';

import './phoneAuth.css';

import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const PhoneAuth = (props) => {

  useEffect(() => {
    // window.scrollTo(0, 0)
    // console.log(props);
  });


  /* FOR PHONE INPUT */
  const [number, setNumber] = useState('');
  const handleNumber = (e) => {
    setNumber(e.target.value);
    console.log(number);
    console.log(number.length);
  }


  /* SOME STYLES */
  const classes = useStyles();


  /* FOR RECAPTCHA */
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function(response) {
        console.log("Captcha Resolved");
        onSignInSubmit();
      },
      defaultCountry: "KGZ"
    }
    );
  }


  /* FOR FORM SUBMIT */
  const onSignInSubmit = (e) => {
    e.preventDefault();
    setUpRecaptcha();
    let phoneNumber = number;
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("СМС ОТПРАВЛЕНО!")
        props.history.push('/validate-otp')

        // let code = window.prompt("Enter OTP");
        // confirmationResult
        //   .confirm(code)
        //   .then(function (result) {
        //     // User signed in successfully.
        //     let user = result.user;
        //     // ...
        //     console.log("User is signed in");
        //   }).catch(function (error) {
        //   // User couldn't sign in (bad verification code?)
        //   // ...
        //   });
      })
      .catch(function (error) {
        // Error; SMS not sent
        // ...
      });
  }


  return (
    <>
      <Header />

      <section className="phone-auth_page">

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="phone-auth_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="phone-auth_page_breadcrumb_active" to="/phone-auth">Регистрация через телефон</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <div className="phone-auth_page_container">
          <h1>Войти через телефон</h1>

          <form onSubmit={onSignInSubmit} className={classes.root} noValidate autoComplete="off">
            <div id="recaptcha-container"></div>
            <InputLabel htmlFor="formatted-text-mask-input">Номер телефона</InputLabel>
            <Input
              placeholder="Enter your phone number"
              value={number}
              onChange={handleNumber}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
              custo
            />
            <button disabled={number.length<15} id="phone-auth_page_button">Получить код</button>
          </form>
          <Link to="/registration"><button id="phone-auth_page_registration_button">Зарегистрироваться</button></Link>
        </div>

      </section>

      <Footer />
    </>
  )
}

export default PhoneAuth;


/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


/* FOR TEXT MASK */
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+', 9, 9, 6, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      placeholderChar={'_'}
      showMask
    />
  );
}
TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


/* SOME STYLES */
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '100%',
    },
  },
}));