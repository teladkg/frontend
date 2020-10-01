import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './components/main/mainPage';
import Search from './components/search/search';
import ClinicsSearch from './components/clinics-search/clinicsSearch';

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
      </Switch>
    </div>
  );
}

export default App;