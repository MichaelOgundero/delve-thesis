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
      isLoading: true
    }
  }

  handler =(somevalue)=> {
    this.setState({
      isLoading: somevalue
    })
  }
  
  
  
 

  render(){

    
  
    return(
      <div>
         <Switch>
          <Route exact path='/' component={AppHome}></Route>
          <Route exact path='/todays50' component={AppTodaysFifty}></Route>
          <Route exact path='/search' component={AppSearch} ></Route>
        </Switch>
      </div>
    )
  }
  
}

export default App;
