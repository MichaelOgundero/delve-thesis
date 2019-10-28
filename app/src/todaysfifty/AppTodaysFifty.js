import React, {Component} from 'react'
import './AppTodaysFifty.css';
import Appbar from '../navigationbar/Appbar.js';
import AppFooter from '../footer/AppFooter.js'
import AppTodaysFiftyContent from './todaysfiftycontent/AppTodaysFiftyContent.js'


class AppTodaysFifty extends Component{
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
      <div className="page-container">
        <div className="content-wrap">
          <Appbar/>
          <AppTodaysFiftyContent/>
          <br></br>
          <br></br>
          <AppFooter/>
        </div>
      </div>
    )
  }
  
}

export default AppTodaysFifty;
