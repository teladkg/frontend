import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Footer from '../footer/footer';

import styles from './clinicsSearch.module.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const ClinicsSearch = (props) => {

  /* FOR AUTOCOMPLETE GROUP */
  const search_options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

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

  /* SORT BY RATINGS */
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
      <section className={styles.clinics_page}>

        <div id={styles.clinics_page_header}>
          <Link to="/"><p id={styles.logo_title}>Telad</p></Link>
          <h1 id={styles.clinics_page_title}>Запишитесь на приём к врачу онлайн</h1>
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
          <Link to="/clinics-search"><button id={styles.search_button}>Найти</button></Link>
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
            <Link to="/clinics-search">Клиники</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <h1 id={styles.clinics_page_article1}>Клиники в Бишкеке</h1>

        <div className={styles.sort_group}>
          <p>Сортировать по:</p>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
            <Select
              defaultValue={10}
              native
              // value={sort.age}
              onChange={handleSort}
              // label="Age" 
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>По рейтингу</option>
              <option value={20}>По возрастанию</option>
              <option value={30}>По убыванию</option>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
            <Select
              defaultValue={10}
              native
              // value={sortDate.age}
              onChange={handleSortDate}
              // label="Age"
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Отзывам</option>
            </Select>
          </FormControl>
        </div>

        <div className={styles.clinics_list}>
          <div id={styles.clinic_list_item}>           
            <div className={styles.clinic_list_item_left}>
              <div className={styles.clinic_list_item_imagegroup}>
                <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
                <p>Stars</p>
              </div>
              <div className={styles.clinic_list_item_textgroup}>
                <p id={styles.clinic_list_item_textgroup_title}>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</p>
                <p id={styles.clinic_list_item_textgroup_article1}>Медицинский центр «MEDCENTER.KG» — это многопрофильная клиника, расположенная в самом центре Бишкека.</p>
                <p id={styles.clinic_list_item_textgroup_article2}>Здесь вы можете получить консультации специалистов различного профиля, прием ведут: Доктора медицинских наук, профессора, отличники здравоохранения и врачи высшей и первой категории.</p>
                <p id={styles.clinic_list_item_textgroup_article3}>Медицинский центр.kg оснащен отличной диагностической базой, где проводятся лабораторные, ультразвуковые, эндоскопические, электрофизиологические обследования на современном оборудовании.</p>
                <Link id={styles.clinic_list_item_textgroup_link} to="/clinic">Ещё</Link>
                <div id={styles.clinic_list_item_textgroup_doctors}>
                  <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                  <p>20 врачей</p>
                </div>
              </div>
            </div>
            <div className={styles.clinic_list_item_right}>
              <div id={styles.clinic_list_item_right_addressgroup}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0)">
                  <path d="M10.3594 5.84375C10.3594 4.81844 9.52531 3.98438 8.5 3.98438C7.47469 3.98438 6.64062 4.81844 6.64062 5.84375C6.64062 6.86906 7.47469 7.70312 8.5 7.70312C9.52531 7.70312 10.3594 6.86906 10.3594 5.84375ZM7.17188 5.84375C7.17188 5.11142 7.76767 4.51562 8.5 4.51562C9.23233 4.51562 9.82812 5.11142 9.82812 5.84375C9.82812 6.57608 9.23233 7.17188 8.5 7.17188C7.76767 7.17188 7.17188 6.57608 7.17188 5.84375Z" fill="#E5E5E5"/>
                  <path d="M8.48991 17.1442L8.69258 16.9065C8.9242 16.6356 14.3623 10.2151 14.3437 6.03792C14.3294 2.70858 11.708 0 8.5 0C5.2777 0 2.65625 2.70911 2.65625 6.03898C2.65625 10.2149 8.058 16.6348 8.28803 16.906L8.48991 17.1442ZM8.5 0.53125C11.4163 0.53125 13.7995 3.00262 13.8125 6.04031C13.8284 9.58056 9.48972 15.0957 8.49123 16.3173C7.49806 15.0944 3.1875 9.58109 3.1875 6.03898C3.1875 3.00209 5.57069 0.53125 8.5 0.53125Z" fill="#E5E5E5"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="17" height="17" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                <p id={styles.clinic_list_item_right_address}>г.Бишкек, улица Чокморова, 154</p>
              </div>
              <div id={styles.clinic_list_item_right_timegroup}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 0C3.825 0 0 3.825 0 8.5C0 13.175 3.825 17 8.5 17C13.175 17 17 13.175 17 8.5C17 3.825 13.175 0 8.5 0ZM8.5 15.3C4.76 15.3 1.7 12.24 1.7 8.5C1.7 4.76 4.76 1.7 8.5 1.7C12.24 1.7 15.3 4.76 15.3 8.5C15.3 12.24 12.24 15.3 8.5 15.3Z" fill="#E5E5E5"/>
                  <path d="M8.9249 4.25H7.6499V9.35L12.0699 12.07L12.7499 10.965L8.9249 8.67V4.25Z" fill="#E5E5E5"/>
                </svg>
                <p id={styles.clinic_list_item_right_time1}>пн-пт: 00:00 - 24:00</p>
              </div>
              <p id={styles.clinic_list_item_right_time2}>сб: 00:00 - 24:00</p>
              <p id={styles.clinic_list_item_right_time3}>вс: 00:00 - 24:00</p>          
              <div id={styles.clinic_list_item_right_phonegroup}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.02081 1.63779L4.19119 1.45484C4.05107 1.32436 3.79699 1.13844 3.46232 1.13844C3.18893 1.13844 2.93388 1.26296 2.71633 1.45314L2.71625 1.45305L2.7105 1.4584L1.40608 2.67312C1.04528 3.00911 0.843692 3.41096 0.799612 3.89121L0.79953 3.89214C0.737561 4.59617 0.880396 5.328 1.24482 6.23671C1.83554 7.72293 2.72547 9.10091 4.04454 10.5814L4.04534 10.5823C5.64856 12.3645 7.5781 13.7708 9.77458 14.761L9.77561 14.7614C10.5731 15.1166 11.6629 15.5456 12.8459 15.6162C12.846 15.6162 12.8461 15.6162 12.8462 15.6162L12.861 15.3666C12.9184 15.3702 12.9796 15.3702 13.037 15.3702C13.6337 15.3702 14.089 15.1885 14.4753 14.8038L4.02081 1.63779ZM4.02081 1.63779L4.19119 1.45484L4.19693 1.46019L4.19959 1.46267L4.02081 1.63779ZM14.1368 10.0852L14.1368 10.0852L14.1401 10.0884L16.2402 12.0512L16.2414 12.0523C16.5863 12.3703 16.75 12.7309 16.75 13.0904C16.75 13.4481 16.5885 13.8138 16.2484 14.1433L16.2479 14.1439C16.0873 14.3004 15.9222 14.4507 15.7591 14.5955L15.7591 14.5955L15.7577 14.5968C15.7393 14.6133 15.7209 14.6299 15.7025 14.6465C15.4833 14.8438 15.2626 15.0425 15.0686 15.2614L15.0641 15.2665C15.0624 15.2682 15.0606 15.2701 15.0588 15.2721C15.0567 15.2744 15.0543 15.2771 15.0519 15.28C14.5228 15.8093 13.8501 16.0784 13.0332 16.0784C12.9636 16.0784 12.8856 16.0752 12.8052 16.0716C11.5406 15.9957 10.4009 15.5521 9.52781 15.1668C7.25696 14.1445 5.2698 12.6942 3.61792 10.8574C2.25243 9.32868 1.34438 7.91053 0.737649 6.3864L0.737642 6.38638C0.488305 5.76017 0.178527 4.83732 0.264699 3.8585C0.320043 3.27748 0.569718 2.77799 1.0162 2.36221L1.0162 2.36221L1.017 2.36146L2.3168 1.14036L2.3176 1.13961L2.32254 1.13502C2.66371 0.830725 3.05644 0.676636 3.45467 0.676636C3.85304 0.676636 4.23759 0.830785 4.56671 1.13412L4.56661 1.13423L4.57317 1.13987C4.81574 1.34838 5.05209 1.57183 5.28054 1.79164C5.39772 1.90798 5.52203 2.02374 5.63915 2.13281L5.64067 2.13423L6.68497 3.10671C7.04691 3.44376 7.20783 3.81023 7.20783 4.15629C7.20783 4.50235 7.04691 4.86882 6.68497 5.20587C6.63065 5.25646 6.57646 5.30782 6.5232 5.3583L6.5227 5.35877C6.46901 5.40967 6.41626 5.45966 6.36365 5.50866L6.36365 5.50865L6.36243 5.5098C6.33513 5.53556 6.30783 5.56136 6.28051 5.58718C6.02264 5.83085 5.76267 6.07651 5.48445 6.31348L5.33719 6.4389L5.42164 6.61294C5.66678 7.11816 6.00155 7.60957 6.48886 8.18317L6.48884 8.18319L6.49115 8.18583C7.49321 9.33237 8.54225 10.2232 9.70032 10.9082L9.70249 10.9094C9.82305 10.9791 9.96152 11.0436 10.0947 11.1056L10.0991 11.1076C10.1334 11.1243 10.1669 11.1402 10.2 11.1561C10.2632 11.1862 10.325 11.2158 10.3888 11.2477L10.5438 11.3255L10.6709 11.2075L11.8797 10.0854L11.88 10.0851C12.226 9.76293 12.6182 9.60358 13.0179 9.60358C13.4205 9.60358 13.8073 9.76573 14.1368 10.0852ZM15.0776 15.2531L15.076 15.2547C15.0775 15.2533 15.0787 15.2522 15.0776 15.2531ZM15.8564 13.8324L15.6836 13.6535C15.7466 13.5922 15.7994 13.5309 15.8418 13.4698C15.8538 13.4803 15.8654 13.4925 15.8761 13.5065C15.9145 13.5567 15.9274 13.6123 15.9274 13.6581C15.9274 13.74 15.8884 13.7948 15.8711 13.816C15.8663 13.8219 15.8614 13.8273 15.8564 13.8324ZM15.8558 13.8348C16.0763 13.6209 16.2232 13.3726 16.2224 13.0933C16.2217 12.8121 16.0718 12.5664 15.8464 12.3585C15.8463 12.3583 15.8461 12.3582 15.8459 12.358L13.7391 10.396L13.7389 10.3962L13.7391 10.396L13.7354 10.3926C13.595 10.2506 13.3411 10.0618 13.0102 10.0618C12.6722 10.0618 12.4057 10.2624 12.2622 10.396L10.954 11.6143C10.8957 11.6686 10.7585 11.7931 10.5429 11.7931C10.4581 11.7931 10.3724 11.7748 10.2727 11.7287L10.267 11.7255C10.2636 11.7235 10.2574 11.7199 10.2508 11.7162C10.2466 11.7139 10.2416 11.7112 10.2359 11.7083C10.1172 11.6403 9.98164 11.5772 9.85118 11.5165L9.84514 11.5136C9.69063 11.4417 9.5409 11.3718 9.39622 11.2863L9.39596 11.2862C8.19402 10.5783 7.10112 9.65259 6.0607 8.45905L6.05215 8.44925L6.04975 8.44701C5.48635 7.77948 5.12249 7.22757 4.8651 6.64946L4.85749 6.6282C4.82752 6.53941 4.80958 6.4574 4.81974 6.37567C4.82904 6.30086 4.86498 6.20179 4.99067 6.08474L5.00487 6.07151C5.3412 5.79041 5.6497 5.50305 5.96945 5.19824C6.04444 5.13074 6.11945 5.06007 6.19254 4.99122C6.22855 4.95731 6.26408 4.92383 6.29892 4.89139C6.52467 4.68116 6.68265 4.43788 6.68265 4.15629C6.68265 3.8747 6.52467 3.63142 6.29892 3.42119L5.25602 2.45001C5.19506 2.39148 5.13421 2.33392 5.0746 2.27753L5.0729 2.27593C5.01207 2.21839 4.95257 2.1621 4.89414 2.10593L15.8558 13.8348Z" stroke="#E5E5E5" stroke-width="0.5"/>
                </svg>
                <p id={styles.clinic_list_item_right_phone}>+996 777 77 77 77</p>
              </div>
            </div>
          </div>

          <div id={styles.clinic_list_item}>           
            <div className={styles.clinic_list_item_left}>
              <div className={styles.clinic_list_item_imagegroup}>
                <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
                <p>Stars</p>
              </div>
              <div className={styles.clinic_list_item_textgroup}>
                <p id={styles.clinic_list_item_textgroup_title}>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</p>
                <p id={styles.clinic_list_item_textgroup_article1}>Медицинский центр «MEDCENTER.KG» — это многопрофильная клиника, расположенная в самом центре Бишкека.</p>
                <p id={styles.clinic_list_item_textgroup_article2}>Здесь вы можете получить консультации специалистов различного профиля, прием ведут: Доктора медицинских наук, профессора, отличники здравоохранения и врачи высшей и первой категории.</p>
                <p id={styles.clinic_list_item_textgroup_article3}>Медицинский центр.kg оснащен отличной диагностической базой, где проводятся лабораторные, ультразвуковые, эндоскопические, электрофизиологические обследования на современном оборудовании.</p>
                <Link id={styles.clinic_list_item_textgroup_link} to="/clinic">Ещё</Link>
                <div id={styles.clinic_list_item_textgroup_doctors}>
                  <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                  <p>20 врачей</p>
                </div>
              </div>
            </div>
            <div className={styles.clinic_list_item_right}>
              <div id={styles.clinic_list_item_right_addressgroup}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0)">
                  <path d="M10.3594 5.84375C10.3594 4.81844 9.52531 3.98438 8.5 3.98438C7.47469 3.98438 6.64062 4.81844 6.64062 5.84375C6.64062 6.86906 7.47469 7.70312 8.5 7.70312C9.52531 7.70312 10.3594 6.86906 10.3594 5.84375ZM7.17188 5.84375C7.17188 5.11142 7.76767 4.51562 8.5 4.51562C9.23233 4.51562 9.82812 5.11142 9.82812 5.84375C9.82812 6.57608 9.23233 7.17188 8.5 7.17188C7.76767 7.17188 7.17188 6.57608 7.17188 5.84375Z" fill="#E5E5E5"/>
                  <path d="M8.48991 17.1442L8.69258 16.9065C8.9242 16.6356 14.3623 10.2151 14.3437 6.03792C14.3294 2.70858 11.708 0 8.5 0C5.2777 0 2.65625 2.70911 2.65625 6.03898C2.65625 10.2149 8.058 16.6348 8.28803 16.906L8.48991 17.1442ZM8.5 0.53125C11.4163 0.53125 13.7995 3.00262 13.8125 6.04031C13.8284 9.58056 9.48972 15.0957 8.49123 16.3173C7.49806 15.0944 3.1875 9.58109 3.1875 6.03898C3.1875 3.00209 5.57069 0.53125 8.5 0.53125Z" fill="#E5E5E5"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="17" height="17" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                <p id={styles.clinic_list_item_right_address}>г.Бишкек, улица Чокморова, 154</p>
              </div>
              <div id={styles.clinic_list_item_right_timegroup}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 0C3.825 0 0 3.825 0 8.5C0 13.175 3.825 17 8.5 17C13.175 17 17 13.175 17 8.5C17 3.825 13.175 0 8.5 0ZM8.5 15.3C4.76 15.3 1.7 12.24 1.7 8.5C1.7 4.76 4.76 1.7 8.5 1.7C12.24 1.7 15.3 4.76 15.3 8.5C15.3 12.24 12.24 15.3 8.5 15.3Z" fill="#E5E5E5"/>
                  <path d="M8.9249 4.25H7.6499V9.35L12.0699 12.07L12.7499 10.965L8.9249 8.67V4.25Z" fill="#E5E5E5"/>
                </svg>
                <p id={styles.clinic_list_item_right_time1}>пн-пт: 00:00 - 24:00</p>
              </div>
              <p id={styles.clinic_list_item_right_time2}>сб: 00:00 - 24:00</p>
              <p id={styles.clinic_list_item_right_time3}>вс: 00:00 - 24:00</p>          
              <div id={styles.clinic_list_item_right_phonegroup}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.02081 1.63779L4.19119 1.45484C4.05107 1.32436 3.79699 1.13844 3.46232 1.13844C3.18893 1.13844 2.93388 1.26296 2.71633 1.45314L2.71625 1.45305L2.7105 1.4584L1.40608 2.67312C1.04528 3.00911 0.843692 3.41096 0.799612 3.89121L0.79953 3.89214C0.737561 4.59617 0.880396 5.328 1.24482 6.23671C1.83554 7.72293 2.72547 9.10091 4.04454 10.5814L4.04534 10.5823C5.64856 12.3645 7.5781 13.7708 9.77458 14.761L9.77561 14.7614C10.5731 15.1166 11.6629 15.5456 12.8459 15.6162C12.846 15.6162 12.8461 15.6162 12.8462 15.6162L12.861 15.3666C12.9184 15.3702 12.9796 15.3702 13.037 15.3702C13.6337 15.3702 14.089 15.1885 14.4753 14.8038L4.02081 1.63779ZM4.02081 1.63779L4.19119 1.45484L4.19693 1.46019L4.19959 1.46267L4.02081 1.63779ZM14.1368 10.0852L14.1368 10.0852L14.1401 10.0884L16.2402 12.0512L16.2414 12.0523C16.5863 12.3703 16.75 12.7309 16.75 13.0904C16.75 13.4481 16.5885 13.8138 16.2484 14.1433L16.2479 14.1439C16.0873 14.3004 15.9222 14.4507 15.7591 14.5955L15.7591 14.5955L15.7577 14.5968C15.7393 14.6133 15.7209 14.6299 15.7025 14.6465C15.4833 14.8438 15.2626 15.0425 15.0686 15.2614L15.0641 15.2665C15.0624 15.2682 15.0606 15.2701 15.0588 15.2721C15.0567 15.2744 15.0543 15.2771 15.0519 15.28C14.5228 15.8093 13.8501 16.0784 13.0332 16.0784C12.9636 16.0784 12.8856 16.0752 12.8052 16.0716C11.5406 15.9957 10.4009 15.5521 9.52781 15.1668C7.25696 14.1445 5.2698 12.6942 3.61792 10.8574C2.25243 9.32868 1.34438 7.91053 0.737649 6.3864L0.737642 6.38638C0.488305 5.76017 0.178527 4.83732 0.264699 3.8585C0.320043 3.27748 0.569718 2.77799 1.0162 2.36221L1.0162 2.36221L1.017 2.36146L2.3168 1.14036L2.3176 1.13961L2.32254 1.13502C2.66371 0.830725 3.05644 0.676636 3.45467 0.676636C3.85304 0.676636 4.23759 0.830785 4.56671 1.13412L4.56661 1.13423L4.57317 1.13987C4.81574 1.34838 5.05209 1.57183 5.28054 1.79164C5.39772 1.90798 5.52203 2.02374 5.63915 2.13281L5.64067 2.13423L6.68497 3.10671C7.04691 3.44376 7.20783 3.81023 7.20783 4.15629C7.20783 4.50235 7.04691 4.86882 6.68497 5.20587C6.63065 5.25646 6.57646 5.30782 6.5232 5.3583L6.5227 5.35877C6.46901 5.40967 6.41626 5.45966 6.36365 5.50866L6.36365 5.50865L6.36243 5.5098C6.33513 5.53556 6.30783 5.56136 6.28051 5.58718C6.02264 5.83085 5.76267 6.07651 5.48445 6.31348L5.33719 6.4389L5.42164 6.61294C5.66678 7.11816 6.00155 7.60957 6.48886 8.18317L6.48884 8.18319L6.49115 8.18583C7.49321 9.33237 8.54225 10.2232 9.70032 10.9082L9.70249 10.9094C9.82305 10.9791 9.96152 11.0436 10.0947 11.1056L10.0991 11.1076C10.1334 11.1243 10.1669 11.1402 10.2 11.1561C10.2632 11.1862 10.325 11.2158 10.3888 11.2477L10.5438 11.3255L10.6709 11.2075L11.8797 10.0854L11.88 10.0851C12.226 9.76293 12.6182 9.60358 13.0179 9.60358C13.4205 9.60358 13.8073 9.76573 14.1368 10.0852ZM15.0776 15.2531L15.076 15.2547C15.0775 15.2533 15.0787 15.2522 15.0776 15.2531ZM15.8564 13.8324L15.6836 13.6535C15.7466 13.5922 15.7994 13.5309 15.8418 13.4698C15.8538 13.4803 15.8654 13.4925 15.8761 13.5065C15.9145 13.5567 15.9274 13.6123 15.9274 13.6581C15.9274 13.74 15.8884 13.7948 15.8711 13.816C15.8663 13.8219 15.8614 13.8273 15.8564 13.8324ZM15.8558 13.8348C16.0763 13.6209 16.2232 13.3726 16.2224 13.0933C16.2217 12.8121 16.0718 12.5664 15.8464 12.3585C15.8463 12.3583 15.8461 12.3582 15.8459 12.358L13.7391 10.396L13.7389 10.3962L13.7391 10.396L13.7354 10.3926C13.595 10.2506 13.3411 10.0618 13.0102 10.0618C12.6722 10.0618 12.4057 10.2624 12.2622 10.396L10.954 11.6143C10.8957 11.6686 10.7585 11.7931 10.5429 11.7931C10.4581 11.7931 10.3724 11.7748 10.2727 11.7287L10.267 11.7255C10.2636 11.7235 10.2574 11.7199 10.2508 11.7162C10.2466 11.7139 10.2416 11.7112 10.2359 11.7083C10.1172 11.6403 9.98164 11.5772 9.85118 11.5165L9.84514 11.5136C9.69063 11.4417 9.5409 11.3718 9.39622 11.2863L9.39596 11.2862C8.19402 10.5783 7.10112 9.65259 6.0607 8.45905L6.05215 8.44925L6.04975 8.44701C5.48635 7.77948 5.12249 7.22757 4.8651 6.64946L4.85749 6.6282C4.82752 6.53941 4.80958 6.4574 4.81974 6.37567C4.82904 6.30086 4.86498 6.20179 4.99067 6.08474L5.00487 6.07151C5.3412 5.79041 5.6497 5.50305 5.96945 5.19824C6.04444 5.13074 6.11945 5.06007 6.19254 4.99122C6.22855 4.95731 6.26408 4.92383 6.29892 4.89139C6.52467 4.68116 6.68265 4.43788 6.68265 4.15629C6.68265 3.8747 6.52467 3.63142 6.29892 3.42119L5.25602 2.45001C5.19506 2.39148 5.13421 2.33392 5.0746 2.27753L5.0729 2.27593C5.01207 2.21839 4.95257 2.1621 4.89414 2.10593L15.8558 13.8348Z" stroke="#E5E5E5" stroke-width="0.5"/>
                </svg>
                <p id={styles.clinic_list_item_right_phone}>+996 777 77 77 77</p>
              </div>
            </div>
          </div>

          <div id={styles.clinic_list_item}>           
            <div className={styles.clinic_list_item_left}>
              <div className={styles.clinic_list_item_imagegroup}>
                <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
                <p>Stars</p>
              </div>
              <div className={styles.clinic_list_item_textgroup}>
                <p id={styles.clinic_list_item_textgroup_title}>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</p>
                <p id={styles.clinic_list_item_textgroup_article1}>Медицинский центр «MEDCENTER.KG» — это многопрофильная клиника, расположенная в самом центре Бишкека.</p>
                <p id={styles.clinic_list_item_textgroup_article2}>Здесь вы можете получить консультации специалистов различного профиля, прием ведут: Доктора медицинских наук, профессора, отличники здравоохранения и врачи высшей и первой категории.</p>
                <p id={styles.clinic_list_item_textgroup_article3}>Медицинский центр.kg оснащен отличной диагностической базой, где проводятся лабораторные, ультразвуковые, эндоскопические, электрофизиологические обследования на современном оборудовании.</p>
                <Link id={styles.clinic_list_item_textgroup_link} to="/clinic">Ещё</Link>
                <div id={styles.clinic_list_item_textgroup_doctors}>
                  <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                  <p>20 врачей</p>
                </div>
              </div>
            </div>
            <div className={styles.clinic_list_item_right}>
              <div id={styles.clinic_list_item_right_addressgroup}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0)">
                  <path d="M10.3594 5.84375C10.3594 4.81844 9.52531 3.98438 8.5 3.98438C7.47469 3.98438 6.64062 4.81844 6.64062 5.84375C6.64062 6.86906 7.47469 7.70312 8.5 7.70312C9.52531 7.70312 10.3594 6.86906 10.3594 5.84375ZM7.17188 5.84375C7.17188 5.11142 7.76767 4.51562 8.5 4.51562C9.23233 4.51562 9.82812 5.11142 9.82812 5.84375C9.82812 6.57608 9.23233 7.17188 8.5 7.17188C7.76767 7.17188 7.17188 6.57608 7.17188 5.84375Z" fill="#E5E5E5"/>
                  <path d="M8.48991 17.1442L8.69258 16.9065C8.9242 16.6356 14.3623 10.2151 14.3437 6.03792C14.3294 2.70858 11.708 0 8.5 0C5.2777 0 2.65625 2.70911 2.65625 6.03898C2.65625 10.2149 8.058 16.6348 8.28803 16.906L8.48991 17.1442ZM8.5 0.53125C11.4163 0.53125 13.7995 3.00262 13.8125 6.04031C13.8284 9.58056 9.48972 15.0957 8.49123 16.3173C7.49806 15.0944 3.1875 9.58109 3.1875 6.03898C3.1875 3.00209 5.57069 0.53125 8.5 0.53125Z" fill="#E5E5E5"/>
                  </g>
                  <defs>
                  <clipPath id="clip0">
                  <rect width="17" height="17" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                <p id={styles.clinic_list_item_right_address}>г.Бишкек, улица Чокморова, 154</p>
              </div>
              <div id={styles.clinic_list_item_right_timegroup}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 0C3.825 0 0 3.825 0 8.5C0 13.175 3.825 17 8.5 17C13.175 17 17 13.175 17 8.5C17 3.825 13.175 0 8.5 0ZM8.5 15.3C4.76 15.3 1.7 12.24 1.7 8.5C1.7 4.76 4.76 1.7 8.5 1.7C12.24 1.7 15.3 4.76 15.3 8.5C15.3 12.24 12.24 15.3 8.5 15.3Z" fill="#E5E5E5"/>
                  <path d="M8.9249 4.25H7.6499V9.35L12.0699 12.07L12.7499 10.965L8.9249 8.67V4.25Z" fill="#E5E5E5"/>
                </svg>
                <p id={styles.clinic_list_item_right_time1}>пн-пт: 00:00 - 24:00</p>
              </div>
              <p id={styles.clinic_list_item_right_time2}>сб: 00:00 - 24:00</p>
              <p id={styles.clinic_list_item_right_time3}>вс: 00:00 - 24:00</p>          
              <div id={styles.clinic_list_item_right_phonegroup}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.02081 1.63779L4.19119 1.45484C4.05107 1.32436 3.79699 1.13844 3.46232 1.13844C3.18893 1.13844 2.93388 1.26296 2.71633 1.45314L2.71625 1.45305L2.7105 1.4584L1.40608 2.67312C1.04528 3.00911 0.843692 3.41096 0.799612 3.89121L0.79953 3.89214C0.737561 4.59617 0.880396 5.328 1.24482 6.23671C1.83554 7.72293 2.72547 9.10091 4.04454 10.5814L4.04534 10.5823C5.64856 12.3645 7.5781 13.7708 9.77458 14.761L9.77561 14.7614C10.5731 15.1166 11.6629 15.5456 12.8459 15.6162C12.846 15.6162 12.8461 15.6162 12.8462 15.6162L12.861 15.3666C12.9184 15.3702 12.9796 15.3702 13.037 15.3702C13.6337 15.3702 14.089 15.1885 14.4753 14.8038L4.02081 1.63779ZM4.02081 1.63779L4.19119 1.45484L4.19693 1.46019L4.19959 1.46267L4.02081 1.63779ZM14.1368 10.0852L14.1368 10.0852L14.1401 10.0884L16.2402 12.0512L16.2414 12.0523C16.5863 12.3703 16.75 12.7309 16.75 13.0904C16.75 13.4481 16.5885 13.8138 16.2484 14.1433L16.2479 14.1439C16.0873 14.3004 15.9222 14.4507 15.7591 14.5955L15.7591 14.5955L15.7577 14.5968C15.7393 14.6133 15.7209 14.6299 15.7025 14.6465C15.4833 14.8438 15.2626 15.0425 15.0686 15.2614L15.0641 15.2665C15.0624 15.2682 15.0606 15.2701 15.0588 15.2721C15.0567 15.2744 15.0543 15.2771 15.0519 15.28C14.5228 15.8093 13.8501 16.0784 13.0332 16.0784C12.9636 16.0784 12.8856 16.0752 12.8052 16.0716C11.5406 15.9957 10.4009 15.5521 9.52781 15.1668C7.25696 14.1445 5.2698 12.6942 3.61792 10.8574C2.25243 9.32868 1.34438 7.91053 0.737649 6.3864L0.737642 6.38638C0.488305 5.76017 0.178527 4.83732 0.264699 3.8585C0.320043 3.27748 0.569718 2.77799 1.0162 2.36221L1.0162 2.36221L1.017 2.36146L2.3168 1.14036L2.3176 1.13961L2.32254 1.13502C2.66371 0.830725 3.05644 0.676636 3.45467 0.676636C3.85304 0.676636 4.23759 0.830785 4.56671 1.13412L4.56661 1.13423L4.57317 1.13987C4.81574 1.34838 5.05209 1.57183 5.28054 1.79164C5.39772 1.90798 5.52203 2.02374 5.63915 2.13281L5.64067 2.13423L6.68497 3.10671C7.04691 3.44376 7.20783 3.81023 7.20783 4.15629C7.20783 4.50235 7.04691 4.86882 6.68497 5.20587C6.63065 5.25646 6.57646 5.30782 6.5232 5.3583L6.5227 5.35877C6.46901 5.40967 6.41626 5.45966 6.36365 5.50866L6.36365 5.50865L6.36243 5.5098C6.33513 5.53556 6.30783 5.56136 6.28051 5.58718C6.02264 5.83085 5.76267 6.07651 5.48445 6.31348L5.33719 6.4389L5.42164 6.61294C5.66678 7.11816 6.00155 7.60957 6.48886 8.18317L6.48884 8.18319L6.49115 8.18583C7.49321 9.33237 8.54225 10.2232 9.70032 10.9082L9.70249 10.9094C9.82305 10.9791 9.96152 11.0436 10.0947 11.1056L10.0991 11.1076C10.1334 11.1243 10.1669 11.1402 10.2 11.1561C10.2632 11.1862 10.325 11.2158 10.3888 11.2477L10.5438 11.3255L10.6709 11.2075L11.8797 10.0854L11.88 10.0851C12.226 9.76293 12.6182 9.60358 13.0179 9.60358C13.4205 9.60358 13.8073 9.76573 14.1368 10.0852ZM15.0776 15.2531L15.076 15.2547C15.0775 15.2533 15.0787 15.2522 15.0776 15.2531ZM15.8564 13.8324L15.6836 13.6535C15.7466 13.5922 15.7994 13.5309 15.8418 13.4698C15.8538 13.4803 15.8654 13.4925 15.8761 13.5065C15.9145 13.5567 15.9274 13.6123 15.9274 13.6581C15.9274 13.74 15.8884 13.7948 15.8711 13.816C15.8663 13.8219 15.8614 13.8273 15.8564 13.8324ZM15.8558 13.8348C16.0763 13.6209 16.2232 13.3726 16.2224 13.0933C16.2217 12.8121 16.0718 12.5664 15.8464 12.3585C15.8463 12.3583 15.8461 12.3582 15.8459 12.358L13.7391 10.396L13.7389 10.3962L13.7391 10.396L13.7354 10.3926C13.595 10.2506 13.3411 10.0618 13.0102 10.0618C12.6722 10.0618 12.4057 10.2624 12.2622 10.396L10.954 11.6143C10.8957 11.6686 10.7585 11.7931 10.5429 11.7931C10.4581 11.7931 10.3724 11.7748 10.2727 11.7287L10.267 11.7255C10.2636 11.7235 10.2574 11.7199 10.2508 11.7162C10.2466 11.7139 10.2416 11.7112 10.2359 11.7083C10.1172 11.6403 9.98164 11.5772 9.85118 11.5165L9.84514 11.5136C9.69063 11.4417 9.5409 11.3718 9.39622 11.2863L9.39596 11.2862C8.19402 10.5783 7.10112 9.65259 6.0607 8.45905L6.05215 8.44925L6.04975 8.44701C5.48635 7.77948 5.12249 7.22757 4.8651 6.64946L4.85749 6.6282C4.82752 6.53941 4.80958 6.4574 4.81974 6.37567C4.82904 6.30086 4.86498 6.20179 4.99067 6.08474L5.00487 6.07151C5.3412 5.79041 5.6497 5.50305 5.96945 5.19824C6.04444 5.13074 6.11945 5.06007 6.19254 4.99122C6.22855 4.95731 6.26408 4.92383 6.29892 4.89139C6.52467 4.68116 6.68265 4.43788 6.68265 4.15629C6.68265 3.8747 6.52467 3.63142 6.29892 3.42119L5.25602 2.45001C5.19506 2.39148 5.13421 2.33392 5.0746 2.27753L5.0729 2.27593C5.01207 2.21839 4.95257 2.1621 4.89414 2.10593L15.8558 13.8348Z" stroke="#E5E5E5" stroke-width="0.5"/>
                </svg>
                <p id={styles.clinic_list_item_right_phone}>+996 777 77 77 77</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </>
  )
}

export default ClinicsSearch;

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