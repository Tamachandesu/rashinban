import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Form from '../atoms/Form';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

class Signin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
            error: '',
        };
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
	handleChange(event) {
		const name = event.target.name;
		this.setState({
			[name]: event.target.value
        });
	}

	handleSubmit(event) {
        event.preventDefault();
		axios.post('/api/signin', {
			email: this.state.email,
            password: this.state.password
        })
		.then((response) => {
			this.setState({ error: '' });
            const token = response.data.token;
            this.props.authenticate(token);
            this.props.getUser(token);
		})
		.catch((error) => {
			const status = error.response.status;
            if (status === 401) {
				this.setState({ error: 'Username or password not recognised.' });
            }
		});
	}

	render() {
        const { classes } = this.props;
		if (this.props.isAuthenticated && this.props.location.state !== undefined) {
			return (                
				<Redirect to={this.props.location.state.from} />
            );
		}
		return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                        <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="h5">Sign in</Typography>
                    {this.state.error !== '' ?
                        <p className="text-danger">{this.state.error}</p>
                        :
                        null
                    }
                    {this.props.isAuthenticated ?
                    <div>
                        <p className="text-info">You are already logged in.</p>
                        <Redirect to='/' ></Redirect>
                    </div>
                        :
					
                        <form onSubmit={this.handleSubmit} className={classes.form}>
                            <Form 
                                formName = 'email'
                                formType = 'email'
                                displayWord = 'Email'
                                value = {this.state.email}
                                onChange = {this.handleChange}
                            />
                            <Form 
                                formName = 'password'
                                formType = 'password'
                                displayWord = 'Password'
                                value = {this.state.password}
                                onChange = {this.handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                >
                                Sign in
                            </Button>

                        </form>
                    }
                    </Paper>
                    </main>
                    </React.Fragment>
		);
	}
}

export default withStyles(styles)(Signin);