import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './components/main/mainPage';
import Search from './components/search/search';
import ClinicsSearch from './components/clinics-search/clinicsSearch';
import Clinic from './components/profile-clinic/clinic';
import Doctor from './components/profile-doctor/doctor';

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
      </Switch>
    </div>
  );
}

export default App;