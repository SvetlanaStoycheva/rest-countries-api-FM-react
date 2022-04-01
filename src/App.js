import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import SingleCountryPage from './pages/SingleCountryPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/contries/:id' children={<SingleCountryPage />} />
        <Route exact path='*'>
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
