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
      isLoading: true,
      searchValue: " ",
      seeMoreValue:" "
    }
  
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSeeMore = this.handleSeeMore.bind(this);

  
  }

  handleSearch(value){
    this.setState({searchValue: value});
    this.props.getSearchValue(value);
  }

  handleSeeMore(value){
    this.setState({seeMoreValue: value});
    this.props.getSeeMoreValue(value);
  }

 



  
  render(){

    console.log(this.state.seeMoreValue + " got it")
   // this.sendSearchValue()

    

    return(
      <div className="page-container">
        <div className="content-wrap">
          <Appbar handleSearch={this.handleSearch}/>
          <Appcarousel handleSeeMore={this.handleSeeMore}/>
          <AppNowPlaying handleSeeMore={this.handleSeeMore}/>
          <AppUpcoming/>
          <AppMovieOfTheDay handleSeeMore={this.handleSeeMore}/>
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
