import React,  {Component} from 'react';

import './AppFooter.css';

class AppFooter extends Component{

    render(){


        return(
            <div className="footer">
                <div className="vertical-center">
                    <p style={{paddingLeft:"300px", paddingtop:"10px"}}>©2019 Delve | All Rights Resevered</p>
                </div>
                
            </div>
        );
    }
}

export default AppFooter;