import React, {Component} from 'react'
import './AppTodaysFifty.css';
import Appbar from '../navigationbar/Appbar.js';
import AppFooter from '../footer/AppFooter.js'
import AppTodaysFiftyContent from './todaysfiftycontent/AppTodaysFiftyContent.js'


class AppTodaysFifty extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      searchValue: " "
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value){
    this.setState({searchValue: value});
    this.props.getSearchValue(value);
  }



  render(){

    return(
      <div className="page-container">
        <div className="content-wrap">
          <Appbar handleSearch={this.handleSearch}/>
          <AppTodaysFiftyContent />
          <br></br>
          <br></br>
          <AppFooter/>
        </div>
      </div>
    )
  }
  
}

export default AppTodaysFifty;
