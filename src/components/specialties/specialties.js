import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSpecialties, getCities, getFilterData, setFilterItems } from '../../redux/actions/actions';

import Header from '../header/header';
import Footer from '../footer/footer';

import './specialties.css';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

import AlpabetSorter from 'react-alphabet-sorter'


const Specialties = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getSpecialties();
    props.getCities();
  }, []);


  const [specParam, setSpecParam] = useState('');
  const [specsState, setSpecsState] = useState(null);


  useEffect(()=> {
    setSpecsState(props.specialties.results)
  }, [props.specialties.results])


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


  /* FOR SORTING DATA FROM BACKEND IN ASCENDING ORDER */ 
  const dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a,b) {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property]);
      } else{
        return a[property].localeCompare(b[property]);
      }        
    }
  }
  const specs = props.specialties.results && props.specialties.results.sort(dynamicSort('name'));
  /* FOR SETTING LETTERS IN ARRAY OF OBJECTS*/ 
  let specsAlph = specs && specs.reduce((r, e) => {
    let group = e.name[0];
    if(!r[group]) r[group] = {group, children: [e]}
    else r[group].children.push(e);
    return r;
  }, {})
  let specsResult = specsAlph && Object.values(specsAlph);


  /* FILTER */ 
  const filteredSpec = props.specialties.results && props.specialties.results.find(param => param.name === specParam);
  const setFilter = (event) => {
    setSpecParam(event.target.textContent);
  };
  console.log(filteredSpec);
  console.log(specsResult);

  return (
    <>
      <Header />

      <section className="specialties_page">

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="specialties_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="specialties_page_breadcrumb_active" to="/specialties">Специальности</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <h1 id="specialties_page_article1">Специальности</h1>

        <h4 id="specialties_page_article2">Поиск врача</h4>

        <div className="specialties_page_search_group">
          <Autocomplete
            id="grouped-demo"
            options={search_options1 && search_options1.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Врач, специальность" variant="outlined" />}
            onChange={setFilter}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options2 && search_options2.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Город" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options3 && search_options3.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: "26%" }}
            renderInput={(params) => <TextField {...params} label="Радиус" variant="outlined" />}
          />
          <Link to="/search"><button id="specialties_page_search_button">Найти</button></Link>
        </div>
        
        <div className="specialties_page_specialties">
          {
            filteredSpec ?
            <div id="specialties_page_specialties_item">
              <h1 id="">{filteredSpec.name.charAt(0)}</h1>
                <ul>
                  <Link to="/search"><li>{filteredSpec.name}</li><p>{filteredSpec.doctors_count}</p></Link>
                </ul>
            </div>
            : specsResult && specsResult.map(elems => {
              return(
                <>
                  <div id="specialties_page_specialties_item">
                    <h1 id="">{elems.group}</h1>
                    {
                      elems.children.map(elem => {
                        return(
                          <ul>
                            <Link to="/search"><li>{elem.name}</li><p>{elem.doctors_count}</p></Link>
                          </ul>
                        )
                      })
                    }
                  </div>
                </>
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
    data: state.getDoctors.data,
    specialties: state.getSpecialties.specialties,
    cities: state.getCities.cities,
  }
}

const mapDispatchToProps = {
  getSpecialties,
  getCities,
}


export default connect(mapStateToProps, mapDispatchToProps)(Specialties);


/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


/* DATA FOR AUTOCOMPLETE */
const radius = [
  { title: '500 м', id: 1 },
  { title: '1 км', id: 2 },
  { title: '3 км', id: 3 },
  { title: '5 км', id: 4 },
  { title: '10 км', id: 5 },
];