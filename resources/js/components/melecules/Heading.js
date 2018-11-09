import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
    

    const { classes } = props;
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <Sidebar />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
                <Link to="/" style={{ textDecoration: 'none', color:'inherit'}}>
                    Rashinban
                </Link>
            </Typography>
            {props.isAuthenticated ? 
                <div>
                    <Link style={{ textDecoration: 'none', color:'inherit'}} to="#" onClick={props.logout}>Sign Out</Link>
                </div>
                : 
                <div> 
                    <Link style={{ textDecoration: 'none', color:'inherit'}} to="/signin">Sign In</Link>
                    <Link style={{ textDecoration: 'none', color:'inherit'}} to="/signup">Sign Up</Link>
                </div>
            }

            </Toolbar>
        </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);