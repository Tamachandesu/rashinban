import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from '../atoms/Form';
import DateTimePicker from '../atoms/DateTimePicker';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import SearchList from '../atoms/SearchList';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

class ReserveForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      start: this.props.start_date,
      end: this.props.end_date,
      memo: this.props.memo,
      users: [this.props.user],
      //user: this.props.user,
      // selectされたユーザー
      //selectedUsers: [],
      repeat_settings: null,
      location: null,
    }
    // console.log("reserve form state")
    // console.log(this.state);
    // console.log("reserve form no props")
    // console.log(this.props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // componentDidMount() {
  //   console.log("reserveform no didmount");
  // }

  // componentWillUpdate() {
  //   console.log("reserveform no willupdate");
  // }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
    //console.log(this.state);
  }

  handleClose() {
    this.setState({
      title: "",
      start: "",
      end: "",
      memo: "",
      users: [],
      //user: [],
      repeat_settings: null,
      location: null,
    })
    this.props.handleCloseSelected();
  };

  handleSubmit(event) {
    event.preventDefault();
    if (!this.props.id) {
      axios.post('/api/schedule', {
        title: this.state.title,
        start: this.state.start,
        end: this.state.end,
        memo: this.state.memo,
        users: this.state.users,
      })
      .then((response) => {
        this.handleClose();
        this.props.getSchedules();
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          this.setState({ error: 'Username or password not recognised.' });
        }
      });
    } else {
      axios.patch('/api/schedule/' + this.props.id, {
        id: this.props.id,
        title: this.state.title,
        start: this.state.start,
        end: this.state.end,
        memo: this.state.memo,
        users: this.state.users,
      })
      .then((response) => {
        this.handleClose();
        this.props.getSchedules();
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          this.setState({error: "Username or password not recognised."});
        }
      });
    }
  }

  handleDelete(event) {
    event.preventDefault();
    axios.delete('/api/schedule/' + this.props.id, {
      params: {
        id: this.props.id,
        users: this.state.users,
      }
    })
    .then((response) => {
      this.handleClose();
      this.props.getSchedules();
    })
    .catch((error) => {
      const status = error.response.status;
      if (status === 401) {
        this.setState({error: "Username or password not recognised."});
      }
    })
  }


    render() {
        return (
          <MuiThemeProvider theme={theme}>
          <div className="reserve-form">
              <div>
                <Dialog
                  open={this.props.flg}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">予定登録</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      予定を登録してください
                    </DialogContentText>
                    <Form 
                        formName = 'title'
                        formType = 'text'
                        displayWord = 'Title'
                        value = {this.state.title}
                        onChange = {this.handleChange}
                    />

                    <DateTimePicker
                      label="Start" 
                      value={this.state.start}
                      onChange = {this.handleChange}
                      name="start"
                    />
                    <DateTimePicker
                      label="End" 
                      value={this.state.end}
                      onChange={this.handleChange}
                      name="end"
                    />
                    {/* <Form 
                        formName = 'User'
                        formType = 'text'
                        displayWord = 'User'
                        value = {this.state.user}
                        onChange = {this.handleChange}
                    /> */}

                    {/* ここ追加 */}
                     {/* <SearchList users={this.props.users}/> */}
                     {/* <Form 
                        formName = 'memo'
                        formType = 'text'
                        displayWord = 'Memo'
                        value = {this.state.memo}
                        onChange = {this.handleChange}
                    /> */}
                    <TextField
                      id="outlined-textarea"
                      label="Memo"
                      name='memo'
                      multiline
                      fullWidth
                      onChange= {this.handleChange}
                      value = {this.state.memo}
                      className="nikukutteruka"
                      margin="normal"
                      variant="outlined"
                    />
                    
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                      Register
                    </Button>
                    {this.props.id ?  
                      <div>
                        <Button onClick={this.handleDelete} color="secondary">
                          Delete
                        </Button>
                      </div>
                      : null
                    };

                  </DialogActions>
                </Dialog>
              </div>


          </div>
          </MuiThemeProvider>

        )
  }
}

export default ReserveForm;