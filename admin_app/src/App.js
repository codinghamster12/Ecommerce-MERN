import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home/index";
import Signin from "./containers/Signin/index";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Signup from "./containers/Signup/index";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData } from './actions';
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const category= useSelector(state => state.category);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData())

    
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <PrivateRoute path="/orders" component={Orders}></PrivateRoute>
        <PrivateRoute path="/products" component= {Products}></PrivateRoute>
        <PrivateRoute path="/category" component={Category}></PrivateRoute>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
    </div>
  );
}

export default App;
