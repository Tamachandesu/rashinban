import React, { Component } from 'react';
import Calendar from '../melecules/Calendar';
import axios from 'axios';


export default class Home extends Component{
    constructor(props) {
        super(props);
        //this.props.getUser(this.props.token);
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.token !== this.props.token) {
            //this.getClients();
        }
    }
    componentWillReceiveProps() {
        
    }

  

    render() {
        // if(this.props.user) {
        //     return null;
        // } else {
            return (
                <div>
                    <Calendar user={this.props.user} token={this.props.token}/>
                </div>
            )
       // }
    }

    
}


