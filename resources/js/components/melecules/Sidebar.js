import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { mailFolderListItems, otherMailFolderListItems } from '../atoms/Sidemenu';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

// TODO sidebarは左からくるしかないので、命名変える
class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {left:false}
    }

    toggleDrawer(side, open) {
        this.setState({
          [side]: open,
        });
      };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div>  
        <MenuIcon onClick={() => this.toggleDrawer('left', true)} />
        <Drawer open={this.state.left} onClose={() => this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer('left', false)}
            onKeyDown={() => this.toggleDrawer('left', false)}
          >
            
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);