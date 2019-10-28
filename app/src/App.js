import React, {Component} from 'react'
import './App.css';
import AppHome from './home/homepage/AppHome.js'
import AppTodaysFifty from './todaysfifty/AppTodaysFifty.js'
import { Switch, Route } from 'react-router-dom';



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
        </Switch>
      </div>
    )
  }
  
}

export default App;
