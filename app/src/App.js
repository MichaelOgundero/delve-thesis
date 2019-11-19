import React, {Component} from 'react'
import './App.css';
import AppHome from './home/homepage/AppHome.js'
import AppTodaysFifty from './todaysfifty/AppTodaysFifty.js'
import AppMovieDetails from './moviedetails/AppMovieDetails.js'
import AppSignUp from './signup/AppSignUp.js'
import AppSignIn from './signin/AppSignIn.js'
import UserPage from './userpage/UserPage.js'

import { Switch, Route } from 'react-router-dom';

import AppSearch from './search/AppSearch.js';



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      searchValue: "",
      seeMoreValue: '',
      username: ""
    }

    this.getSearchValue = this.getSearchValue.bind(this);
    this.getHome = this.getHome.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.getTodaysFifty = this.getTodaysFifty.bind(this);
    this.getDetails = this.getDetails.bind(this);
    this.getSignUp = this.getSignUp.bind(this);
    this.getSignIn = this.getSignIn.bind(this);
    this.getSeeMoreValue = this.getSeeMoreValue.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.getUserPage = this.getUserPage.bind(this);
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

  getUsername(value){
    this.setState({
      username: value
    })
  }
  
  getHome(){
    return (
        <AppHome getSearchValue={this.getSearchValue} getSeeMoreValue={this.getSeeMoreValue} username={this.state.username}/>
    )
  }

  getTodaysFifty(){
    return (
      <AppTodaysFifty getSearchValue={this.getSearchValue} getSeeMoreValue={this.getSeeMoreValue} username={this.state.username}/>
    )
  }

  getSearch(){
    return (
      <AppSearch searchvalue = {this.state.searchValue}  getSearchValue={this.getSearchValue} getSeeMoreValue={this.getSeeMoreValue} username={this.state.username}/>
    )
  }

  getDetails(){
    return(
      <AppMovieDetails getSeeMoreValue={this.getSeeMoreValue}  seeMoreValue={this.state.seeMoreValue}  getSearchValue={this.getSearchValue} username={this.state.username}/>
    )
  }

  getSignUp(){
    return(
      <AppSignUp   getUsername={this.getUsername}/>
    )
  }

  getSignIn(){
    return(
      <AppSignIn/>
    )
  }

  getUserPage(){
    return(
      <UserPage getSearchValue={this.getSearchValue}/>
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
          <Route exact path= "/userpage" component={this.getUserPage}></Route>
        </Switch>
      </div>
    )
  }
  
}

export default App;
