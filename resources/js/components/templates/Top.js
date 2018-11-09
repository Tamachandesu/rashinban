import React, { Component } from 'react';
import Heading from '../melecules/Heading';
import Home from '../organisms/Home';
import Signin from '../organisms/Signin';
import Signup from '../organisms/Signup';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Indicator from '../atoms/Indicator';


export default class Top extends Component {
    constructor() {
		super();
		this.state = {
			isAuthenticated: false,
			token: null,
			user: null,
			loading: false,
		};
		this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);
		this.refresh = this.refresh.bind(this);
		this.getUser = this.getUser.bind(this);
    }

    componentWillMount() {
		const lsToken = localStorage.getItem('jwt'); 
		if (lsToken) {
			this.authenticate(lsToken);
		} 
    }
    

    
    authenticate(token) {
		const user = this.getUser(token);
        this.setState({
            isAuthenticated: true,
			token: token,
			user: user
		});
        localStorage.setItem('jwt', token);
    }
    
    logout() {
		// TODO logout時、localStrage内のToken破棄
        this.setState({
            isAuthenticated: false,
			token: null,
			user: null
        });
    }
    
    refresh() {
		return axios.get('/api/refreshToken', {
			headers: { 'Authorization': 'Bearer ' + this.state.token }
		})
		.then((response) => {
			const token = response.data.token;
			this.authenticate(token);
		})
		.catch((error) => {
			console.log('Error!', error);
		});
	}

	getUser(token) {
		let user = null;
		this.setState({loading:true}, () =>{
			axios.get('/api/user', {
				headers: { 'Authorization': 'Bearer ' + token }
				})
			.then((response) => {
				user = response.data.user.id;
				this.setState({
					user: user,
					loading: false,
				});
				console.log(user);
			})
			.catch((error) => {
				console.log(error);
				this.refresh();
			});
		})
	}

    render() {
        return (
            <BrowserRouter>
                <div>
				    <Heading isAuthenticated={this.state.isAuthenticated} logout={this.logout}/>
					<PrivateRoute exact path='/' component={Home} isAuthenticated={this.state.isAuthenticated} user={this.state.user} token={this.state.token} refresh={this.refresh} loading={this.state.loading} />
                    <Route exact path='/signin' render={(props) => <Signin authenticate={this.authenticate} isAuthenticated={this.state.isAuthenticated} getUser={this.getUser} {...props} />} />
                    <Route exact path='/signup' render={(props) => <Signup authenticate={this.authenticate} isAuthenticated={this.state.isAuthenticated} {...props} />} />
                </div>
                
            </BrowserRouter>
        )
    }

}
const PrivateRoute = ({ component: Component, isAuthenticated, token, user, loading, ...rest }) => (
	!loading ? (
		<Route {...rest} render={props => (
			isAuthenticated ? (
				<Component {...props} {...rest} token={token} isAuthenticated={isAuthenticated} user={user}/>
			) : (
				<Redirect to={{
					pathname: '/signin',
					state: { from: props.location }
				}} />
			)
		)} />

	) : (
		<Indicator />
	)
);