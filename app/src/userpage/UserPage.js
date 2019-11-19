import React, {Component} from 'react'
import './UserPage.css';
import Appbar from '../navigationbar/Appbar.js';
import AppFooter from '../footer/AppFooter.js'
import UserPageContent from './userpagecontent/UserPageContent.js'

class UserPage extends Component{
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
        <div className="page-container" style={{background:"#fec106"}}>
            <div className="content-wrap">
                <Appbar handleSearch={this.handleSearch}/>
                <UserPageContent/>
                <br></br>
                <br></br>
                <AppFooter/>
            </div>
        </div>
        )

    }


}

export default UserPage;