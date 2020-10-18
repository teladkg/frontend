import React from 'react';
import { Link } from 'react-router-dom';

import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_first_col}>
        <Link to="/"><p id={styles.logo_title}>Telad</p></Link>
        <p id={styles.copyrights}>Все права защищены 2020</p>
      </div>
      
      <div className={styles.footer_second_col}>
        <p id={styles.footer_second_col_title}>Пациенту</p>
        <ul className={styles.second_col_links}>
          <li><Link to="/search">Запись на прием</Link></li>
          <li><Link to="/search">Врачи</Link></li>
          <li><Link to="/clinics-search">Клиники</Link></li>
          <li><Link to="/map">Карта</Link></li>
          <li>Согласие на обработку персональных данных</li>
        </ul>
      </div>

      <div className={styles.footer_third_col}>
        <p id={styles.footer_third_col_title}>Врачу, клиниике</p>
        <ul className={styles.third_col_links}>
          <li>Личный кабинет</li>
          <li>Регистрация</li>
        </ul>
      </div>

      <div className={styles.footer_fourth_col}>
        <p id={styles.footer_fourth_col_title}>Сервис</p>
        <ul className={styles.fourth_col_links}>
          <li>О нас</li>
          <li>Контакты</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;