import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import firebase from '../../redux/auth/_services/firebase';

import Header from '../header/header';
import Footer from '../footer/footer';

import './phoneAuth.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const PhoneAuth = (props) => {

  useEffect(() => {
    // window.scrollTo(0, 0)
    // console.log(props);
  });
  let history = useHistory();


  /* FOR RADIO BUTTONS */
  const [value, setValue] = React.useState('doctor');
  const handleChange = (event) => {
    setValue(event.target.value);
    localStorage.setItem('clientType', value);
    // localStorage.removeItem('fireToken');
    // localStorage.removeItem('user');
    // localStorage.removeItem('userToken');
    // let token = localStorage.getItem('userToken');
    // console.log(token);
    console.log(localStorage);
    console.log(value);
  };


  /* FOR PHONE INPUT */
  const [number, setNumber] = useState('+996');
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
        alert("СМС ОТПРАВЛЕНО!");
        // return (<Redirect to="/validate-otp"/>);
        history.push('/validate-otp');
      })
      .catch((error) => {
        // Error; SMS not sent
        console.error(error);
        alert('Попробуйте заново');
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
            <Link id="phone-auth_page_breadcrumb_active" to="/phone-auth">Войти</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <div className="phone-auth_page_container">
          <h1>Войти</h1>
          <p id="status_title">Ваш статус на сайте:</p>
          <FormControl component="fieldset">
            <RadioGroup aria-label="client_type" name="client_type1" value={value} onChange={handleChange}>
              <FormControlLabel value="doctor" control={<Radio />} label="Гость" />
              <FormControlLabel value="client" control={<Radio />} label="Врач" />
            </RadioGroup>
          </FormControl>
          <form onSubmit={onSignInSubmit} className={classes.root} noValidate autoComplete="off">
            <div id="recaptcha-container"></div>
            {/* <InputLabel htmlFor="formatted-text-mask-input">Номер телефона</InputLabel>
            <Input
              placeholder="Enter your phone number"
              value={number}
              onChange={handleNumber}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
              
            /> */}
            <TextField 
              value={number}
              onChange={handleNumber}
              id="outlined-phone" 
              label="Номер" 
              variant="outlined" 
              inputProps={{ maxLength: 13 }}
              placeholder="+996(xxx)xxx-xxx"
            />
            <button disabled={number.length<13} id="phone-auth_page_button">Войти</button>
          </form>
          {/* <Link to="/registration"><button id="phone-auth_page_registration_button">Зарегистрироваться</button></Link> */}
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