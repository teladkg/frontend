import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Footer from '../footer/footer';

import './search.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';

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
      <section className="search_page">

        <div id="search_page_header">
          <Link to="/"><p id="search_page_header_logo_title">Telad</p></Link>
          <Link><button id="search_page_header_button">Личный кабинет</button></Link>
        </div>
        
        <div className="search_page_group_container">
          <h1 id="search_page_group_title">Запишитесь на приём к врачу онлайн</h1>
          <div className="search_page_group">
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
            <Link to="/search"><button id="search_page_group_button">Найти врача</button></Link>
          </div>
        </div>

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="search_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="search_page_breadcrumb_active" to="/search">Врачи</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <h1 id="search_page_article1">Все врачи</h1>

        <div className="search_page_sort_group">
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
              <p>В клинике</p>
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <p>Онлайн</p>
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <p>На дому</p>
            </ToggleButton>
          </ToggleButtonGroup>

          <div id="search_page_sort_group_famous">
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

          <div id="search_page_sort_group_date">
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
        
        <div className="search_page_doctors_list">
          <div id="search_page_doctor_list_item">
            <div className="search_page_doctor_list_item_left">
              <div className="search_page_doctor_list_item_avatargroup">
                <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="65" cy="65" r="64.5" stroke="#D7FBFF"/>
                  <path d="M65 60C68.4612 60 71.8446 58.9737 74.7225 57.0507C77.6003 55.1278 79.8434 52.3947 81.1679 49.197C82.4924 45.9993 82.839 42.4806 82.1637 39.0859C81.4885 35.6913 79.8218 32.5731 77.3744 30.1256C74.927 27.6782 71.8088 26.0115 68.4141 25.3363C65.0194 24.661 61.5007 25.0076 58.303 26.3321C55.1053 27.6566 52.3722 29.8997 50.4493 32.7775C48.5264 35.6554 47.5 39.0388 47.5 42.5C47.5 47.1413 49.3437 51.5925 52.6256 54.8744C55.9075 58.1563 60.3587 60 65 60ZM65 30C67.4723 30 69.889 30.7331 71.9446 32.1066C74.0002 33.4802 75.6024 35.4324 76.5485 37.7165C77.4946 40.0005 77.7421 42.5139 77.2598 44.9386C76.7775 47.3634 75.587 49.5907 73.8388 51.3388C72.0907 53.087 69.8634 54.2775 67.4386 54.7598C65.0139 55.2421 62.5005 54.9946 60.2165 54.0485C57.9324 53.1024 55.9802 51.5002 54.6066 49.4446C53.2331 47.389 52.5 44.9723 52.5 42.5C52.5 39.1848 53.817 36.0054 56.1612 33.6612C58.5054 31.317 61.6848 30 65 30Z" fill="#00C6DD"/>
                  <path d="M67.5 65H62.5C55.2065 65 48.2118 67.8973 43.0546 73.0546C37.8973 78.2118 35 85.2065 35 92.5C35 93.163 35.2634 93.7989 35.7322 94.2678C36.2011 94.7366 36.837 95 37.5 95H92.5C93.163 95 93.7989 94.7366 94.2678 94.2678C94.7366 93.7989 95 93.163 95 92.5C95 85.2065 92.1027 78.2118 86.9454 73.0546C81.7882 67.8973 74.7935 65 67.5 65ZM40.15 90C40.7647 84.5016 43.3838 79.4225 47.5067 75.7331C51.6296 72.0436 56.9673 70.0026 62.5 70H67.5C73.0327 70.0026 78.3704 72.0436 82.4933 75.7331C86.6162 79.4225 89.2353 84.5016 89.85 90H40.15Z" fill="#00C6DD"/>
                </svg>
                <p>Stars</p>
              </div>
              <div className="search_page_doctor_list_item_infogroup">
              <p id="search_page_doctor_list_item_infogroup_specialty">Пластический хирург</p>
              <Link to="/doctor"><p id="search_page_doctor_list_item_infogroup_name">Короткий Игорь Валентинович</p></Link>
              <div className="search_page_doctor_list_item_infogroup_specialty_details">
                <p>Стаж 39 лет </p>
                <p>Врач высшей категории</p>
              </div>
              <div className="search_page_doctor_list_item_infogroup_additional">
                <div id="search_page_doctor_list_item_infogroup_reception">
                  <p id="search_page_doctor_list_item_infogroup_receptiontitle">Тип приёма</p>
                  <p id="search_page_doctor_list_item_infogroup_receptiontype">В клинике</p>
                </div>
                <div id="search_page_doctor_list_item_infogroup_cost">
                  <p id="search_page_doctor_list_item_infogroup_costtitle">Стоимость</p>
                  <p id="search_page_doctor_list_item_infogroup_money">600 сом</p>
                </div>
              </div>
              <div id="search_page_doctor_list_item_infogroup_phonegroup">
                <p id="search_page_doctor_list_item_infogroup_phonegroup_title">Телефон для записи:</p>
                <div id="search_page_doctor_list_item_infogroup_phonegroup_numbericon">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.4336 11.8066C24.4043 14.9023 23.6084 17.3242 21.9531 19.4287C20.1758 21.6894 17.8613 23.125 15.0293 23.706C12.8418 24.1504 10.7129 23.9551 8.62303 23.1982C8.15917 23.0273 7.70506 22.8271 7.27049 22.5879C7.13866 22.5146 7.02635 22.5049 6.87987 22.5537C4.90233 23.1933 2.91991 23.8281 0.937487 24.458C0.849596 24.4873 0.732409 24.5703 0.66405 24.5068C0.585925 24.4287 0.683581 24.3115 0.712878 24.2187C1.10839 23.042 1.50389 21.8603 1.90428 20.6836C2.14842 19.9658 2.3828 19.2529 2.63671 18.54C2.70507 18.3545 2.68065 18.2129 2.57811 18.042C2.07518 17.1826 1.70409 16.2646 1.44042 15.3027C0.947253 13.4961 0.893542 11.6699 1.27928 9.84373C1.69921 7.85154 2.57811 6.0742 3.93065 4.541C5.56639 2.68553 7.58299 1.45994 9.98045 0.86912C11.5088 0.493143 13.0517 0.43455 14.6045 0.688456C16.6357 1.02049 18.4668 1.82615 20.0635 3.12498C21.7236 4.47752 22.9346 6.15721 23.6963 8.17381C24.1162 9.26267 24.4482 11.0449 24.4336 11.8066ZM3.64256 21.5576C4.8535 21.167 6.01073 20.7959 7.15819 20.4199C7.30956 20.3711 7.43163 20.3808 7.56346 20.4687C8.00292 20.7617 8.47655 20.9961 8.96483 21.2012C10.5517 21.875 12.2021 22.1191 13.9062 21.8994C15.9961 21.6308 17.832 20.791 19.375 19.331C21.3183 17.4902 22.3584 15.2344 22.4512 12.5683C22.539 9.95603 21.6992 7.66111 19.9463 5.71287C18.2812 3.86228 16.1914 2.8076 13.7256 2.54392C11.582 2.31443 9.57518 2.7783 7.71971 3.89158C6.1328 4.84861 4.91698 6.15232 4.07225 7.79783C3.13964 9.60935 2.82225 11.5332 3.09081 13.5498C3.291 15.0732 3.83788 16.4746 4.71678 17.7344C4.81444 17.876 4.84374 17.9931 4.78514 18.1592C4.60448 18.6572 4.44335 19.1601 4.27245 19.6582C4.06737 20.2734 3.86717 20.8887 3.64256 21.5576Z" fill="#51C85D"/>
                    <path d="M6.88479 9.5068C6.9092 8.3447 7.31936 7.48044 8.09572 6.79196C8.34475 6.56735 8.65236 6.4697 8.99904 6.51852C9.14553 6.53806 9.29201 6.5527 9.4385 6.54294C9.71193 6.52829 9.89748 6.66013 9.99025 6.89938C10.3174 7.74899 10.6348 8.5986 10.9522 9.45309C11.0596 9.74606 10.874 9.97555 10.7178 10.1855C10.5371 10.4345 10.3174 10.6543 10.1026 10.874C9.88283 11.0986 9.85353 11.2256 10.0049 11.499C10.8887 13.1054 12.1289 14.3408 13.8135 15.1025C13.8721 15.1269 13.9307 15.1611 13.9893 15.1904C14.2139 15.2929 14.4141 15.2685 14.585 15.0732C14.8975 14.707 15.2393 14.3701 15.5274 13.9843C15.7178 13.7304 15.8496 13.6865 16.1377 13.8134C16.9971 14.1845 17.8028 14.6533 18.6231 15.1074C18.7744 15.1904 18.8281 15.3173 18.8233 15.4931C18.7793 16.9336 17.9541 17.6855 16.5039 18.0175C15.8008 18.1787 15.1514 18.0029 14.5069 17.7685C13.1543 17.2802 11.8506 16.7041 10.7569 15.7373C9.88772 14.9658 9.12111 14.1064 8.4717 13.1445C7.97365 12.4023 7.45607 11.6748 7.16799 10.8105C7.00197 10.3515 6.8799 9.88278 6.88479 9.5068Z" fill="#51C85D"/>
                  </svg>
                  <p>+996 777 77 77</p>
                </div>
              </div>
            </div>
            </div>           
            <div className="search_page_doctor_list_item_right">
              <p id="search_page_doctor_list_item_right_scheduletitle">График работы</p>
              <p id="search_page_doctor_list_item_right_visitingdaystitle">Приемные дни:</p>
              <p id="search_page_doctor_list_item_right_visitingdays">пн - чт</p>
              <p id="search_page_doctor_list_item_right_visitinghourstitle">Приемные часы:</p>
              <p id="search_page_doctor_list_item_right_visitinghours">12:00-18:00</p>
              <div className="search_page_doctor_list_item_right_address">
                <p id="search_page_doctor_list_item_right_address_clinic">МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</p>
                <p id="search_page_doctor_list_item_right_address_data">г.Бишкек , улица Чокморова, 154</p>
              </div>
            </div>
          </div>
          <div id="search_page_doctor_list_item">
            <div className="search_page_doctor_list_item_left">
              <div className="search_page_doctor_list_item_avatargroup">
                <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="65" cy="65" r="64.5" stroke="#D7FBFF"/>
                  <path d="M65 60C68.4612 60 71.8446 58.9737 74.7225 57.0507C77.6003 55.1278 79.8434 52.3947 81.1679 49.197C82.4924 45.9993 82.839 42.4806 82.1637 39.0859C81.4885 35.6913 79.8218 32.5731 77.3744 30.1256C74.927 27.6782 71.8088 26.0115 68.4141 25.3363C65.0194 24.661 61.5007 25.0076 58.303 26.3321C55.1053 27.6566 52.3722 29.8997 50.4493 32.7775C48.5264 35.6554 47.5 39.0388 47.5 42.5C47.5 47.1413 49.3437 51.5925 52.6256 54.8744C55.9075 58.1563 60.3587 60 65 60ZM65 30C67.4723 30 69.889 30.7331 71.9446 32.1066C74.0002 33.4802 75.6024 35.4324 76.5485 37.7165C77.4946 40.0005 77.7421 42.5139 77.2598 44.9386C76.7775 47.3634 75.587 49.5907 73.8388 51.3388C72.0907 53.087 69.8634 54.2775 67.4386 54.7598C65.0139 55.2421 62.5005 54.9946 60.2165 54.0485C57.9324 53.1024 55.9802 51.5002 54.6066 49.4446C53.2331 47.389 52.5 44.9723 52.5 42.5C52.5 39.1848 53.817 36.0054 56.1612 33.6612C58.5054 31.317 61.6848 30 65 30Z" fill="#00C6DD"/>
                  <path d="M67.5 65H62.5C55.2065 65 48.2118 67.8973 43.0546 73.0546C37.8973 78.2118 35 85.2065 35 92.5C35 93.163 35.2634 93.7989 35.7322 94.2678C36.2011 94.7366 36.837 95 37.5 95H92.5C93.163 95 93.7989 94.7366 94.2678 94.2678C94.7366 93.7989 95 93.163 95 92.5C95 85.2065 92.1027 78.2118 86.9454 73.0546C81.7882 67.8973 74.7935 65 67.5 65ZM40.15 90C40.7647 84.5016 43.3838 79.4225 47.5067 75.7331C51.6296 72.0436 56.9673 70.0026 62.5 70H67.5C73.0327 70.0026 78.3704 72.0436 82.4933 75.7331C86.6162 79.4225 89.2353 84.5016 89.85 90H40.15Z" fill="#00C6DD"/>
                </svg>
                <p>Stars</p>
              </div>
              <div className="search_page_doctor_list_item_infogroup">
              <p id="search_page_doctor_list_item_infogroup_specialty">Пластический хирург</p>
              <Link to="/doctor"><p id="search_page_doctor_list_item_infogroup_name">Короткий Игорь Валентинович</p></Link>
              <div className="search_page_doctor_list_item_infogroup_specialty_details">
                <p>Стаж 39 лет </p>
                <p>Врач высшей категории</p>
              </div>
              <div className="search_page_doctor_list_item_infogroup_additional">
                <div id="search_page_doctor_list_item_infogroup_reception">
                  <p id="search_page_doctor_list_item_infogroup_receptiontitle">Тип приёма</p>
                  <p id="search_page_doctor_list_item_infogroup_receptiontype">В клинике</p>
                </div>
                <div id="search_page_doctor_list_item_infogroup_cost">
                  <p id="search_page_doctor_list_item_infogroup_costtitle">Стоимость</p>
                  <p id="search_page_doctor_list_item_infogroup_money">600 сом</p>
                </div>
              </div>
              <div id="search_page_doctor_list_item_infogroup_phonegroup">
                <p id="search_page_doctor_list_item_infogroup_phonegroup_title">Телефон для записи:</p>
                <div id="search_page_doctor_list_item_infogroup_phonegroup_numbericon">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.4336 11.8066C24.4043 14.9023 23.6084 17.3242 21.9531 19.4287C20.1758 21.6894 17.8613 23.125 15.0293 23.706C12.8418 24.1504 10.7129 23.9551 8.62303 23.1982C8.15917 23.0273 7.70506 22.8271 7.27049 22.5879C7.13866 22.5146 7.02635 22.5049 6.87987 22.5537C4.90233 23.1933 2.91991 23.8281 0.937487 24.458C0.849596 24.4873 0.732409 24.5703 0.66405 24.5068C0.585925 24.4287 0.683581 24.3115 0.712878 24.2187C1.10839 23.042 1.50389 21.8603 1.90428 20.6836C2.14842 19.9658 2.3828 19.2529 2.63671 18.54C2.70507 18.3545 2.68065 18.2129 2.57811 18.042C2.07518 17.1826 1.70409 16.2646 1.44042 15.3027C0.947253 13.4961 0.893542 11.6699 1.27928 9.84373C1.69921 7.85154 2.57811 6.0742 3.93065 4.541C5.56639 2.68553 7.58299 1.45994 9.98045 0.86912C11.5088 0.493143 13.0517 0.43455 14.6045 0.688456C16.6357 1.02049 18.4668 1.82615 20.0635 3.12498C21.7236 4.47752 22.9346 6.15721 23.6963 8.17381C24.1162 9.26267 24.4482 11.0449 24.4336 11.8066ZM3.64256 21.5576C4.8535 21.167 6.01073 20.7959 7.15819 20.4199C7.30956 20.3711 7.43163 20.3808 7.56346 20.4687C8.00292 20.7617 8.47655 20.9961 8.96483 21.2012C10.5517 21.875 12.2021 22.1191 13.9062 21.8994C15.9961 21.6308 17.832 20.791 19.375 19.331C21.3183 17.4902 22.3584 15.2344 22.4512 12.5683C22.539 9.95603 21.6992 7.66111 19.9463 5.71287C18.2812 3.86228 16.1914 2.8076 13.7256 2.54392C11.582 2.31443 9.57518 2.7783 7.71971 3.89158C6.1328 4.84861 4.91698 6.15232 4.07225 7.79783C3.13964 9.60935 2.82225 11.5332 3.09081 13.5498C3.291 15.0732 3.83788 16.4746 4.71678 17.7344C4.81444 17.876 4.84374 17.9931 4.78514 18.1592C4.60448 18.6572 4.44335 19.1601 4.27245 19.6582C4.06737 20.2734 3.86717 20.8887 3.64256 21.5576Z" fill="#51C85D"/>
                    <path d="M6.88479 9.5068C6.9092 8.3447 7.31936 7.48044 8.09572 6.79196C8.34475 6.56735 8.65236 6.4697 8.99904 6.51852C9.14553 6.53806 9.29201 6.5527 9.4385 6.54294C9.71193 6.52829 9.89748 6.66013 9.99025 6.89938C10.3174 7.74899 10.6348 8.5986 10.9522 9.45309C11.0596 9.74606 10.874 9.97555 10.7178 10.1855C10.5371 10.4345 10.3174 10.6543 10.1026 10.874C9.88283 11.0986 9.85353 11.2256 10.0049 11.499C10.8887 13.1054 12.1289 14.3408 13.8135 15.1025C13.8721 15.1269 13.9307 15.1611 13.9893 15.1904C14.2139 15.2929 14.4141 15.2685 14.585 15.0732C14.8975 14.707 15.2393 14.3701 15.5274 13.9843C15.7178 13.7304 15.8496 13.6865 16.1377 13.8134C16.9971 14.1845 17.8028 14.6533 18.6231 15.1074C18.7744 15.1904 18.8281 15.3173 18.8233 15.4931C18.7793 16.9336 17.9541 17.6855 16.5039 18.0175C15.8008 18.1787 15.1514 18.0029 14.5069 17.7685C13.1543 17.2802 11.8506 16.7041 10.7569 15.7373C9.88772 14.9658 9.12111 14.1064 8.4717 13.1445C7.97365 12.4023 7.45607 11.6748 7.16799 10.8105C7.00197 10.3515 6.8799 9.88278 6.88479 9.5068Z" fill="#51C85D"/>
                  </svg>
                  <p>+996 777 77 77</p>
                </div>
              </div>
            </div>
            </div>           
            <div className="search_page_doctor_list_item_right">
              <p id="search_page_doctor_list_item_right_scheduletitle">График работы</p>
              <p id="search_page_doctor_list_item_right_visitingdaystitle">Приемные дни:</p>
              <p id="search_page_doctor_list_item_right_visitingdays">пн - чт</p>
              <p id="search_page_doctor_list_item_right_visitinghourstitle">Приемные часы:</p>
              <p id="search_page_doctor_list_item_right_visitinghours">12:00-18:00</p>
              <div className="search_page_doctor_list_item_right_address">
                <p id="search_page_doctor_list_item_right_address_clinic">МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</p>
                <p id="search_page_doctor_list_item_right_address_data">г.Бишкек , улица Чокморова, 154</p>
              </div>
            </div>
          </div>
          <div id="search_page_doctor_list_item">
            <div className="search_page_doctor_list_item_left">
              <div className="search_page_doctor_list_item_avatargroup">
                <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="65" cy="65" r="64.5" stroke="#D7FBFF"/>
                  <path d="M65 60C68.4612 60 71.8446 58.9737 74.7225 57.0507C77.6003 55.1278 79.8434 52.3947 81.1679 49.197C82.4924 45.9993 82.839 42.4806 82.1637 39.0859C81.4885 35.6913 79.8218 32.5731 77.3744 30.1256C74.927 27.6782 71.8088 26.0115 68.4141 25.3363C65.0194 24.661 61.5007 25.0076 58.303 26.3321C55.1053 27.6566 52.3722 29.8997 50.4493 32.7775C48.5264 35.6554 47.5 39.0388 47.5 42.5C47.5 47.1413 49.3437 51.5925 52.6256 54.8744C55.9075 58.1563 60.3587 60 65 60ZM65 30C67.4723 30 69.889 30.7331 71.9446 32.1066C74.0002 33.4802 75.6024 35.4324 76.5485 37.7165C77.4946 40.0005 77.7421 42.5139 77.2598 44.9386C76.7775 47.3634 75.587 49.5907 73.8388 51.3388C72.0907 53.087 69.8634 54.2775 67.4386 54.7598C65.0139 55.2421 62.5005 54.9946 60.2165 54.0485C57.9324 53.1024 55.9802 51.5002 54.6066 49.4446C53.2331 47.389 52.5 44.9723 52.5 42.5C52.5 39.1848 53.817 36.0054 56.1612 33.6612C58.5054 31.317 61.6848 30 65 30Z" fill="#00C6DD"/>
                  <path d="M67.5 65H62.5C55.2065 65 48.2118 67.8973 43.0546 73.0546C37.8973 78.2118 35 85.2065 35 92.5C35 93.163 35.2634 93.7989 35.7322 94.2678C36.2011 94.7366 36.837 95 37.5 95H92.5C93.163 95 93.7989 94.7366 94.2678 94.2678C94.7366 93.7989 95 93.163 95 92.5C95 85.2065 92.1027 78.2118 86.9454 73.0546C81.7882 67.8973 74.7935 65 67.5 65ZM40.15 90C40.7647 84.5016 43.3838 79.4225 47.5067 75.7331C51.6296 72.0436 56.9673 70.0026 62.5 70H67.5C73.0327 70.0026 78.3704 72.0436 82.4933 75.7331C86.6162 79.4225 89.2353 84.5016 89.85 90H40.15Z" fill="#00C6DD"/>
                </svg>
                <p>Stars</p>
              </div>
              <div className="search_page_doctor_list_item_infogroup">
              <p id="search_page_doctor_list_item_infogroup_specialty">Пластический хирург</p>
              <Link to="/doctor"><p id="search_page_doctor_list_item_infogroup_name">Короткий Игорь Валентинович</p></Link>
              <div className="search_page_doctor_list_item_infogroup_specialty_details">
                <p>Стаж 39 лет </p>
                <p>Врач высшей категории</p>
              </div>
              <div className="search_page_doctor_list_item_infogroup_additional">
                <div id="search_page_doctor_list_item_infogroup_reception">
                  <p id="search_page_doctor_list_item_infogroup_receptiontitle">Тип приёма</p>
                  <p id="search_page_doctor_list_item_infogroup_receptiontype">В клинике</p>
                </div>
                <div id="search_page_doctor_list_item_infogroup_cost">
                  <p id="search_page_doctor_list_item_infogroup_costtitle">Стоимость</p>
                  <p id="search_page_doctor_list_item_infogroup_money">600 сом</p>
                </div>
              </div>
              <div id="search_page_doctor_list_item_infogroup_phonegroup">
                <p id="search_page_doctor_list_item_infogroup_phonegroup_title">Телефон для записи:</p>
                <div id="search_page_doctor_list_item_infogroup_phonegroup_numbericon">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.4336 11.8066C24.4043 14.9023 23.6084 17.3242 21.9531 19.4287C20.1758 21.6894 17.8613 23.125 15.0293 23.706C12.8418 24.1504 10.7129 23.9551 8.62303 23.1982C8.15917 23.0273 7.70506 22.8271 7.27049 22.5879C7.13866 22.5146 7.02635 22.5049 6.87987 22.5537C4.90233 23.1933 2.91991 23.8281 0.937487 24.458C0.849596 24.4873 0.732409 24.5703 0.66405 24.5068C0.585925 24.4287 0.683581 24.3115 0.712878 24.2187C1.10839 23.042 1.50389 21.8603 1.90428 20.6836C2.14842 19.9658 2.3828 19.2529 2.63671 18.54C2.70507 18.3545 2.68065 18.2129 2.57811 18.042C2.07518 17.1826 1.70409 16.2646 1.44042 15.3027C0.947253 13.4961 0.893542 11.6699 1.27928 9.84373C1.69921 7.85154 2.57811 6.0742 3.93065 4.541C5.56639 2.68553 7.58299 1.45994 9.98045 0.86912C11.5088 0.493143 13.0517 0.43455 14.6045 0.688456C16.6357 1.02049 18.4668 1.82615 20.0635 3.12498C21.7236 4.47752 22.9346 6.15721 23.6963 8.17381C24.1162 9.26267 24.4482 11.0449 24.4336 11.8066ZM3.64256 21.5576C4.8535 21.167 6.01073 20.7959 7.15819 20.4199C7.30956 20.3711 7.43163 20.3808 7.56346 20.4687C8.00292 20.7617 8.47655 20.9961 8.96483 21.2012C10.5517 21.875 12.2021 22.1191 13.9062 21.8994C15.9961 21.6308 17.832 20.791 19.375 19.331C21.3183 17.4902 22.3584 15.2344 22.4512 12.5683C22.539 9.95603 21.6992 7.66111 19.9463 5.71287C18.2812 3.86228 16.1914 2.8076 13.7256 2.54392C11.582 2.31443 9.57518 2.7783 7.71971 3.89158C6.1328 4.84861 4.91698 6.15232 4.07225 7.79783C3.13964 9.60935 2.82225 11.5332 3.09081 13.5498C3.291 15.0732 3.83788 16.4746 4.71678 17.7344C4.81444 17.876 4.84374 17.9931 4.78514 18.1592C4.60448 18.6572 4.44335 19.1601 4.27245 19.6582C4.06737 20.2734 3.86717 20.8887 3.64256 21.5576Z" fill="#51C85D"/>
                    <path d="M6.88479 9.5068C6.9092 8.3447 7.31936 7.48044 8.09572 6.79196C8.34475 6.56735 8.65236 6.4697 8.99904 6.51852C9.14553 6.53806 9.29201 6.5527 9.4385 6.54294C9.71193 6.52829 9.89748 6.66013 9.99025 6.89938C10.3174 7.74899 10.6348 8.5986 10.9522 9.45309C11.0596 9.74606 10.874 9.97555 10.7178 10.1855C10.5371 10.4345 10.3174 10.6543 10.1026 10.874C9.88283 11.0986 9.85353 11.2256 10.0049 11.499C10.8887 13.1054 12.1289 14.3408 13.8135 15.1025C13.8721 15.1269 13.9307 15.1611 13.9893 15.1904C14.2139 15.2929 14.4141 15.2685 14.585 15.0732C14.8975 14.707 15.2393 14.3701 15.5274 13.9843C15.7178 13.7304 15.8496 13.6865 16.1377 13.8134C16.9971 14.1845 17.8028 14.6533 18.6231 15.1074C18.7744 15.1904 18.8281 15.3173 18.8233 15.4931C18.7793 16.9336 17.9541 17.6855 16.5039 18.0175C15.8008 18.1787 15.1514 18.0029 14.5069 17.7685C13.1543 17.2802 11.8506 16.7041 10.7569 15.7373C9.88772 14.9658 9.12111 14.1064 8.4717 13.1445C7.97365 12.4023 7.45607 11.6748 7.16799 10.8105C7.00197 10.3515 6.8799 9.88278 6.88479 9.5068Z" fill="#51C85D"/>
                  </svg>
                  <p>+996 777 77 77</p>
                </div>
              </div>
            </div>
            </div>           
            <div className="search_page_doctor_list_item_right">
              <p id="search_page_doctor_list_item_right_scheduletitle">График работы</p>
              <p id="search_page_doctor_list_item_right_visitingdaystitle">Приемные дни:</p>
              <p id="search_page_doctor_list_item_right_visitingdays">пн - чт</p>
              <p id="search_page_doctor_list_item_right_visitinghourstitle">Приемные часы:</p>
              <p id="search_page_doctor_list_item_right_visitinghours">12:00-18:00</p>
              <div className="search_page_doctor_list_item_right_address">
                <p id="search_page_doctor_list_item_right_address_clinic">МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</p>
                <p id="search_page_doctor_list_item_right_address_data">г.Бишкек , улица Чокморова, 154</p>
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