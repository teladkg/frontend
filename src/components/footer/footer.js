import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './footer.module.css'

const Footer = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer_left_col}>
          <Link to="/">
            <h1 id={styles.footer_left_logo}>Telad</h1>
          </Link>
          <p id={styles.footer_left_col_title}>Поиск лучших врачей в вашем городе</p>
        </div>
        
        <div className={styles.footer_right_col}>
          <div className={styles.footer_second_col}>
            <p id={styles.footer_second_col_title}>Пациенту</p>
            <ul className={styles.second_col_links}>
              <li><Link to="/clinics-search">Клиники</Link></li>
              <li><Link to="/search">Врачи</Link></li>
              <li><Link to="/specialties">Специальности</Link></li>
            </ul>
          </div>

          <div className={styles.footer_third_col}>
            <p id={styles.footer_third_col_title}>Врачу</p>
            <ul className={styles.third_col_links}>
              { localStorage.getItem('userToken') && localStorage.getItem('userToken') !== 'false'
                ? localStorage.getItem('clientType') === 'doctor'
                  ? <li><Link to="/pc-doctor/info">Мой кабинет</Link></li> 
                  : <li><Link to="/pc-client">Мой кабинет</Link></li>
                : '' 
              }
              <Link to="/phone-auth"><li>Регистрация</li></Link>
              <Link to="/phone-auth"><li>Войти</li></Link>
            </ul>
          </div>

          <div className={styles.footer_fourth_col}>
            <p id={styles.footer_fourth_col_title}>Сервис</p>
            <ul className={styles.fourth_col_links}>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/map">Карта</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      <section className={styles.extra_footer}>
        <p>©Telad 2020</p>
        <Link to="/"><p>Договор публичной оферты</p></Link>
      </section>
    </>
  )
}

export default Footer;