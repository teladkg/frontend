import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getDoctors } from '../../redux/actions/actions';

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

const Search = (props) => {

  useEffect(() => {
    // window.scrollTo(0, 0)
    props.serverData();
  }, []);


  /* FOR AUTOCOMPLETE GROUP */
  const search_options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });


  /* FOR RADIO BUTTON GROUP */
  const [value, setValue] = React.useState('Home');
  const handleChange = (event) => {
    setValue(event.target.value);
  };


  // const classes = useStyles();


  /* SORT BY DATE */
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  /* RESET BUTTON */
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
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

  const doctors = props.data.results;
  console.log(doctors);

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
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Врач, специальность" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Город" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Радиус" variant="outlined" />}
          />
          <Link to="/search"><button id="search_page_search_button">Найти</button></Link>
        </div>

        <div className="search_page_sort_group">
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="На дому" />
              <FormControlLabel value="male" control={<Radio />} label="В клинике" />
              <FormControlLabel value="other" control={<Radio />} label="Онлайн" />
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

          { doctors &&
            doctors.map(elem => {
              return(
                <div id="search_page_doctors_slide">
                  <img id="search_page_doctors_slide_image" src={require('../../content/images/main/image_10.png')} alt="clinic pic"/>
                  <div id="search_page_doctors_slide_info">
                    <Link to="/doctor"><h3>{elem.user.last_name} {elem.user.first_name}</h3></Link>
                    <div className="search_page_doctors_slide_info_chipgroup">
                      <Chip label="Психолог"/>
                      <Chip label="Психолог"/>
                      <Chip label="Психолог"/>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Chip label="Психолог"/>
                        <Chip label="Психолог"/>
                        <Chip label="Психолог"/>
                      </Collapse>
                    </div>             
                    <p id="search_page_doctors_slide_info_experience">Стаж: 20 лет</p>
                    <p id="search_page_doctors_slide_info_address">Городская больница №6, Чуй 127</p>
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
                        <p>3.5</p>
                      </div>
                    </div>            
                  </div>
                </div>
              )
            }) 
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
    data: state.getDoctors.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    serverData: () => dispatch(getDoctors()),
  }
} 


export default connect(mapStateToProps, mapDispatchToProps)(Search);


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