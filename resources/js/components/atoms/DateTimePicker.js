import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const DateAndTimePickers = ({
    label,
    value,
    onChange,
    name
}) => {
    return (
      <form className="container" noValidate>
        <TextField
            id="datetime-local"
            label={label}
            name={name}
            type="datetime-local"
            defaultValue={value}
            onChange={onChange}
            className="textField"
            InputLabelProps={{
                shrink: true,
            }}
        />
      </form>
    );
}

export default withStyles(styles)(DateAndTimePickers);