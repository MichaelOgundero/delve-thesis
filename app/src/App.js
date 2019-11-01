import React, {Component} from 'react'
import './App.css';
import AppHome from './home/homepage/AppHome.js'
import AppTodaysFifty from './todaysfifty/AppTodaysFifty.js'
import { Switch, Route } from 'react-router-dom';

import AppSearch from './search/AppSearch.js';



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      searchValue: ""
    }

    this.getSearchValue = this.getSearchValue.bind(this);
    this.getHome = this.getHome.bind(this);
    this.getSearch = this.getSearch.bind(this);
  }

  getSearchValue(value){
    this.setState({
      searchValue: value
    })
  }
  
  
  getHome(){
    return (
        <AppHome getSearchValue={this.getSearchValue}/>
    )
  }

  getTodaysFifty(){
    return (
      <AppTodaysFifty/>
    )
  }

  getSearch(){
    return (
      <AppSearch searchvalue = {this.state.searchValue}/>
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
        </Switch>
      </div>
    )
  }
  
}

export default App;
