import React, {Component} from 'react'
import './AppSearch.css';
import Appbar from '../navigationbar/Appbar.js';
import AppFooter from '../footer/AppFooter.js'
import AppSearchContent from './searchcontent/AppSearchContent.js'


class AppSearch extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true
    }
  }


  render(){

    return(
      <div className="page-container">
        <div className="content-wrap">
          <Appbar/>
          <AppSearchContent/>
          <br></br>
          <br></br>
          <AppFooter/>
        </div>
      </div>
    )
  }
  
}

export default AppSearch;
