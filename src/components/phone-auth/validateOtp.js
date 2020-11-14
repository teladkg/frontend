import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../redux/auth/_services/firebase';
import { connect } from 'react-redux';
import { userActions } from '../../redux/auth/_actions'

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
import { toast, ToastContainer } from 'react-toastify';

const ValidateOtp = (props) => {

  useEffect(() => {
    // window.scrollTo(0, 0)
    firebase.auth().currentUser.getIdToken()
  });


  /* FOR PHONE INPUT */
  const [number, setNumber] = useState('');
  const handleNumber = (e) => {
    setNumber(e.target.value)
  }
  /* FOR OTP INPUT */
  const [otp, setOtp] = useState('');
  const handleOtp = (e) => {
    setOtp(e.target.value);
  }


  /* SOME STYLES */
  const classes = useStyles();


  /* FOR RECAPTCHA */
//   const setUpRecaptcha = () => {
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//       'size': 'invisible',
//       'callback': function(response) {
//         console.log("Captcha Resolved");
//         onSignInSubmit();
//       },
//       defaultCountry: "KGZ"
//     }
//     );
//   }


//   /* FOR FORM SUBMIT */
//   const onSignInSubmit = (e) => {
//     e.preventDefault();
//     setUpRecaptcha();
//     let phoneNumber = number;
//     let appVerifier = window.recaptchaVerifier;
//     firebase
//       .auth()
//       .signInWithPhoneNumber(phoneNumber, appVerifier)
//       .then(function (confirmationResult) {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         window.confirmationResult = confirmationResult;
//         alert("OTP is SENT!")

//         // let code = window.prompt("Enter OTP");
//         // confirmationResult
//         //   .confirm(code)
//         //   .then(function (result) {
//         //     // User signed in successfully.
//         //     let user = result.user;
//         //     // ...
//         //     console.log("User is signed in");
//         //   }).catch(function (error) {
//         //   // User couldn't sign in (bad verification code?)
//         //   // ...
//         //   });
//       })
//       .catch(function (error) {
//         // Error; SMS not sent
//         // ...
//       });
//   }


  /* FOR OTP VERIFICATION */
  const onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = otp;
    let otpConfirm = window.confirmationResult;
    // console.log(codee);
    otpConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        alert("Пользователь успешно вошел в систему!")
        // console.log("Result" + result.verificationID);
        let user = result.user;
        // console.log(firebase.auth().currentUser.uid);
        // toast.success('OTP Confirmed', {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      })
      .then(function () {
        firebase.auth().currentUser.getIdToken()
        .then((idtoken) => {
          localStorage.setItem('fireToken', idtoken);
          props.checkToken(idtoken);
          console.log(localStorage.getItem('userToken'));
          console.log(localStorage.getItem('fireToken'));
          props.history.push('/registration');
        })
        .catch((error) => {
          console.log("Firetoken error")
        });
      })
      .catch(function (error) {
        console.log(error);
        // alert("Неправильный код!");
      });
  };

  // const { fireToken } = firebase.auth().currentUser.uid;

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
          <h1>Подтвердить СМС</h1>

          {/* <form onSubmit={onSignInSubmit} className={classes.root} noValidate autoComplete="off">
            <div id="recaptcha-container"></div>
            <InputLabel htmlFor="formatted-text-mask-input">Номер телефона</InputLabel>
            <Input
              value={number}
              onChange={handleNumber}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
            />
            <button id="phone-auth_page_button">Получить код</button>
          </form> */}

          <form id="verificationform" onSubmit={onSubmitOtp} className={classes.root} noValidate autoComplete="off">
            <div id="recaptcha-container"></div>
            {/* <TextField onChange={handleOtp} id="outlined-password" label="Код подтверждения" variant="outlined" /> */}
            <InputLabel htmlFor="formatted-text-mask-input">СМС</InputLabel>
            <Input
              value={otp}
              onChange={handleOtp}
              name="textmask"
              id="formatted-text-mask-input"  
              inputComponent={TextMaskCustom}
            />
            <button id="phone-auth_page_button1">Подтвердить</button>
          </form>

          <Link to="/registration"><button id="phone-auth_page_registration_button">Зарегистрироваться</button></Link>
        </div>

      </section>

      <Footer />
    </>
  )
}

const mapStateToProps = state => {
  const { checking, checked } = state.checkToken;
  return { checking, checked }
}

const mapDispatchToProps = {
  checkToken: userActions.checkToken
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidateOtp);


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
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      // placeholderChar={'_'}
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