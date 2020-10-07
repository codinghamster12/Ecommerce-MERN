import React from 'react';
import './App.css';
import HomePage from './containers/HomePage'
import ProductsListPage from './containers/ProductsListPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/:slug" component={ProductsListPage}></Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
