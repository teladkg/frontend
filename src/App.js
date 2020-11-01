import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './components/main/mainPage';
import Search from './components/search/search';
import ClinicsSearch from './components/clinics-search/clinicsSearch';
import Clinic from './components/profile-clinic/clinic';
import Doctor from './components/profile-doctor/doctor';
import Map from './components/map/map';
import Registration from './components/registration/registration';
import Login from './components/login/login';
import Specialties from './components/specialties/specialties';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact path = "/"
          component = {MainPage}
        />
        <Route
          exact path = "/search"
          component = {Search}
        />
        <Route
          exact path = "/clinics-search"
          component = {ClinicsSearch}
        />
        <Route
          exact path = "/clinic"
          component = {Clinic}
        />
        <Route
          exact path = "/doctor"
          component = {Doctor}
        />
        <Route
          exact path = "/map"
          component = {Map}
        />
        <Route
          exact path = "/registration"
          component = {Registration}
        />
        <Route
          exact path = "/login"
          component = {Login}
        />
        <Route
          exact path = "/specialties"
          component = {Specialties}
        />
      </Switch>
    </div>
  );
}

export default App;