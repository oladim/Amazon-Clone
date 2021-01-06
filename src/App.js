import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { connect } from 'react-redux';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe("Stripe Public API Key");


function App (props) {

  useEffect(() =>{
    // runs once when app component loads...
    auth.onAuthStateChanged(authUser => {
      // console.log("the user is ", authUser);
      if(authUser){
        //the user just logged in / or was logged in
        props.dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        //the user is logged out
        props.dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
    
      }, []);
        
  


 
    

  return (
  
    <Router>
        {/* <Header /> */}
    <div className="App">
    <Switch>
        <Route path='/orders'>
           <Header /> 
           <Orders />
        </Route>
        <Route exact path='/login' component={Login}></Route>
        <Route path='/checkout'>
           <Header /> 
           <Checkout />
        </Route>
        <Route path='/payment'>
          <Header />
          <Elements stripe={promise}>
           <Payment />
           </Elements>
        </Route>
        <Route path='/'>
           <Header /> 
           <Home />
        </Route>
    </Switch>
    
    </div>
    </Router>
  );
}


function mapStateToProps(reduxState){
  return {
    carts: reduxState.carts
  }
}
export default connect(mapStateToProps)(App);
