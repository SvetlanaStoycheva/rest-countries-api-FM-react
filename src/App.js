import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import SingleCountry from './pages/SingleCountryPage';
import SingleCountryPage from './pages/SingleCountryPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/contries/:id' children={<SingleCountryPage />} />
      </Switch>
    </Router>
  );
}

export default App;
