import React, {Component} from 'react'
import './AppMovieDetails.css';
import Appbar from '../navigationbar/Appbar.js';
import AppFooter from '../footer/AppFooter.js'
import AppMovieDetailsContent from './moviedetailscontent/AppMovieDetailsContent.js'


class AppMovieDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      searchValue: " "
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

    return(
      <div className="page-container" style={{background:"#fec106"}}>
        <div className="content-wrap">
          <Appbar handleSearch={this.handleSearch} username={this.props.username}/>
          <AppMovieDetailsContent handleSeeMore={this.handleSeeMore} seeMoreValue = {this.props.seeMoreValue}/>
          <br></br>
          <br></br>
          <AppFooter/>
        </div>
      </div>
    )
  }
  
}

export default AppMovieDetails;