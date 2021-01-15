import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
import { ToastContainer } from 'react-toastify';

const ValidateOtp = (props) => {

  useEffect(() => {
    // window.scrollTo(0, 0)
    // firebase.auth().currentUser.getIdToken()
  });


  /* FOR OTP INPUT */
  const [otp, setOtp] = useState('');
  const handleOtp = (e) => {
    setOtp(e.target.value);
    console.log(otp);
  }


  /* SOME STYLES */
  const classes = useStyles();


  /* FOR OTP VERIFICATION */
  const onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = otp;
    let otpConfirm = window.confirmationResult;
    otpConfirm
      .confirm(otpInput)
        .then(() => {
          firebase.auth().currentUser.getIdToken()
          .then((idtoken) => {
            localStorage.setItem('fireToken', idtoken);
            let clientType = localStorage.getItem('clientType');
            
            props.checkToken(idtoken)
            .then(()=> {
              let userToken = localStorage.getItem('userToken');

              if (clientType === 'client') {
                if(userToken === 'false') {
                  props.registrateclient(idtoken);
                  alert('Клиент успешно зарегистрировался в системе');
                  props.history.push('/');
                } else {
                  alert('Клиент успешно вошел в систему');
                  props.history.push('/pc-client');
                }
              } 
              
              else if (clientType === 'doctor') {
                if(userToken === 'false') {
                  props.history.push('/registration');
                }
                else {
                  alert('Доктор успешно вошел в систему');
                  props.history.push('/pc-doctor/info');
                }            
              }

            })
            .catch((error) => {
              console.error(error);
            })
          })
          .catch((error) => {
            console.error(error);
            alert("Неправильный FireToken");
          });
        })
        .catch((error) => {
          console.error(error);
          alert("Неправильный код!");
        })
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
            <Link id="phone-auth_page_breadcrumb_active" to="/validate-otp">Подтверждение через телефон</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <div className="phone-auth_page_container">
          <h1 id="validate-title">Введите код из смс </h1>
          <p id="validate-article">Код подтверждения отправлен на указанный Вами номер </p>
          <h2 id="validate-number">{props.location.state.detail}</h2>
          <Link to="/phone-auth" id="validate-link">Изменить номер</Link>
          <form id="verificationform" onSubmit={onSubmitOtp} className={classes.root} noValidate autoComplete="off">
            {/* <InputLabel htmlFor="formatted-text-mask-input">СМС</InputLabel>
            <Input
              value={otp}
              onChange={handleOtp}
              name="textmask"
              id="formatted-text-mask-input"  
              inputComponent={TextMaskCustom}
              placeholder="XXXXXX"
            /> */}
            <TextField 
              value={otp}
              onChange={handleOtp} 
              id="outlined-password"
              label="Код подтверждения"
              variant="outlined"   
              inputProps={{ minLength:6, maxLength:6 }}
              placeholder="XXXXXX"
            />
            <button disabled={otp.length<6} id="phone-auth_page_button">Подтвердить</button>
          </form>

          <Link to="/phone-auth"><button id="phone-auth_page_registration_button">СМС не пришло</button></Link>
        </div>

      </section>

      <Footer />
    </>
  )
}

const mapStateToProps = state => {
  const { checking, checked } = state.checkToken;
  const { registering, registered } = state.registrateclient;
  return { checking, checked, registering, registered }
}

const mapDispatchToProps = {
  checkToken: userActions.checkToken,
  registrateclient: userActions.registrateclient
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ValidateOtp));
  


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