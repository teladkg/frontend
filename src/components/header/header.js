import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import styles from './header.module.css'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_nav}>
          <Link to="/"><p id={styles.logo_title}>Telad</p></Link>

          <div className={styles.nav_bar}>
            <ul className={styles.nav_items}>
              <li><Link to="/search">Запись на прием</Link></li>
              <li><Link to="/search">Врачи</Link></li>
              <li><Link to="/clinics-search">Клиники</Link></li>
              <li>Личный кабинет</li>
            </ul>
            
          </div>

          <div className={styles.icon_group}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.8131 29.7651L28.4824 29.4344L28.1304 29.7422C25.0938 32.3975 21.2468 33.8477 17.1737 33.8477C12.7192 33.8477 8.53362 32.1139 5.38371 28.964L5.03016 29.3175L5.38371 28.964C2.23373 25.8141 0.5 21.6285 0.5 17.1738C0.5 12.7191 2.23373 8.53357 5.38371 5.38358C8.53361 2.23366 12.7192 0.5 17.1738 0.5C21.6285 0.5 25.814 2.23373 28.9639 5.38365C32.1139 8.53365 33.8477 12.7191 33.8477 17.1738C33.8477 21.2469 32.3973 25.0939 29.7422 28.1305L29.4344 28.4825L29.765 28.8132L39.3028 38.351L39.3029 38.3512C39.4344 38.4825 39.5 38.6539 39.5 38.8269C39.5 38.9998 39.4344 39.1713 39.3028 39.3029C39.0398 39.5657 38.6137 39.5657 38.3509 39.3029L28.8131 29.7651ZM28.0121 6.33554L27.6585 6.68909L28.0121 6.33553C22.0355 0.359081 12.3121 0.359077 6.33567 6.33546L6.68922 6.68901L6.33566 6.33546C3.34759 9.32362 1.85328 13.2504 1.85328 17.1737C1.85328 21.098 3.34689 25.0232 6.33566 28.012C12.3122 33.9886 22.0356 33.9886 28.0121 28.012C33.9886 22.0354 33.9886 12.3122 28.0121 6.33554Z" fill="white" stroke="white"/>
            </svg>
          </div>
        </div>
        
      </header>
      
    </>
  )
}

export default Header;
