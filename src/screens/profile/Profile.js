import React, {Component} from 'react';
import './Profile.css';
import Header from '../../common/header/Header';

class Profile extends Component{
    render(){
        return(
            <div>
                <Header paths={this.props} baseUrl={this.props.baseUrl} profile={0} showSearch = {false}/>
                <h2>Profile Page</h2>    
            </div>
        )
    }
}

export default Profile;
