import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  let history = useHistory();


  const [files, setFiles] = useState([]);
  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');


  let formData = new FormData();
  const { register, handleSubmit } = useForm();


  const onSubmit = (data, event) => {
    const idtoken = localStorage.getItem('fireToken');
    // const filesToSend = [];
    //   files.forEach((file) => {
    //     filesToSend.push({
    //       photo: file
    //     })
    //   })

    formData.append('idtoken', idtoken)
    formData.append('first_name', data.firstname);
    formData.append('last_name', data.lastname);
    formData.append('patronymic', data.patronymic);
    for (let i = 0; i < files.length; i++) {
      formData.append(`references[${i}][photo]`, files[i])
    }
    formData.append('email', data.email);

    
    if (formData.get('firstname')!== '' ) { 
      props.registration(formData); 
    }
    alert("Ваш запрос отправлен администратору сайта. Одобрение будет Вам отправлено на почту в течении 2 дней");
    history.push('/');

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };


  const setCertificateImage = e => {
    if (image === '') {
      let file = e.target.files[0];
      setFiles([...files, file]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage({
            image: reader.result
          })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } 
    else if (image1 === '') {
      let file = e.target.files[0];
      setFiles([...files, file]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage1({
            image: reader.result
          })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } 
    else if (image2 === '') {
      // setFiles(files.concat(e.target.files[0]));
      let file = e.target.files[0];
      setFiles([...files, file]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage2({
            image: reader.result
          })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }


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
          <form enctype="multipart/form-data" method="post" onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
            <TextField type="text" id="outlined-lastname" label="Фамилия" variant="outlined" name="lastname" inputRef={register({required: true, minLength: 1, maxLength: 30})}/>
            <TextField type="text" id="outlined-firstname" label="Имя" variant="outlined" name="firstname" inputRef={register({required: true, minLength: 1, maxLength: 30})}/>
            <TextField type="text" id="outlined-patronymic" label="Отчество" variant="outlined" name="patronymic" inputRef={register({maxLength: 30})}/>
            <TextField type="text" id="outlined-email" label="Email" variant="outlined" name="email" inputRef={register({maxLength: 254})}/>
            
            <p>*E-mail указывается для уведомления об активации аккаунта</p>

            <div className="img_inp_label">
              <input 
                type="file" 
                id='file' 
                onChange={setCertificateImage} 
                // accept="image/*" 
                // name="references" 
                // ref={register({required: true})} 
              />
              <label for='file'>Прикрепить документ</label>
            </div>

            <p>*Загрузите скан или фото профильного диплома, документа 
            о специализации или курсов повышения квалификации, 
            завершённых в течение последних 5 лет</p>
            <div className="add_rental_imgBlock">
              <img src={image.image} />
              <img src={image1.image} />
              <img src={image2.image} />
            </div>
            <button type="submit" id="registration_page_button">Зарегистрироваться</button>
          </form>

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