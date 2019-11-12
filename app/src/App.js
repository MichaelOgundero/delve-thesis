import React, {Component} from 'react'
import './App.css';
import AppHome from './home/homepage/AppHome.js'
import AppTodaysFifty from './todaysfifty/AppTodaysFifty.js'
import AppMovieDetails from './moviedetails/AppMovieDetails.js'
import AppSignUp from './signup/AppSignUp.js'
import AppSignIn from './signin/AppSignIn.js'

import { Switch, Route } from 'react-router-dom';

import AppSearch from './search/AppSearch.js';



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      searchValue: "",
      seeMoreValue: ''
    }

    this.getSearchValue = this.getSearchValue.bind(this);
    this.getHome = this.getHome.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.getTodaysFifty = this.getTodaysFifty.bind(this);
    this.getDetails = this.getDetails.bind(this);
    this.getSignUp = this.getSignUp.bind(this);
    this.getSignIn = this.getSignIn.bind(this);
    this.getSeeMoreValue = this.getSeeMoreValue.bind(this)
  }

  getSearchValue(value){
    this.setState({
      searchValue: value
    })
  }

  getSeeMoreValue(value){
    this.setState({
      seeMoreValue: value
    })
  }
  
  getHome(){
    return (
        <AppHome getSearchValue={this.getSearchValue} getSeeMoreValue={this.getSeeMoreValue}/>
    )
  }

  getTodaysFifty(){
    return (
      <AppTodaysFifty getSearchValue={this.getSearchValue} getSeeMoreValue={this.getSeeMoreValue} />
    )
  }

  getSearch(){
    return (
      <AppSearch searchvalue = {this.state.searchValue}  getSearchValue={this.getSearchValue} getSeeMoreValue={this.getSeeMoreValue}/>
    )
  }

  getDetails(){
    return(
      <AppMovieDetails getSeeMoreValue={this.getSeeMoreValue}  seeMoreValue={this.state.seeMoreValue}  getSearchValue={this.getSearchValue}/>
    )
  }

  getSignUp(){
    return(
      <AppSignUp   />
    )
  }

  getSignIn(){
    return(
      <AppSignIn/>
    )
  }
  
 

  render(){

    console.log(this.state.searchValue + "this is from app")
    
    return(
      <div>
         <Switch>
          <Route exact path='/' component={this.getHome}></Route>
          <Route exact path='/todays50' component={this.getTodaysFifty}></Route>
          <Route exact path= "/search" component={this.getSearch} ></Route>
          <Route exact path= "/signIn" component={this.getSignIn} ></Route>
          <Route exact path= "/signUp" component = {this.getSignUp}></Route>
          <Route exact path= "/details" component={this.getDetails} ></Route>
        </Switch>
      </div>
    )
  }
  
}

export default App;
