import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { userActions } from '../../../redux/auth/_actions';
import { getSpecialties } from '../../../redux/actions/actions'

import Header from '../../header/header';
import Footer from '../../footer/footer';

import './pc-doctor.css';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkMaterial from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { makeStyles } from '@material-ui/core/styles';

import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'
import "@reach/combobox/styles.css";
import Geocode from "react-geocode";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { CircleArrow as ScrollUpButton} from "react-scroll-up-button";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { kaReducer, Table } from 'ka-table';
import { closeEditor, updateCellValue } from 'ka-table/actionCreators';
import { DataType, EditingMode } from 'ka-table/enums';
import DoneIcon from '@material-ui/icons/Done';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';


const center = {
  lat: 42.867695,
  lng: 74.610897
};
const libraries = ["places"];


const PCDoctorEdit = (props) => {

  /* FOR FETCH-DATA TO COMPONENT STATE */
  const [editState, setEditState] = useState({});

  /* FOR SPECIALTIES TO COMPONENT STATE */
  const [inputValue, setInputValue] = useState("");

  /* FOR GOOGLEMAP LOCALSTATE ONCHANGE */
  const [locationsState, setLocationsState] = useState([]);

  /* FOR TABLE LOCAL STATE */
  const [tableProps, changeTableProps] = useState({});
  /* FOR IF TABLE CAME EMPTY FROM FETCH */
  const [tableArr, setTableArr] = useState();

  useEffect(() => {
    // window.scrollTo(0, 0)
    props.getPCDoctor();
    props.getSpecialties();
  }, []);

  useEffect(() => {
    // window.scrollTo(0, 0)
    setEditState(props.data);
  }, [props]);


  // const [avatar, setAvatar] = useState('');
  // const setAvatarImage = e => {
  //   if (avatar === '') {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatar({
  //           image: reader.result
  //         })
  //       }
  //     }
  //     reader.readAsDataURL(avatar);
  //   }
  // }

  // let formData = new FormData();
  const { register, handleSubmit, control, setValue } = useForm();
  const onSubmit = (data, event) => {
    const specialtiesIds = data.specialties.map((e)=> {
      return { id: e.id }
    })

    let patchData = {
      user: {
        first_name: data.firstname,
        last_name: data.lastname,
        patronymic: data.patronymic,
        extra_phones: [data.extra_phone]
      },
      description: data.description,
      started_working: data.started_working,
      locations: [ 
        editState.locations[0] &&
        editState.locations[0].latitude === locationsState.latitude &&
        editState.locations[0].longitude === locationsState.longitude 
        ? {
          id: editState.locations[0].id,
          latitude: locationsState.latitude,
          longitude: locationsState.longitude,
          address: locationsState.address
        }
        : locationsState.length === 0 ? {
          id: editState.locations[0].id,
          latitude: editState.locations[0].latitude,
          longitude: editState.locations[0].longitude,
          address: editState.locations[0].address
        } : {
          latitude: locationsState.latitude,
          longitude: locationsState.longitude,
          address: locationsState.address
        }
      ],
      specialty: specialtiesIds,
      schedules: tableProps.data
      // .map((item) => {
      //   delete item.id;
      //   return item;
      // })
    }
    // console.log(data.specialties);
    props.editPCDoctor(patchData);
    // console.log(patchData);
  }
  console.log(tableProps.data);


    // const dataArray = [
  //   { id: 1, A: '10:10-14:00', B:'', C:'', D:'', E:'', F:'', G:'', appointment: "CLINIC" },
  //   { id: 2, A: '10:10-14:00', B:'', C:'', D:'', E:'', F:'', G:'', appointment: "HOME" },
  //   { id: 3, A: '10:10-14:00', B:'', C:'', D:'', E:'', F:'', G:'', appointment: "ONLINE" },
  // ];
  // {
  //   appointment: "CLINIC",
  //   monday: "10:10-20:10",
  //   tuesday: "",
  //   wednesday: "",
  //   thursday: "10:10-20:10",
  //   friday: "",
  //   saturday: "",
  //   sunday: "",
  // }

  // const dataArray = editState && editState.schedules;
  // console.log(dataArray);

  const CustomLookupEditor = ({
    column, dispatch, rowKeyValue, value,
  }) => {
    const close = () => {
      dispatch(closeEditor(rowKeyValue, column.key));
    };
    const [editorValue, setValue] = useState(value);
    return (
      <div>
        <select
          className='form-control'
          autoFocus={true}
          defaultValue={editorValue}
          onBlur={() => {
            dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
            close();
          }}
          onChange={(event) => {
            setValue(event.currentTarget.value);
          }}
        >
          <option value="">Выберите тип приема</option>
          <option value={'В клинике'}>В клинике</option>
          <option value={'На выезд'}>На выезд</option>
          <option value={'Онлайн'}>Онлайн</option>
        </select>
      </div >
    );
  };
  const CustomEditor = ({
    column, rowKeyValue, dispatch, value,
  }) => {
    const close = () => {
      dispatch(closeEditor(rowKeyValue, column.key));
    };
    const [editorValue, setValue] = useState(value);
    return (
      <div className='custom-editor'>
        <input
          className='form-control'
          type='text'
          value={editorValue}
          onChange={(event) => setValue(event.currentTarget.value)}/>
        <button className='custom-editor-button custom-editor-button-save'
          onClick={() => {
            dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
            close();
          }}>
            <DoneIcon />
          </button>
        <button className='custom-editor-button custom-editor-button-cancel' onClick={close}><CloseSharpIcon /></button>
      </div>
    );
  };
  // const tablePropsInit = {
  //   columns: [
  //     { dataType: DataType.String, key: 'monday', title: 'ПН' },
  //     { dataType: DataType.String, key: 'tuesday', title: 'ВТ' },
  //     { dataType: DataType.String, key: 'wednesday', title: 'СР' },
  //     { dataType: DataType.String, key: 'thursday', title: 'ЧТ' },
  //     { dataType: DataType.String, key: 'friday', title: 'ПТ' },
  //     { dataType: DataType.String, key: 'saturday', title: 'СБ' },
  //     { dataType: DataType.String, key: 'sunday', title: 'ВС' },
  //   ],
  //   data: editState && editState.schedules,
  //   editableCells: [],
  //   editingMode: EditingMode.Cell,
  //   rowKeyField: 'id',
  // };

  
  useEffect(()=> {
    setTableArr([
      { appointment: 1, monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "" },
      { appointment: 2, monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "" },
      { appointment: 3, monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "" }
    ])
    changeTableProps({
      columns: [
        { dataType: DataType.String, key: 'monday', title: 'ПН' },
        { dataType: DataType.String, key: 'tuesday', title: 'ВТ' },
        { dataType: DataType.String, key: 'wednesday', title: 'СР' },
        { dataType: DataType.String, key: 'thursday', title: 'ЧТ' },
        { dataType: DataType.String, key: 'friday', title: 'ПТ' },
        { dataType: DataType.String, key: 'saturday', title: 'СБ' },
        { dataType: DataType.String, key: 'sunday', title: 'ВС' },
      ],
      data: (editState && editState.schedules && editState.schedules.length!==0) ? editState.schedules : tableArr,
      editableCells: [],
      editingMode: EditingMode.Cell,
      rowKeyField: 'appointment',
    })
  },[editState]);
  const dispatch = (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
  };


  useEffect(() => {
    props.data.specialty &&
    setValue("specialties", props.data.specialty);
  }, [setValue]);


  /* GOOGLE MAPS */
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCLhoRTvmMAP14kkJuL1BW9K03HuLpBytU",
    libraries
  })
  Geocode.setApiKey("AIzaSyCLhoRTvmMAP14kkJuL1BW9K03HuLpBytU");
  Geocode.setLanguage("ru");
  Geocode.setRegion("ky-KG");
  Geocode.enableDebug();
  const [marker, setMarker] = useState({});
  const [selected, setSelected] = useState(null);
  const onMapCLick = (event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    handleMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    toggleAddress(event.latLng.lat(), event.latLng.lng())
  };
  const handleMarker = marker => {
    // setEditState({...editState, 
    //   locations: [{
    //     ...editState.locations[0],
    //     latitude: marker.lat,
    //     longitude: marker.lng,
    //   }]
    // })
    setLocationsState({...locationsState,
      latitude: marker.lat,
      longitude: marker.lng
    })
    console.log(marker);
  }
  const toggleAddress = (e) => {
    console.log(marker);
    Geocode.fromLatLng(marker.lat, marker.lng)
    .then(
      response => {
        const mapAddress = response.results[0].formatted_address;
        // setEditState({...editState, 
        //   locations: [{
        //     ...editState.locations[0],
        //     address: mapAddress,
        //   }]
        // })
        setLocationsState({...locationsState,
          address: mapAddress
        })
      },
      error => {
        console.error(error);
      }
    );
    console.log(editState);
  }
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);


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


  /* FOR TABS */
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  
  const userData = props.data;
  // console.log(avatar);
  console.log(editState);

  const specialtiesData = props.specialties.results;
  console.log(locationsState);

  
  return (
    <>
      <Header />

      <section className="personal_doctor_page">

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        <ToastContainer />

        <Breadcrumbs aria-label="breadcrumb">
          <LinkMaterial color="inherit" onClick={handleClick}>
            <Link id="personal_doctor_page_breadcrumb_passive" to="/">Главная</Link>
          </LinkMaterial>
          <LinkMaterial
            color="textPrimary"
            onClick={handleClick}
            aria-current="page"
          >
            <Link id="personal_doctor_page_breadcrumb_active" to="/pc-doctor/info">Мой кабинет</Link>
          </LinkMaterial>
        </Breadcrumbs>

        <h1 id="personal_doctor_page_title">Мой кабинет</h1>
        {
          editState && editState.user && specialtiesData &&
          <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <div className="personal_doctor_page_main">
              <div className="personal_doctor_page_main_left">
                <div id="personal_doctor_page_doctors_data">
                  <div className="personal_doctor_page_doctors_data_imagegroup">
                    <img id="personal_doctor_page_doctors_data_image" src={editState.user.avatar == null ? require('../../../content/images/main/image_10.png') : editState.user.avatar} alt="clinic pic"/>
                    <div className="personal_doctor_page_doctors_data_image_buttongroup">
                      <label id="personal_doctor_page_doctors_data_image_deletebutton_label">
                        <input type="button" id="personal_doctor_page_doctors_data_image_deletebutton" />
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.4375 2.3125H5.25C5.35313 2.3125 5.4375 2.22812 5.4375 2.125V2.3125H12.5625V2.125C12.5625 2.22812 12.6469 2.3125 12.75 2.3125H12.5625V4H14.25V2.125C14.25 1.29766 13.5773 0.625 12.75 0.625H5.25C4.42266 0.625 3.75 1.29766 3.75 2.125V4H5.4375V2.3125ZM17.25 4H0.75C0.335156 4 0 4.33516 0 4.75V5.5C0 5.60313 0.084375 5.6875 0.1875 5.6875H1.60312L2.18203 17.9453C2.21953 18.7445 2.88047 19.375 3.67969 19.375H14.3203C15.1219 19.375 15.7805 18.7469 15.818 17.9453L16.3969 5.6875H17.8125C17.9156 5.6875 18 5.60313 18 5.5V4.75C18 4.33516 17.6648 4 17.25 4ZM14.1398 17.6875H3.86016L3.29297 5.6875H14.707L14.1398 17.6875Z" fill="#00AFCA"/>
                        </svg>
                      </label>
                      <label id="personal_doctor_page_doctors_data_image_editbutton_label">
                        <input type="button" id="personal_doctor_page_doctors_data_image_editbutton" />
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.5795 4.54667L17.6662 0.613334C17.4076 0.356044 17.0577 0.211609 16.6929 0.211609C16.3281 0.211609 15.9781 0.356044 15.7196 0.613334L1.84622 14.4667L0.57955 19.9333C0.535854 20.1332 0.537352 20.3402 0.583934 20.5394C0.630516 20.7386 0.721005 20.9249 0.848792 21.0846C0.976578 21.2443 1.13843 21.3735 1.32253 21.4627C1.50663 21.5518 1.70833 21.5988 1.91288 21.6C2.0082 21.6096 2.10424 21.6096 2.19955 21.6L7.72622 20.3333L21.5795 6.49333C21.8368 6.23474 21.9813 5.88479 21.9813 5.52C21.9813 5.15521 21.8368 4.80526 21.5795 4.54667ZM7.05955 19.1333L1.87955 20.22L3.05955 15.14L13.4396 4.8L17.4396 8.8L7.05955 19.1333ZM18.3329 7.83333L14.3329 3.83333L16.6529 1.52667L20.5862 5.52667L18.3329 7.83333Z" fill="#00AFCA"/>
                        </svg>
                      </label>
                    </div>
                  </div>
                  <div id="personal_doctor_page_doctors_data_info">
                    <TextField defaultValue={editState.user.last_name} id="personal_doctor_page_doctors_data_info_lastname" 
                                label="Фамилия" variant="outlined" name="lastname" 
                                inputRef={register({minLength: 1, maxLength: 30})}
                    /> 
                    <TextField defaultValue={editState.user.first_name} id="personal_doctor_page_doctors_data_info_firstname" 
                                label="Имя" variant="outlined" name="firstname" 
                                inputRef={register({minLength: 1, maxLength: 30})}
                    />
                    <TextField defaultValue={editState.user.patronymic} id="personal_doctor_page_doctors_data_info_patronymic" 
                                label="Отчество" variant="outlined" name="patronymic" 
                                inputRef={register({maxLength: 30})}
                    /> 
                    <Controller
                      render={props => (
                        <Autocomplete
                          id="tags-outlined"
                          multiple
                          options={specialtiesData}
                          getOptionLabel={option => option.name}
                          getOptionSelected={(option, value) => option.name === value.name }
                          filterSelectedOptions
                          value={props.value}
                          onChange={(e, values) => setValue("specialties", values)}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                          }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Специальность"
                              name="specialties"
                              placeholder="Поиск"
                              variant="outlined"
                            />
                          )}
                        />
                      )}
                      // onChange={([event, data]) => {
                      //   return data;
                      // }}
                      control={control}
                      name="specialties"                     
                      defaultValue={editState.specialty}
                    />
                    {/* <div className="personal_doctor_page_doctors_data_info_chipgroup">
                      <Chip label="Психолог"/>
                      <Chip label="Психолог"/>
                      <Chip label="Психолог"/>
                    </div>                          */}
                    <TextField defaultValue={editState.started_working} id="personal_doctor_page_doctors_data_info_experience" 
                                label="Год начала работы" variant="outlined" name="started_working" 
                                inputRef={register({maxLength: 4})} inputProps={{maxLength:4}}
                    /> 
                    <TextField defaultValue={editState.user.extra_phones[0]} id="personal_doctor_page_doctors_data_info_phone" 
                                label="Дополнительный номер телефона" variant="outlined" name="extra_phone" 
                                inputRef={register({maxLength: 13})} inputProps={{maxLength:13}}
                    /> 
                    {/* <button id="personal_doctor_page_doctors_data_addbutton">Добавить номер</button>   */}
                    <Link id="cancel_link_button" to="/pc-doctor/info"><button id="personal_doctor_page_doctors_data_cancelbutton">Отмена</button></Link> 
                    <button type="submit" id="personal_doctor_page_doctors_data_savebutton">Сохранить</button>
                  </div>
                </div>
              </div>
              <div className="personal_doctor_page_main_right">
                <div className="personal_doctor_page_tabs_container">
                  <div className={classes.root}>
                    <AppBar position="static">
                      <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="О враче" {...a11yProps(0)} />
                        <Tab label="Карта" {...a11yProps(1)} />
                        <Tab label="Прием" {...a11yProps(2)} />
                      </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0}>
                      <div id="personal_doctor_page_tabs_about">
                        <TextField multiline defaultValue={editState.description} id="personal_doctor_page_tabs_about_info" 
                                    variant="outlined" name="description" 
                                    inputRef={register({maxLength: 500})} inputProps={{maxLength: 500}} 
                        />
                      </div>                 
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>                  
                      <div id="personal_doctor_page_tabs_map-container">
                        <Search panTo={panTo}/>
                        <GoogleMap
                          id="map"
                          center={center}
                          zoom={12}
                          onClick={onMapCLick}
                          onLoad={onMapLoad}
                        >
                          {/* <Locate panTo={panTo} /> */}
                          <Marker 
                            key={`${marker.lat}-${marker.lng}`} 
                            position={{ lat: marker.lat, lng: marker.lng }} 
                            onClick={() => {
                              setSelected(marker);
                            }}
                          />

                          {selected ? (
                            <InfoWindow 
                              position={{lat: selected.lat, lng: selected.lng}}
                              onCloseClick={() => {
                                setSelected(null);
                              }}
                            >
                              <div>
                                <p>lat: {selected.lat}</p>
                                <p>lng: {selected.lng}</p>
                              </div>
                            </InfoWindow>) : null
                          }
                        </GoogleMap>
                        
                      </div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                      <div className="personal_doctor_page_tabs_reception">
                        <div className="personal_doctor_page_tabs_reception_type">
                          <p id="personal_doctor_page_tabs_reception_type_title">Тип приема</p>
                          <table className="personal_doctor_page_tabs_reception_type_cells">
                            <tr id="personal_doctor_page_tabs_reception_type_cells_titles">
                              <th>В клинике</th>
                              <th>На дому</th>
                              <th>Онлайн</th>
                            </tr>
                            <tr id="personal_doctor_page_tabs_reception_type_cells_cost">
                              <td>500 сом</td>
                              <td>500 сом</td>
                              <td>500 сом</td>
                            </tr>
                          </table>
                        </div>
                        
                        <div className="personal_doctor_page_tabs_reception_schedule">
                          <p id="personal_doctor_page_tabs_reception_schedule_title">График работы</p>
                          {/* <table className="personal_doctor_page_tabs_reception_schedule_cells">
                            <tr id="personal_doctor_page_tabs_reception_schedule_cells_titles">
                              <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_1">ПН</th>
                              <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_2">ВТ</th>
                              <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_3">СР</th>
                              <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_4">ЧТ</th>
                              <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_5">ПТ</th>
                              <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_6">СБ</th>
                              <th id="personal_doctor_page_tabs_reception_schedule_cells_titles_7">ВС</th>
                            </tr>
                            <tr id="personal_doctor_page_tabs_reception_schedule_cells_cost">
                              {
                                editState.schedules.length!==0 ? 
                                editState.schedules.map((elem) => {
                                  return(
                                    <td id="personal_doctor_page_tabs_reception_schedule_cells_cost_addbutton_label">
                                      <p>{elem.appointment}</p>
                                      <p>{elem.time}</p>
                                    </td>
                                  )
                                })
                                : editState.schedules.map(() => {
                                  return(
                                    <td id="personal_doctor_page_tabs_reception_schedule_cells_cost_addbutton_label">
                                      <input type="button" id="personal_doctor_page_tabs_reception_schedule_cells_cost_addbutton" />
                                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0.46875C7.7072 0.46875 7.90591 0.55106 8.05243 0.697573C8.19894 0.844086 8.28125 1.0428 8.28125 1.25V7.5C8.28125 7.7072 8.19894 7.90591 8.05243 8.05243C7.90591 8.19894 7.7072 8.28125 7.5 8.28125H1.25C1.0428 8.28125 0.844086 8.19894 0.697573 8.05243C0.55106 7.90591 0.46875 7.7072 0.46875 7.5C0.46875 7.2928 0.55106 7.09409 0.697573 6.94757C0.844086 6.80106 1.0428 6.71875 1.25 6.71875H6.71875V1.25C6.71875 1.0428 6.80106 0.844086 6.94757 0.697573C7.09409 0.55106 7.2928 0.46875 7.5 0.46875Z" fill="#00AFCA"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.71875 7.5C6.71875 7.2928 6.80106 7.09409 6.94757 6.94757C7.09409 6.80106 7.2928 6.71875 7.5 6.71875H13.75C13.9572 6.71875 14.1559 6.80106 14.3024 6.94757C14.4489 7.09409 14.5312 7.2928 14.5312 7.5C14.5312 7.7072 14.4489 7.90592 14.3024 8.05243C14.1559 8.19894 13.9572 8.28125 13.75 8.28125H8.28125V13.75C8.28125 13.9572 8.19894 14.1559 8.05243 14.3024C7.90592 14.4489 7.7072 14.5312 7.5 14.5312C7.2928 14.5312 7.09409 14.4489 6.94757 14.3024C6.80106 14.1559 6.71875 13.9572 6.71875 13.75V7.5Z" fill="#00AFCA"/>
                                      </svg>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </table> */}
                          <Table
                            {...tableProps}
                            dispatch={dispatch}
                            childComponents={{
                              table: {
                                elementAttributes: () => ({
                                  className: 'custom-editor-demo-table'
                                })
                              },
                              cellEditor: {
                                content: (props) => {
                                  switch (props.column.key) {
                                    // case 'type': return <CustomLookupEditor {...props}/>;
                                    case 'monday':
                                    case 'tuesday':
                                    case 'wednesday':
                                    case 'thursday':
                                    case 'friday':
                                    case 'saturday': 
                                    case 'sunday': 
                                      return <CustomEditor {...props}/>;
                                    default: return;
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </div>
              </div>
            </div>
          </form>
        }
        
        <ScrollUpButton ShowAtPosition={350}/>

      </section>

      <Footer />
    </>
  )
}


const mapStateToProps = state => {
  const { loggingIn, loggedIn } = state.getPCDoctor;
  const { editing, edited } = state.editPCDoctor;
  return { 
    loggingIn, loggedIn, 
    data: state.getPCDoctor.data,
    editing, edited,
    specialties: state.getSpecialties.specialties
  }
}

const mapDispatchToProps = {
  getPCDoctor: userActions.getPCDoctor,
  editPCDoctor: userActions.editPCDoctor,
  getSpecialties
}


export default connect(mapStateToProps, mapDispatchToProps)(PCDoctorEdit);


/* FOR TABS */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


/* FOR BREADCRUMBS */
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img id="image-compass-button" src={require(`../../../content/images/edit/gps.svg`)} alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const { ready, value, suggestions: {status, data}, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 42.867695, lng: () => 74.610897 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
    console.log(address)
  };

  return (
    <div className="sixth-search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput 
          value={value} 
          onChange={handleInput}
          disabled={!ready}
          placeholder="Укажите адрес" 
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && 
              data.map(({id, description}) => (
                <ComboboxOption key={id} value={description} />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}