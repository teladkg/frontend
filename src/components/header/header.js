import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { userActions } from '../../redux/auth/_actions';

import './header.css'


const Header = (props) => {

  let history = useHistory();

  const handleLogout = () => {
    userActions.logout();
    history.push('/');
  }

  return (
    <>
      <header className="header">
        <div className="header_nav">
          <Link to="/">
            <svg width="101" height="28" viewBox="0 0 101 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.56 6.15995H0V1.19995H21.56V6.15995H14V26.96H7.56V6.15995Z" fill="white"/>
              <path d="M32.76 27.36C29.3734 27.36 26.6934 26.52 24.72 24.84C22.7734 23.16 21.8 20.7066 21.8 17.48C21.8 14.3866 22.64 11.9733 24.32 10.24C26.0267 8.47997 28.4934 7.59998 31.72 7.59998C34.68 7.59998 37 8.37331 38.68 9.91998C40.3601 11.4666 41.2001 13.5466 41.2001 16.16V19.56H27.76C28.0534 20.7866 28.72 21.6533 29.76 22.16C30.8 22.6666 32.2934 22.92 34.24 22.92C35.28 22.92 36.3334 22.8266 37.4001 22.64C38.4934 22.4533 39.4001 22.2133 40.1201 21.92V26.12C38.3067 26.9466 35.8534 27.36 32.76 27.36ZM35.6 15.84V15C35.6 12.9733 34.3734 11.96 31.92 11.96C30.4001 11.96 29.3201 12.2666 28.68 12.88C28.0667 13.4933 27.76 14.48 27.76 15.84H35.6Z" fill="white"/>
              <path d="M50.4401 27.36C48.3601 27.36 46.8668 26.9067 45.9601 26C45.0534 25.0933 44.6001 23.64 44.6001 21.64V0H51.0401V21C51.0401 21.6133 51.1601 22.04 51.4001 22.28C51.6401 22.4933 52.0268 22.6 52.5601 22.6C53.2801 22.6 53.9201 22.5067 54.4801 22.32V26.68C53.8401 26.92 53.2134 27.0933 52.6001 27.2C52.0134 27.3067 51.2934 27.36 50.4401 27.36Z" fill="white"/>
              <path d="M63.52 27.36C61.5734 27.36 59.96 26.8533 58.68 25.84C57.4267 24.8 56.8 23.32 56.8 21.4C56.8 19.4266 57.4667 17.8933 58.8 16.8C60.16 15.7066 62.1334 15.16 64.72 15.16H70.0001V14.72C70.0001 13.7333 69.6667 13.04 69 12.64C68.36 12.24 67.1734 12.04 65.44 12.04C63.28 12.04 61.16 12.3733 59.08 13.04V8.87997C60.04 8.50664 61.2 8.19998 62.56 7.95998C63.92 7.71998 65.32 7.59998 66.76 7.59998C69.7734 7.59998 72.0934 8.21331 73.7201 9.43998C75.3467 10.6666 76.1601 12.56 76.1601 15.12V26.96H70.5201L70.2001 25.36C68.7334 26.6933 66.5067 27.36 63.52 27.36ZM65.56 23.4C67.4801 23.4 68.9601 22.7866 70.0001 21.56V18.88H65.44C64.48 18.88 63.76 19.0666 63.28 19.44C62.8267 19.8133 62.6 20.3866 62.6 21.16C62.6 22.6533 63.5867 23.4 65.56 23.4Z" fill="white"/>
              <path d="M88.56 27.36C85.6534 27.36 83.4667 26.6533 82 25.24C80.5334 23.8 79.8 21.44 79.8 18.16C79.8 15.92 80.1867 14.0133 80.96 12.44C81.76 10.84 82.8534 9.64 84.24 8.84C85.6534 8.01333 87.28 7.6 89.12 7.6C90.96 7.6 92.5867 8.02667 94 8.88V0H100.44V26.96H94.8801L94.5201 25.36C93.72 26.0267 92.84 26.5333 91.88 26.88C90.92 27.2 89.8134 27.36 88.56 27.36ZM90.4 22.68C91.8134 22.68 93.0134 22.2 94 21.24V13.56C93.0934 12.7333 91.9334 12.32 90.5201 12.32C89.16 12.32 88.12 12.84 87.4 13.88C86.7067 14.8933 86.36 16.3333 86.36 18.2C86.36 19.9333 86.68 21.12 87.32 21.76C87.96 22.3733 88.9867 22.68 90.4 22.68Z" fill="white"/>
            </svg>
          </Link> 

          <div className="nav_bar">
            <ul className="nav_items">
              {localStorage.getItem('userToken') && localStorage.getItem('userToken') !== 'false' 
              ? <li><Link to="/pc-doctor/info">Мой кабинет</Link></li> 
              : ''}
              <li><Link to="/search">Врачи</Link></li>
              <li><Link to="/clinics-search">Клиники</Link></li>
              <li><Link to="/map">Карта</Link></li>
            </ul>
          </div>

          <div className="icon_group">
            <Link to="/search">
              <svg id="icon_group_first" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0625 18.6875C14.826 18.6875 18.6875 14.826 18.6875 10.0625C18.6875 5.29904 14.826 1.4375 10.0625 1.4375C5.29904 1.4375 1.4375 5.29904 1.4375 10.0625C1.4375 14.826 5.29904 18.6875 10.0625 18.6875Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.5312 16.5312L21.5625 21.5625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </Link>
            { !localStorage.getItem('userToken') || localStorage.getItem('userToken') === 'false' 
            ? <Link to="/phone-auth" title="Войти">
                {/* <svg id="icon_group_second" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.25 22C20.25 22 22 22 22 20.25C22 18.5 20.25 13.25 11.5 13.25C2.75 13.25 1 18.5 1 20.25C1 22 2.75 22 2.75 22H20.25ZM2.7885 20.25H20.2115C20.2197 20.249 20.2279 20.2479 20.236 20.2465L20.25 20.243C20.2483 19.8125 19.9805 18.5175 18.794 17.331C17.653 16.19 15.5057 15 11.5 15C7.4925 15 5.347 16.19 4.206 17.331C3.0195 18.5175 2.7535 19.8125 2.75 20.243C2.76281 20.2455 2.77564 20.2478 2.7885 20.25ZM11.5 9.75C12.4283 9.75 13.3185 9.38125 13.9749 8.72487C14.6313 8.0685 15 7.17826 15 6.25C15 5.32174 14.6313 4.4315 13.9749 3.77513C13.3185 3.11875 12.4283 2.75 11.5 2.75C10.5717 2.75 9.6815 3.11875 9.02513 3.77513C8.36875 4.4315 8 5.32174 8 6.25C8 7.17826 8.36875 8.0685 9.02513 8.72487C9.6815 9.38125 10.5717 9.75 11.5 9.75ZM16.75 6.25C16.75 7.64239 16.1969 8.97774 15.2123 9.96231C14.2277 10.9469 12.8924 11.5 11.5 11.5C10.1076 11.5 8.77226 10.9469 7.78769 9.96231C6.80312 8.97774 6.25 7.64239 6.25 6.25C6.25 4.85761 6.80312 3.52226 7.78769 2.53769C8.77226 1.55312 10.1076 1 11.5 1C12.8924 1 14.2277 1.55312 15.2123 2.53769C16.1969 3.52226 16.75 4.85761 16.75 6.25Z" fill="white"/>
                </svg> */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 17L11 12L16 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11 12H23" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link>
            : '' }
            
            { localStorage.getItem('userToken') && localStorage.getItem('userToken') !== 'false' 
            ? <button id="logout-button" title="Выйти" onClick={handleLogout}>
                {/* <img id="logout-button-icon" src={require('../../content/images/main/logout.svg')} alt="Выйти"/> */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 17L3 12L8 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 12H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            : '' }
          </div>
        </div>
      </header>
      
    </>
  )
}

export default Header;
