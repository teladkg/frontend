import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import './doctor.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { load } from '@2gis/mapgl';


const Doctor = () => {

  useEffect(() => {
    let map;
    load().then((mapglAPI) => {
        // container — id of the div element in your html
        map = new mapglAPI.Map('map-container-doctor', {
            center: [74.59968, 42.85888],
            zoom: 13,
            key: 'ca6b71bc-b872-45c6-bec0-ebb977a1eaa4',
        });
    });

    // Destroy the map on unmounted
    return () => map && map.destroy();
}, []);
  

  const MapWrapper = React.memo(
    () => {
        return <div id="map-container-doctor" style={{ width: '100%', height: '100%' }}></div>;
    },
    () => true,
  );
  const [mapInstance, setMapInstance] = useState();


  const search_options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });


  const classes = useStyles();


  return (
    <>
      <Header />

      <section className="doctor_page">

        <div className="doctor_page_main">
          <div className="doctor_page_main_left">
            <div id="doctor_page_main_left_avatargroup">
              <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="75" cy="75" r="74.5" stroke="#D7FBFF"/>
                <path d="M74.9989 69.2308C78.9926 69.2308 82.8966 68.0465 86.2172 65.8278C89.5378 63.609 92.1259 60.4554 93.6542 56.7657C95.1825 53.0761 95.5824 49.0161 94.8033 45.0991C94.0241 41.1822 92.101 37.5843 89.2771 34.7603C86.4531 31.9364 82.8552 30.0133 78.9383 29.2341C75.0214 28.455 70.9613 28.8549 67.2717 30.3832C63.582 31.9115 60.4284 34.4996 58.2097 37.8202C55.9909 41.1408 54.8066 45.0448 54.8066 49.0385C54.8066 54.3938 56.934 59.5298 60.7208 63.3166C64.5076 67.1034 69.6436 69.2308 74.9989 69.2308ZM74.9989 34.6154C77.8516 34.6154 80.6401 35.4613 83.012 37.0461C85.3838 38.6309 87.2325 40.8835 88.3241 43.519C89.4158 46.1545 89.7014 49.0545 89.1449 51.8523C88.5884 54.6501 87.2147 57.22 85.1976 59.2371C83.1805 61.2542 80.6106 62.6279 77.8128 63.1844C75.0149 63.7409 72.115 63.4553 69.4795 62.3637C66.844 61.272 64.5914 59.4234 63.0066 57.0515C61.4218 54.6796 60.5759 51.8911 60.5759 49.0385C60.5759 45.2132 62.0954 41.5447 64.8003 38.8398C67.5051 36.135 71.1737 34.6154 74.9989 34.6154Z" fill="#00C6DD"/>
                <path d="M77.8838 75H72.1146C63.699 75 55.6282 78.3431 49.6775 84.2937C43.7268 90.2444 40.3838 98.3152 40.3838 106.731C40.3838 107.496 40.6877 108.23 41.2287 108.771C41.7696 109.311 42.5034 109.615 43.2684 109.615H106.73C107.495 109.615 108.229 109.311 108.77 108.771C109.311 108.23 109.615 107.496 109.615 106.731C109.615 98.3152 106.272 90.2444 100.321 84.2937C94.3702 78.3431 86.2993 75 77.8838 75ZM46.3261 103.846C47.0354 97.5019 50.0574 91.6413 54.8146 87.3843C59.5718 83.1273 65.7307 80.7723 72.1146 80.7692H77.8838C84.2676 80.7723 90.4265 83.1273 95.1838 87.3843C99.941 91.6413 102.963 97.5019 103.672 103.846H46.3261Z" fill="#00C6DD"/>
              </svg>
              <p>Stars</p>
            </div>
            <div id="doctor_page_main_left_infogroup">
              <p id="doctor_page_main_left_infogroup_name">Короткий Игорь Валентинович</p>
              <p id="doctor_page_main_left_infogroup_specialty">Пластический хирург</p>
              <p id="doctor_page_main_left_infogroup_experience">Стаж 29 лет</p>
              <p id="doctor_page_main_left_infogroup_category">Врач высшей категории</p>
              <p id="doctor_page_main_left_infogroup_degree">Доктор медицинский наук</p>
              <p id="doctor_page_main_left_infogroup_phonetitle">Телефон для записи</p>
              <p id="doctor_page_main_left_infogroup_phone">+996 555 55 55 55</p>
            </div>
          </div>
          <div style={{ width: '40%', height: '500px' }}>
            <MapWrapper />
          </div>
          {/* <img id="doctor_page_main_right" src={require('../../content/images/profile-doctor/tiles4.png')} alt="doc map"/> */}
        </div>

        <div className="doctor_page_info">
          <div className="doctor_page_info_left">
            <h1>Информация о враче</h1>
            <p>Занимается диагностикой и лечением бронхиальной астмы, хронической обструктивной болезни лёгких (ХОБЛ), пневмонии, острого и хронического бронхита, апноэ, дыхательной недостаточности и других болезней дыхательных путей. </p>
          </div>
          <div className="doctor_page_info_right">
            <div id="doctor_page_info_right_receptiontype">
              <h6 id="doctor_page_info_right_receptiontype_title">Тип приема:</h6>
              <p>В клинике</p>
              <p>На дому</p>
              <p>Онлайн</p>
            </div>
            <div id="doctor_page_info_right_receptiondate">
              <h6 id="doctor_page_info_right_receptiondate_title">Дни приема:</h6>
              <p>ПН, СР, ЧТ  12:00 - 15:00</p>
              <p>ДОГОВОРНАЯ ДАТА</p>
              <p>ВТ, ПТ, СБ  09:00 - 12:00</p>
            </div>
          </div>
        </div>

        <div className="doctor_page_specialty">
          <div className="doctor_page_specialty_left">
            <h1>Специализация</h1>
            <ul>Диагностика и лечение следующих заболеваний:
              <li>бронхиальная астма:</li>
              <li>хроническая обструктивная болезнь лёгких (ХОБЛ);</li>
              <li>пневмония;</li>
              <li>легочный фиброз;</li>
              <li>дыхательная недостаточность;</li>
            </ul>
          </div>
          <div className="doctor_page_specialty_right">
            <div id="doctor_page_specialty_right_receptiontype">
              <h6 id="doctor_page_specialty_right_receptiontype_title">Тип приема:</h6>
              <p>В клинике</p>
              <p>На дому</p>
              <p>Онлайн</p>
              <button id="doctor_page_specialty_right_receptiontype_button">Записаться</button>
            </div>
            <div id="doctor_page_specialty_right_cost">
              <h6 id="doctor_page_specialty_right_cost_title">Стоимость:</h6>
              <p>600 сом</p>
              <p>700 сом</p>
              <p>500 сом</p>
            </div>
          </div>
        </div>

        <div className="doctor_page_certificates">
          <h1 id="doctor_page_certificates_title">Сертификаты</h1>
          <div className="doctor_page_certificates_items">
            <div id="doctor_page_certificates_items_1"></div>
            <div id="doctor_page_certificates_items_1"></div>
            <div id="doctor_page_certificates_items_1"></div>
          </div>
        </div>

      </section>

      <Footer />
    </>
  )
}

export default Doctor;

/* DATA FOR AUTOCOMPLETE */
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];

/* SOME STYLES */
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));