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
              <li><Link to="/map">Карта</Link></li>
            </ul>
            
          </div>

          <div className={styles.icon_group}>
          <Link to="/registration"><svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M29.25 31.5C29.25 31.5 31.5 31.5 31.5 29.25C31.5 27 29.25 20.25 18 20.25C6.75 20.25 4.5 27 4.5 29.25C4.5 31.5 6.75 31.5 6.75 31.5H29.25ZM6.7995 29.25H29.2005C29.211 29.2488 29.2215 29.2473 29.232 29.2455L29.25 29.241C29.2478 28.6875 28.9035 27.0225 27.378 25.497C25.911 24.03 23.1503 22.5 18 22.5C12.8475 22.5 10.089 24.03 8.622 25.497C7.0965 27.0225 6.7545 28.6875 6.75 29.241C6.76647 29.2442 6.78297 29.2472 6.7995 29.25ZM18 15.75C19.1935 15.75 20.3381 15.2759 21.182 14.432C22.0259 13.5881 22.5 12.4435 22.5 11.25C22.5 10.0565 22.0259 8.91193 21.182 8.06802C20.3381 7.22411 19.1935 6.75 18 6.75C16.8065 6.75 15.6619 7.22411 14.818 8.06802C13.9741 8.91193 13.5 10.0565 13.5 11.25C13.5 12.4435 13.9741 13.5881 14.818 14.432C15.6619 15.2759 16.8065 15.75 18 15.75ZM24.75 11.25C24.75 13.0402 24.0388 14.7571 22.773 16.023C21.5071 17.2888 19.7902 18 18 18C16.2098 18 14.4929 17.2888 13.227 16.023C11.9612 14.7571 11.25 13.0402 11.25 11.25C11.25 9.45979 11.9612 7.7429 13.227 6.47703C14.4929 5.21116 16.2098 4.5 18 4.5C19.7902 4.5 21.5071 5.21116 22.773 6.47703C24.0388 7.7429 24.75 9.45979 24.75 11.25Z" fill="#2B2B2B"/>
          </svg></Link>

          </div>
        </div>
        
      </header>
      
    </>
  )
}

export default Header;
