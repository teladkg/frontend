import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import './about.css';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';

const About = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <section className="about_page">

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="about_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="about_page_breadcrumb_active" to="/about">О нас</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <h1 id="about_page_article">О нас</h1>

        <p id="about_page_p">
          Telad, это инновационная компания, которая концентрирует всех 
          специалистов в области медицины в одном портале.
          Помогает во время найти Вам подходящего врача. 
          Telad стремится заботиться о Вашем главном богатстве - здоровье.
        </p>

      </section>

      <Footer />
    </>
  )
}

export default About;


/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}