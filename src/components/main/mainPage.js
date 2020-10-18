import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header'
import Footer from '../footer/footer'

import './mainPage.css';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import { InputLabel } from '@material-ui/core';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import GridLayout from 'react-grid-layout';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const MainPage = () => {

  const search_options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const doctors_slider = {
    rows: 2,
    slidesPerRow: 4,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // className: "center",
    // centerMode: true,
    // centerPadding: "60px",
  };

  const clinics_slider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
  };

  const [values, setValues] = React.useState({
    textmask: '',
    numberformat: '1320',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Header />

      <section className="search">
        <p id="search_title1">Справочная по врачам и клиникам</p>
        <p id="search_title2">“Telad” - медицинский сервис, предоставляющий информацию о врачах и клиниках</p>
        <p id="search_title3">Выберите категорию поиска</p>
        <div className="search_group">
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
          <Link to="/search"><button id="search_button">Найти</button></Link>
        </div>
      </section>

      <section className="doctors">
        <p id="doctors_title">Популярные специализации</p>
        <Slider {...doctors_slider}>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
        </Slider>
      </section>

      <section className="clinics">
        <p id="clinics_title">Клиники</p>
        <Slider {...clinics_slider}>
          <div id="clinics_slide">
            <div id="clinics_slide_left">
              <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
            </div>    
            <div id="clinics_slide_right">
              <Link to="/clinic"><h3>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</h3></Link>
              <p id="clinics_slide_right_article">MEDCENTER.KG имеет новейшее техническоеоборудование, которое позволяет проводитьвесь спектр эндоскопических, пластических и хирургических вмешательств.</p>
              <div id="clinics_slide_right_comments">
                <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                <p>20 врачей</p>
              </div>
            </div>
          </div>
          <div id="clinics_slide">
            <div id="clinics_slide_left">
              <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
            </div>    
            <div id="clinics_slide_right">
              <Link to="/clinic"><h3>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</h3></Link>
              <p id="clinics_slide_right_article">MEDCENTER.KG имеет новейшее техническоеоборудование, которое позволяет проводитьвесь спектр эндоскопических, пластических и хирургических вмешательств.</p>
              <div id="clinics_slide_right_comments">
                <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                <p>20 врачей</p>
              </div>
            </div>
          </div>
          <div id="clinics_slide">
            <div id="clinics_slide_left">
              <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
            </div>    
            <div id="clinics_slide_right">
              <Link to="/clinic"><h3>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</h3></Link>
              <p id="clinics_slide_right_article">MEDCENTER.KG имеет новейшее техническоеоборудование, которое позволяет проводитьвесь спектр эндоскопических, пластических и хирургических вмешательств.</p>
              <div id="clinics_slide_right_comments">
                <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                <p>20 врачей</p>
              </div>
            </div>
          </div>
          <div id="clinics_slide">
            <div id="clinics_slide_left">
              <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
            </div>    
            <div id="clinics_slide_right">
              <Link to="/clinic"><h3>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</h3></Link>
              <p id="clinics_slide_right_article">MEDCENTER.KG имеет новейшее техническоеоборудование, которое позволяет проводитьвесь спектр эндоскопических, пластических и хирургических вмешательств.</p>
              <div id="clinics_slide_right_comments">
                <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                <p>20 врачей</p>
              </div>
            </div>
          </div>
        </Slider>
      </section>

      <section className="specialties">
        <p id="specialties_title">Все специальности</p>
        <GridLayout className="layout" cols={4} rowHeight={40} width={document.documentElement.clientWidth-190}>

          <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">А</div>
              <span>Акушерство</span>
              <span>Аллергология</span>
              <span>Андрология</span>
              <span>Анестезиология</span>
              <span>Аритмология</span>
              <span>Артрология</span>
            </div>
          </div>

          <div key="b" data-grid={{x: 1, y: 0, w: 1, h: 2, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">В</div>
              <span>Венерология</span>
              <span>Вертебрология</span>
            </div>
          </div>

          <div key="c" data-grid={{x: 2, y: 0, w: 1, h: 5, minH: 2, maxH: 5}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Г</div>
              <span>Гастроэнтерология</span>
              <span>Гематология</span>
              <span>Генетика</span>
              <span>Гепатология</span>
              <span>Гинекология</span>
              <span>Гинекология-эндокринология</span>
              <span>Гирудотерапия</span>
              <span>Гомеопатия</span>
            </div>
          </div>

          <div key="d" data-grid={{x: 3, y: 0, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Д</div>
              <span>Дерматология</span>
              <span>Дерматоонкология</span>
              <span>Дефектология</span>
              <span>Диабетология</span>
              <span>Диетология</span>
              <span>Дневной стационар</span>
            </div>
          </div>

          <div key="e" data-grid={{x: 0, y: 1, w: 1, h: 2, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">И</div>
              <span>Иммунология</span>
              <span>Инфектология</span>
            </div>
          </div>

          <div key="f" data-grid={{x: 1, y: 1, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">К</div>
              <span>Кардиология</span>
              <span>Кардиохирургия</span>
              <span>Кинезитерапия</span>
              <span>Колопроктология</span>
              <span>Косметология</span>
              <span>КТ</span>
            </div>
          </div>

          <div key="g" data-grid={{x: 2, y: 1, w: 1, h: 2, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Л</div>
              <span>Лечебная физкультура</span>
              <span>Логопедия</span>
            </div>
          </div>

          <div key="h" data-grid={{x: 3, y: 1, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">М</div>
              <span>Маммология</span>
              <span>Мануальная терапия</span>
              <span>Массаж</span>
              <span>Микрохирургия</span>
              <span>МРТ</span>
            </div>
          </div>

          <div key="i" data-grid={{x: 0, y: 2, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Н</div>
              <span>Наркология</span>
              <span>Неврология</span>
              <span>Нейрохирургия</span>
              <span>Неонатология</span>
              <span>Нетрадиционная медицина</span>
              <span>Нефрология</span>
            </div>
          </div>

          <div key="j" data-grid={{x: 1, y: 2, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">О</div>
              <span>Онкология</span>
              <span>Ортодонтия</span>
              <span>Ортопедия</span>
              <span>Остеопатия</span>
              <span>Офтальмология</span>
            </div>
          </div>

          <div key="k" data-grid={{x: 2, y: 2, w: 1, h: 5, minH: 2, maxH: 5}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">П</div>
              <span>Педиатрия</span>
              <span>Пластическая хирургия</span>
              <span>Подология</span>
              <span>Проктология</span>
              <span>Психиатрия</span>
              <span>Психология</span>
              <span>Психотерапия</span>
              <span>Пульмонология</span>
            </div>
          </div>

          <div key="l" data-grid={{x: 3, y: 2, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Р</div>
              <span>Радиология</span>
              <span>Реабилитология</span>
              <span>Ревматология</span>
              <span>Рентгенология</span>
              <span>Репродуктология</span>
              <span>Рефлексотерапия</span>
            </div>
          </div>

          <div key="m" data-grid={{x: 0, y: 3, w: 1, h: 5, minH: 2, maxH: 5}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">С</div>
              <span>Сексология</span>
              <span>Сексопатология</span>
              <span>Семейная медицина</span>
              <span>Скорая медицинская помощь</span>
              <span>Стационар</span>
              <span>Стоматология</span>
              <span>Сурдология</span>
            </div>
          </div>

          <div key="n" data-grid={{x: 1, y: 3, w: 1, h: 3, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Т</div>
              <span>Терапия</span>
              <span>Травматология</span>
              <span>Трихология</span>
            </div>
          </div>

          <div key="o" data-grid={{x: 2, y: 3, w: 1, h: 2, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">У</div>
              <span>УЗ - диагностика</span>
              <span>Урология</span>
            </div>
          </div>

          <div key="p" data-grid={{x: 3, y: 3, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Ф</div>
              <span>Физиотерапия</span>
              <span>Фитотерапия</span>
              <span>Флебология</span>
              <span>Фтизиатрия</span>
              <span>Функциональная диагностика</span>
            </div>
          </div>

        </GridLayout>
      </section>

      <div id="specialties_show_btn">Все 85 специальностей</div>

      <section className="contact_us">
        <div className="contact_us_left">
          <p id="contact_us_title">Не нашли подходящего врача?</p>
          <p id="contact_us_number">Свяжитесь с нами +996 555 55 55 55 или оставьте номер</p>
          <div id="contact_us_input">
            <FormControl>
              <InputLabel htmlFor="formatted-text-mask-input"></InputLabel>
              <Input
                value={values.textmask}
                onChange={handleChange}
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
            <button id="contact_us_button">Позвоните мне</button>
          </div>
        </div>
        <img id="contact_us_right" src={require('../../content/images/main/hotpng_2.png')} alt="doc female"/>
      </section>

      <Footer />
    </>
  )
}

export default MainPage

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+','9', '9', '6','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

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