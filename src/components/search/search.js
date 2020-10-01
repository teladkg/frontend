import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Footer from '../footer/footer';

import styles from './search.module.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


const Search = (props) => {

  /* FOR AUTOCOMPLETE GROUP */
  const search_options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  /* FOR BUTTON GROUP */
  const [alignment, setAlignment] = React.useState('left');
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const classes = useStyles();

  /* SORT BY FAMOUS */
  const [sort, setSort] = useState({
    age: '',
    name: 'hai'
  });
  const handleSort = (event) => {
    const name = event.target.name;
    setSort({
      ...sort,
      [name]: event.target.value,
    });
  };

  /* SORT BY DATE */
  const [sortDate, setSortDate] = React.useState({
    age: '',
    name: 'hai',
  });
  const handleSortDate = (event) => {
    const name = event.target.name;
    setSortDate({
      ...sortDate,
      [name]: event.target.value,
    });
  };

  return (
    <>
      <section className={styles.search_page}>

        <div id={styles.search_page_header}>
          <Link to="/"><p id={styles.logo_title}>Telad</p></Link>
          <h1 id={styles.search_page_title}>Запишитесь на приём к врачу онлайн</h1>
        </div>
        
        <div className={styles.search_group}>
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: 390 }}
            renderInput={(params) => <TextField {...params} label="Врач, специальность" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: 390 }}
            renderInput={(params) => <TextField {...params} label="Город, район" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: 217 }}
            renderInput={(params) => <TextField {...params} label="Радиус" variant="outlined" />}
          />
          <Link to="/search"><button id={styles.search_button}>Найти</button></Link>
        </div>

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link to="/search">Врачи</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <h1 id={styles.search_page_article1}>Запись на приём к лучшим врачам Бишкека </h1>
        <p id={styles.search_page_article2}>Хороший врач - это специалист широкого профиля, который основываясь на ваших симптомах, поставит верный диагноз и назначит результативное лечение.</p>
      
        <div className={styles.sort_group}>
          <ToggleButtonGroup
            // classes={{
            //   root: classes.root,
            // }}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              {/* <FormatAlignLeftIcon /> */}<p>В клинике</p>
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              {/* <FormatAlignCenterIcon /> */}<p>Онлайн</p>
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              {/* <FormatAlignRightIcon /> */}<p>На дому</p>
            </ToggleButton>
          </ToggleButtonGroup>

          <div id={styles.sort_group_famous}>
            <p>Сортировать</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
              <Select
                // defaultValue={10}
                native
                value={sort.age}
                onChange={handleSort}
                // label="Age" 
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>По популярности</option>
                <option value={20}>По возрастанию</option>
                <option value={30}>По убыванию</option>
              </Select>
            </FormControl>
          </div>

          <div id={styles.sort_group_date}>
            <p>Дата приема</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
              <Select
                // defaultValue={10}
                native
                value={sortDate.age}
                onChange={handleSortDate}
                // label="Age"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Понедельник</option>
                <option value={20}>Вторник</option>
                <option value={30}>Среда</option>
                <option value={40}>Четверг</option>
                <option value={50}>Пятница</option>
                <option value={60}>Суббота</option>
                <option value={70}>Воскресенье</option>
              </Select>
            </FormControl>
          </div>
        </div>
        
        <div className={styles.doctors_list}>
          <div id={styles.doctor_list_item}>
            <div className={styles.doctor_list_item_left}>
              <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="65" cy="65" r="64.5" stroke="#D7FBFF"/>
                <path d="M65 60C68.4612 60 71.8446 58.9737 74.7225 57.0507C77.6003 55.1278 79.8434 52.3947 81.1679 49.197C82.4924 45.9993 82.839 42.4806 82.1637 39.0859C81.4885 35.6913 79.8218 32.5731 77.3744 30.1256C74.927 27.6782 71.8088 26.0115 68.4141 25.3363C65.0194 24.661 61.5007 25.0076 58.303 26.3321C55.1053 27.6566 52.3722 29.8997 50.4493 32.7775C48.5264 35.6554 47.5 39.0388 47.5 42.5C47.5 47.1413 49.3437 51.5925 52.6256 54.8744C55.9075 58.1563 60.3587 60 65 60ZM65 30C67.4723 30 69.889 30.7331 71.9446 32.1066C74.0002 33.4802 75.6024 35.4324 76.5485 37.7165C77.4946 40.0005 77.7421 42.5139 77.2598 44.9386C76.7775 47.3634 75.587 49.5907 73.8388 51.3388C72.0907 53.087 69.8634 54.2775 67.4386 54.7598C65.0139 55.2421 62.5005 54.9946 60.2165 54.0485C57.9324 53.1024 55.9802 51.5002 54.6066 49.4446C53.2331 47.389 52.5 44.9723 52.5 42.5C52.5 39.1848 53.817 36.0054 56.1612 33.6612C58.5054 31.317 61.6848 30 65 30Z" fill="#00C6DD"/>
                <path d="M67.5 65H62.5C55.2065 65 48.2118 67.8973 43.0546 73.0546C37.8973 78.2118 35 85.2065 35 92.5C35 93.163 35.2634 93.7989 35.7322 94.2678C36.2011 94.7366 36.837 95 37.5 95H92.5C93.163 95 93.7989 94.7366 94.2678 94.2678C94.7366 93.7989 95 93.163 95 92.5C95 85.2065 92.1027 78.2118 86.9454 73.0546C81.7882 67.8973 74.7935 65 67.5 65ZM40.15 90C40.7647 84.5016 43.3838 79.4225 47.5067 75.7331C51.6296 72.0436 56.9673 70.0026 62.5 70H67.5C73.0327 70.0026 78.3704 72.0436 82.4933 75.7331C86.6162 79.4225 89.2353 84.5016 89.85 90H40.15Z" fill="#00C6DD"/>
              </svg>
              <p>Stars</p>
            </div>
            <div className={styles.doctor_list_item_middle}>
              <p id={styles.doctor_list_item_middle_name}>Короткий Игорь Валентинович</p>
              <p id={styles.doctor_list_item_middle_specialty}>Пластический хирург</p>
              <div className={styles.doctor_list_item_middle_specialty_details}>
                <p>· Стаж 39 лет </p>
                <p>· Врач высшей категории</p>
                <p>· Доктор медицинских наук</p>
              </div>
              <p id={styles.doctor_list_item_middle_receptiontitle}>Тип приёма</p>
              <p id={styles.doctor_list_item_middle_receptiontype}>В клинике</p>
              <p id={styles.doctor_list_item_middle_costtitle}>Стоимость</p>
              <p id={styles.doctor_list_item_middle_cost}>600 сом</p>
            </div>
            <div className={styles.doctor_list_item_right}>
              <p id={styles.doctor_list_item_right_visitingdaystitle}>Приемные дни</p>
              <p id={styles.doctor_list_item_right_visitingdays}>пн - чт</p>
              <p id={styles.doctor_list_item_right_visitinghourstitle}>Приемные часы</p>
              <p id={styles.doctor_list_item_right_visitinghours}>13:00 - 17:00</p>
              <button id={styles.doctor_list_item_right_button}>Записаться</button>
              <div className={styles.doctor_list_item_right_address}>
                <p id={styles.doctor_list_item_right_address_clinic}>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</p>
                <p id={styles.doctor_list_item_right_address_data}>г.Бишкек , улица Чокморова, 154</p>
              </div>
            </div>
          </div>
          <div id={styles.doctor_list_item}>
            <div className={styles.doctor_list_item_left}>
              <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="65" cy="65" r="64.5" stroke="#D7FBFF"/>
                <path d="M65 60C68.4612 60 71.8446 58.9737 74.7225 57.0507C77.6003 55.1278 79.8434 52.3947 81.1679 49.197C82.4924 45.9993 82.839 42.4806 82.1637 39.0859C81.4885 35.6913 79.8218 32.5731 77.3744 30.1256C74.927 27.6782 71.8088 26.0115 68.4141 25.3363C65.0194 24.661 61.5007 25.0076 58.303 26.3321C55.1053 27.6566 52.3722 29.8997 50.4493 32.7775C48.5264 35.6554 47.5 39.0388 47.5 42.5C47.5 47.1413 49.3437 51.5925 52.6256 54.8744C55.9075 58.1563 60.3587 60 65 60ZM65 30C67.4723 30 69.889 30.7331 71.9446 32.1066C74.0002 33.4802 75.6024 35.4324 76.5485 37.7165C77.4946 40.0005 77.7421 42.5139 77.2598 44.9386C76.7775 47.3634 75.587 49.5907 73.8388 51.3388C72.0907 53.087 69.8634 54.2775 67.4386 54.7598C65.0139 55.2421 62.5005 54.9946 60.2165 54.0485C57.9324 53.1024 55.9802 51.5002 54.6066 49.4446C53.2331 47.389 52.5 44.9723 52.5 42.5C52.5 39.1848 53.817 36.0054 56.1612 33.6612C58.5054 31.317 61.6848 30 65 30Z" fill="#00C6DD"/>
                <path d="M67.5 65H62.5C55.2065 65 48.2118 67.8973 43.0546 73.0546C37.8973 78.2118 35 85.2065 35 92.5C35 93.163 35.2634 93.7989 35.7322 94.2678C36.2011 94.7366 36.837 95 37.5 95H92.5C93.163 95 93.7989 94.7366 94.2678 94.2678C94.7366 93.7989 95 93.163 95 92.5C95 85.2065 92.1027 78.2118 86.9454 73.0546C81.7882 67.8973 74.7935 65 67.5 65ZM40.15 90C40.7647 84.5016 43.3838 79.4225 47.5067 75.7331C51.6296 72.0436 56.9673 70.0026 62.5 70H67.5C73.0327 70.0026 78.3704 72.0436 82.4933 75.7331C86.6162 79.4225 89.2353 84.5016 89.85 90H40.15Z" fill="#00C6DD"/>
              </svg>
              <p>Stars</p>
            </div>
            <div className={styles.doctor_list_item_middle}>
              <p id={styles.doctor_list_item_middle_name}>Короткий Игорь Валентинович</p>
              <p id={styles.doctor_list_item_middle_specialty}>Пластический хирург</p>
              <div className={styles.doctor_list_item_middle_specialty_details}>
                <p>· Стаж 39 лет </p>
                <p>· Врач высшей категории</p>
                <p>· Доктор медицинских наук</p>
              </div>
              <p id={styles.doctor_list_item_middle_receptiontitle}>Тип приёма</p>
              <p id={styles.doctor_list_item_middle_receptiontype}>В клинике</p>
              <p id={styles.doctor_list_item_middle_costtitle}>Стоимость</p>
              <p id={styles.doctor_list_item_middle_cost}>600 сом</p>
            </div>
            <div className={styles.doctor_list_item_right}>
              <p id={styles.doctor_list_item_right_visitingdaystitle}>Приемные дни</p>
              <p id={styles.doctor_list_item_right_visitingdays}>пн - чт</p>
              <p id={styles.doctor_list_item_right_visitinghourstitle}>Приемные часы</p>
              <p id={styles.doctor_list_item_right_visitinghours}>13:00 - 17:00</p>
              <button id={styles.doctor_list_item_right_button}>Записаться</button>
              <div className={styles.doctor_list_item_right_address}>
                <p id={styles.doctor_list_item_right_address_clinic}>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</p>
                <p id={styles.doctor_list_item_right_address_data}>г.Бишкек , улица Чокморова, 154</p>
              </div>
            </div>
          </div>
          <div id={styles.doctor_list_item}>
            <div className={styles.doctor_list_item_left}>
              <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="65" cy="65" r="64.5" stroke="#D7FBFF"/>
                <path d="M65 60C68.4612 60 71.8446 58.9737 74.7225 57.0507C77.6003 55.1278 79.8434 52.3947 81.1679 49.197C82.4924 45.9993 82.839 42.4806 82.1637 39.0859C81.4885 35.6913 79.8218 32.5731 77.3744 30.1256C74.927 27.6782 71.8088 26.0115 68.4141 25.3363C65.0194 24.661 61.5007 25.0076 58.303 26.3321C55.1053 27.6566 52.3722 29.8997 50.4493 32.7775C48.5264 35.6554 47.5 39.0388 47.5 42.5C47.5 47.1413 49.3437 51.5925 52.6256 54.8744C55.9075 58.1563 60.3587 60 65 60ZM65 30C67.4723 30 69.889 30.7331 71.9446 32.1066C74.0002 33.4802 75.6024 35.4324 76.5485 37.7165C77.4946 40.0005 77.7421 42.5139 77.2598 44.9386C76.7775 47.3634 75.587 49.5907 73.8388 51.3388C72.0907 53.087 69.8634 54.2775 67.4386 54.7598C65.0139 55.2421 62.5005 54.9946 60.2165 54.0485C57.9324 53.1024 55.9802 51.5002 54.6066 49.4446C53.2331 47.389 52.5 44.9723 52.5 42.5C52.5 39.1848 53.817 36.0054 56.1612 33.6612C58.5054 31.317 61.6848 30 65 30Z" fill="#00C6DD"/>
                <path d="M67.5 65H62.5C55.2065 65 48.2118 67.8973 43.0546 73.0546C37.8973 78.2118 35 85.2065 35 92.5C35 93.163 35.2634 93.7989 35.7322 94.2678C36.2011 94.7366 36.837 95 37.5 95H92.5C93.163 95 93.7989 94.7366 94.2678 94.2678C94.7366 93.7989 95 93.163 95 92.5C95 85.2065 92.1027 78.2118 86.9454 73.0546C81.7882 67.8973 74.7935 65 67.5 65ZM40.15 90C40.7647 84.5016 43.3838 79.4225 47.5067 75.7331C51.6296 72.0436 56.9673 70.0026 62.5 70H67.5C73.0327 70.0026 78.3704 72.0436 82.4933 75.7331C86.6162 79.4225 89.2353 84.5016 89.85 90H40.15Z" fill="#00C6DD"/>
              </svg>
              <p>Stars</p>
            </div>
            <div className={styles.doctor_list_item_middle}>
              <p id={styles.doctor_list_item_middle_name}>Короткий Игорь Валентинович</p>
              <p id={styles.doctor_list_item_middle_specialty}>Пластический хирург</p>
              <div className={styles.doctor_list_item_middle_specialty_details}>
                <p>· Стаж 39 лет </p>
                <p>· Врач высшей категории</p>
                <p>· Доктор медицинских наук</p>
              </div>
              <p id={styles.doctor_list_item_middle_receptiontitle}>Тип приёма</p>
              <p id={styles.doctor_list_item_middle_receptiontype}>В клинике</p>
              <p id={styles.doctor_list_item_middle_costtitle}>Стоимость</p>
              <p id={styles.doctor_list_item_middle_cost}>600 сом</p>
            </div>
            <div className={styles.doctor_list_item_right}>
              <p id={styles.doctor_list_item_right_visitingdaystitle}>Приемные дни</p>
              <p id={styles.doctor_list_item_right_visitingdays}>пн - чт</p>
              <p id={styles.doctor_list_item_right_visitinghourstitle}>Приемные часы</p>
              <p id={styles.doctor_list_item_right_visitinghours}>13:00 - 17:00</p>
              <button id={styles.doctor_list_item_right_button}>Записаться</button>
              <div className={styles.doctor_list_item_right_address}>
                <p id={styles.doctor_list_item_right_address_clinic}>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</p>
                <p id={styles.doctor_list_item_right_address_data}>г.Бишкек , улица Чокморова, 154</p>
              </div>
            </div>
          </div>
        </div>
      
      </section>
        

      <Footer />
    </>
  )
}

export default Search;

/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

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