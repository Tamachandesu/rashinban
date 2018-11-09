import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
      },
      typography: {
        useNextVariants: true,
      },
})

const Form = ({
    formName,
    formType,
    displayWord,
    value,
    onChange
}) => {
    return (
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor={formName}>{displayWord}</InputLabel>
            <Input
                name={formName}
                type={formType}
                value={value}
                onChange={onChange}
                id={formName}
                autoComplete={formName}
                />
        </FormControl>
    );
}
export default withStyles(styles)(Form);