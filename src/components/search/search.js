import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getDoctors, getDoctorById, getSpecialties, getCities, getFilterData, setFilterItems } from '../../redux/actions/actions';

import Header from '../header/header';
import Footer from '../footer/footer';

import './search.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import setFilterItem from '../../redux/reducers/filterItems.reducer';

const Search = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getDoctors();
    props.getSpecialties();
    props.getCities();
    props.getFilterData();
    // props.getDoctorById(props.match.params.id);
  }, []);


  /* FOR AUTOCOMPLETE GROUP */
  const search_options1 = props.specialties.results && props.specialties.results.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const search_options2 = props.cities && props.cities.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const search_options3 = radius.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });


  // const items = useRef('');
  const [itemss, setItemss] = useState('');
  /* FOR RADIO BUTTON GROUP */
  const [receptionState, setReceptionState] = useState('');
  const [receptionNum, setReceptionNum] = useState(null);
  // const handleReception = (event) => {
  //   setReceptionState(event.target.value);
  //   if (receptionNum && receptionNum !== '') {
  //     items+='schedules__appointment='+receptionNum+'&';
  //     props.setFilterItems(items);
  //     console.log(items);
  //   }
  //   console.log(receptionState);
  // };

  /* FILTER */ 
  const [spec, setSpec] = useState('');
  const res1 = props.specialties.results && props.specialties.results.find(param => param.name === spec);
  
  const setFilter = (event) => {
    setSpec(event.target.textContent);
    setReceptionState(event.target.value);
    // let array = document.getElementById('specsfilter');
    // let items = '';
    // console.log(array.value);
    // if(array.value !== '') {
    //   items+='specialty='+array.value+'&';
    // }
    // console.log('items:',items);
    // props.setFilterItems(items);
    // console.log(res1);
  };

  useEffect(()=> {
    if (receptionState === 'Home') {
      setReceptionNum(2);
    }
    else if(receptionState === 'onClinic') {
      setReceptionNum(1);
    }
    else if(receptionState === 'onLine') {
      setReceptionNum(3);
    }
    console.log('receptionstate: ', receptionState);
    console.log('receptionNum: ', receptionNum);

    if (res1 && res1 !== '') {
      setItemss('specialty='+res1.id+'&');
      // items.current+='specialty='+res1.id+'&';
      props.setFilterItems(itemss);
      console.log(itemss);
    }
    if (receptionNum && receptionNum !== '') {
      setItemss('schedules__appointment='+receptionNum+'&');
      // items.current+='schedules__appointment='+receptionNum+'&';
      props.setFilterItems(itemss);
      console.log(itemss);
    }
    if (res1 && res1 !== '' && receptionNum && receptionNum !== '') {
      setItemss('specialty='+res1.id+'&schedules__appointment='+receptionNum+'&');
      // items.current+='specialty='+res1.id+'&';
      props.setFilterItems(itemss);
      console.log(itemss);
    }
  }, [receptionState, receptionNum, itemss, res1])

  const getData = () => {
    if (itemss && itemss !== '') {
      props.getFilterData(itemss);
    }
    // if (props.items && props.items !== '') {
    //   console.log(props.items);
    // }
  };


  /* SORT BY DATE */
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  /* RESET BUTTON */
  const handleDelete = () => {
    setItemss('');
    setReceptionState('');
    setSpec('');
    setReceptionNum();
    props.getFilterData();
  };


  /* FOR DOCTORS SHOW MORE BUTTON */
  const useStyles = makeStyles((theme) => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const doctors = props.filterData.results;
  // console.log(props.filterData);
  // console.log(doctors);

  return (
    <>
      <Header />

      <section className="search_page">

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

        <h1 id="search_page_article1">Врачи</h1>

        <h1 id="search_page_article2">Поиск врача</h1>

        <div className="search_page_search_group">
          <Autocomplete
            id="specsfilter"
            options={search_options1 && search_options1.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Врач, специальность" variant="outlined" />}
            onChange={setFilter}
          />
          <Autocomplete
            id="citiesfilter"
            options={search_options2 && search_options2.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Город" variant="outlined" />}
            onChange={setFilterItems}
          />
          <Autocomplete
            id="mapfilter"
            options={search_options3 && search_options3.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Радиус" variant="outlined" />}
            onChange={setFilterItems}
          />
          <Link to="/search"><button onClick={getData} id="search_page_search_button">Найти</button></Link>
        </div>

        <div className="search_page_sort_group">
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <RadioGroup aria-label="reception" name="reception1" value={receptionState} onChange={setFilter}>
              <FormControlLabel value="Home" control={<Radio />} label="На дому" />
              <FormControlLabel value="onClinic" control={<Radio />} label="В клинике" />
              <FormControlLabel value="onLine" control={<Radio />} label="Онлайн" />
            </RadioGroup>
          </FormControl>

          <div id="search_page_sort_group_date">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                inputVariant="outlined"
                // label="With keyboard"
                format="dd.MM.yyyy"
                value={selectedDate}
                // InputAdornmentProps={{ position: "start" }}
                onChange={date => handleDateChange(date)}
                minDate={new Date()}
              />
            </MuiPickersUtilsProvider>
          </div>

          <div id="search_page_sort_group_reset">
            <Chip label="Сбросить" onDelete={handleDelete} />
          </div>
        </div>
        
        <div className="search_page_doctors_list">
          { 
            doctors===undefined ? <p>Loading...</p> :
            doctors.map(elem => {
              return(
                <div id="search_page_doctors_slide" key={elem.id}>
                  <img id="search_page_doctors_slide_image" src={elem.user.avatar == null ? require('../../content/images/main/image_10.png') : elem.user.avatar} alt="clinic pic"/>
                  <div id="search_page_doctors_slide_info">
                    <Link to={`/doctor/${elem.id}`}><h3>{elem.user.last_name} {elem.user.first_name} {elem.user.patronymic}</h3></Link>
                    <div className="search_page_doctors_slide_info_chipgroup">
                      {
                        elem.specialty.length === 0
                        ? <p id="search_page_doctors_slide_info_specialties">Специализация: отсутствует</p>
                        // : elem.specialty.length > 2 
                        //   ? elem.specialty.map(spec => {
                        //     return(
                        //       <>
                        //         <Chip label={spec.name}/>
                        //         <IconButton
                        //           className={clsx(classes.expand, {
                        //             [classes.expandOpen]: expanded,
                        //           })}
                        //           onClick={handleExpandClick}
                        //           aria-expanded={expanded}
                        //           aria-label="show more"
                        //         >
                        //           <ExpandMoreIcon />
                        //         </IconButton>
                        //         <Collapse in={expanded} timeout="auto" unmountOnExit>
                        //           <Chip label="Психолог"/>
                        //           <Chip label="Психолог"/>
                        //           <Chip label="Психолог"/>
                        //         </Collapse>
                        //       </>
                        //     )
                        //   })
                          : elem.specialty.map(spec => {
                            return(
                              <Chip label={spec.name}/>
                            )
                          })
                      }
                    </div>             
                    {elem.experience !== null
                      ? <p id="search_page_doctors_slide_info_experience">Стаж: {elem.experience} лет</p>
                      : <p id="search_page_doctors_slide_info_experience">Стаж: отсутствует</p>
                    }
                    {elem.locations.length !== 0 && elem.locations[0].address
                      ? <p id="search_page_doctors_slide_info_address">{elem.locations[0].address}</p>
                      : <p id="search_page_doctors_slide_info_address">Адрес отсутствует</p>
                    }
                    <div id="search_page_doctors_slide_info_lastblock">
                      <div id="search_page_doctors_slide_info_phonegroup">
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.2812 23.9375C11.263 23.9375 9.36686 23.4492 7.59277 22.4727L0 25.5L3.02734 17.9072C2.05078 16.1331 1.5625 14.237 1.5625 12.2188C1.5625 10.6237 1.87174 9.10596 2.49023 7.66553C3.10872 6.2251 3.94287 4.97998 4.99268 3.93018C6.04248 2.88037 7.2876 2.04622 8.72803 1.42773C10.1685 0.809245 11.6862 0.5 13.2812 0.5C14.8763 0.5 16.394 0.809245 17.8345 1.42773C19.2749 2.04622 20.52 2.88037 21.5698 3.93018C22.6196 4.97998 23.4538 6.2251 24.0723 7.66553C24.6908 9.10596 25 10.6237 25 12.2188C25 13.8138 24.6908 15.3315 24.0723 16.772C23.4538 18.2124 22.6196 19.4575 21.5698 20.5073C20.52 21.5571 19.2749 22.3913 17.8345 23.0098C16.394 23.6283 14.8763 23.9375 13.2812 23.9375ZM17.1875 14.5625H15.625L14.7461 15.3438C14.0137 15.1484 13.1144 14.5177 12.0483 13.4517C10.9823 12.3856 10.3516 11.4863 10.1562 10.7539L10.9375 9.875V8.3125C10.9375 8.03581 10.8398 7.75911 10.6445 7.48242C10.4492 7.20573 10.2336 7.00635 9.99756 6.88428C9.76156 6.76221 9.59473 6.75 9.49707 6.84766L8.34961 7.99512C7.71484 8.62988 7.62126 9.61865 8.06885 10.9614C8.51644 12.3042 9.37093 13.6063 10.6323 14.8677C11.8937 16.1291 13.1958 16.9836 14.5386 17.4312C15.8813 17.8787 16.8701 17.7852 17.5049 17.1504L18.6523 16.0029C18.75 15.9053 18.7378 15.7384 18.6157 15.5024C18.4937 15.2664 18.2943 15.0508 18.0176 14.8555C17.7409 14.6602 17.4642 14.5625 17.1875 14.5625Z" fill="#18C661"/>
                        </svg>
                        <p>{elem.user.phone}</p>
                      </div>
                      <div id="search_page_doctors_slide_info_stargroup">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.003 18.9828C12.3109 18.8065 12.6891 18.8065 12.997 18.9828L18.1996 21.9624C18.9626 22.3994 19.8776 21.7097 19.6676 20.8559L18.3254 15.3975C18.2335 15.0238 18.3642 14.6305 18.6615 14.3861L23.0883 10.748C23.7831 10.1771 23.4299 9.05073 22.5335 8.97868L16.6045 8.50208C16.2401 8.4728 15.9208 8.24707 15.7717 7.91339L13.4129 2.63679C13.0601 1.84758 11.9398 1.84759 11.587 2.63679L9.22835 7.91339C9.07919 8.24707 8.75986 8.4728 8.39553 8.50208L2.46649 8.97868C1.57013 9.05073 1.21695 10.1771 1.91169 10.748L6.33849 14.3861C6.63582 14.6305 6.76653 15.0238 6.67463 15.3975L5.33239 20.8559C5.12242 21.7097 6.03741 22.3994 6.80044 21.9624L12.003 18.9828Z" fill="#F2C94C"/>
                        </svg>
                        <p>{elem.rate ? elem.rate/2 : elem.rate}</p>
                      </div>
                    </div>            
                  </div>
                </div>
              )
            }) 
          }
          {
            doctors && doctors.length===0
            ? <span>Нет подходящих врачей</span> 
            : ''
          }
        </div>
      
        <ScrollUpButton ShowAtPosition={350}/>

      </section>
        
      <Footer />
    </>
  )
}


const mapStateToProps = state => {
  return {
    data: state.getDoctors.data,
    specialties: state.getSpecialties.specialties,
    cities: state.getCities.cities,
    
    filterData: state.getFilterData.filterData,
    items: state.filter,
  }
}

const mapDispatchToProps = {
  getDoctors,
  getDoctorById,
  getSpecialties,
  getCities,

  setFilterItems,
  getFilterData,
} 


export default connect(mapStateToProps, mapDispatchToProps)(Search);


/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


/* FOR MAP AUTOCOMPLETE */
const radius = [
  { title: '500 м', id: 1 },
  { title: '1 км', id: 2 },
  { title: '3 км', id: 3 },
  { title: '5 км', id: 4 },
  { title: '10 км', id: 5 },
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