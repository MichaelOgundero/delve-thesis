import React, {Component} from 'react'
import './AppHome.css';
import Appbar from '../../navigationbar/Appbar.js';
import Appcarousel from '../carousel/Appcarousel.js';
import AppNowPlaying from '../nowplaying/AppNowPlaying.js';
import AppUpcoming from '../upcoming/AppUpcoming.js';
import AppMovieOfTheDay from '../movieofday/AppMovieOfTheDay.js';
import AppTrending from '../trending/AppTrending.js'
import AppFooter from '../../footer/AppFooter.js'




class AppHome extends Component{
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
          <Appcarousel/>
          <AppNowPlaying/>
          <AppUpcoming/>
          <AppMovieOfTheDay/>
          <AppTrending/>
        <br></br>
        <br></br>
        <br></br>
          <AppFooter/>
        </div>
      </div>
    )
  }
  
}

export default AppHome;
