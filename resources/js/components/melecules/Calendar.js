import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import axios from 'axios';
import styles from 'react-big-calendar/lib/css/react-big-calendar.css';
import ReserveForm from './ReserveForm';
import { Select } from '@material-ui/core';


class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      events: [],
      displayFormFlg: false,
      // 以降のやつeventsに包みたい
      id: "",
      end: "",
      start: "",
      user: "",
      title: "",
      memo: "",
      users: []
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.getSchedules = this.getSchedules.bind(this);
    this.handleCloseSelected = this.handleCloseSelected.bind(this);
  }
  
  componentDidMount() {
    this.getSchedules();
    this.getUsers();
  }

  getUsers() {
		axios.get('/api/users', {
			headers: { 'Authorization': 'Bearer ' + this.state.token }
		})
		.then((response) => {
			const users = response.data;
      console.log(users);
      this.setState({
        users: users,
      })
      console.log("state");
      console.log(this.state);
		})
		.catch((error) => {
			console.log(error);
		});
	}

  getSchedules() {
    const token = this.props.token;   
    const user_id = this.props.user;
    axios('api/user/' + user_id + '/schedule', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then((response) => {
      let schedules = response.data;
      let events = [];
      schedules.forEach( schedule => {
        let start_at = new Date(schedule.start);
        let end_at = new Date(schedule.end);
        let id = "";
        if(schedule.id) {
          id = schedule.id;
        }
        events.push({
          id: id,
          end: end_at,
          start: start_at,
          title: schedule.title,
          memo: schedule.memo,
        });
      });
      this.setState({
        events: events,
        user: user_id
      })
    })
    .catch((error) => {
      const status = error.response.status;
      console.debug(status);
    })
  }

  handleCloseSelected() {
    this.setState((prevState) => ({
      displayFormFlg: !prevState.displayFormFlg,
      id: "",
    }))
  }

  handleSelect(date){
    let toDoubleDigits = function(num) {
      num += "";
      if (num.length === 1) {
        num = "0" + num;
      }
     return num;     
    };
    if(!date.title){
      const start_month = date.start.getMonth() + 1;
      const start_date = date.start.getFullYear() + "-" + toDoubleDigits(start_month) + "-" + toDoubleDigits(date.start.getDate());
      const start_time = toDoubleDigits(date.start.getHours()) + ":" + toDoubleDigits(date.start.getMinutes());
      const start = start_date + "T"+ start_time;
      const end_month = date.end.getMonth() + 1;
      const end_date = date.end.getFullYear() + "-" + toDoubleDigits(end_month) + "-" + toDoubleDigits(date.end.getDate());
      const end_time = toDoubleDigits(date.end.getHours()) + ":" + toDoubleDigits(date.end.getMinutes());
      const end = end_date + "T" + end_time;
      this.setState((prevState) => ({
        displayFormFlg: !prevState.displayFormFlg,
        user: this.state.user,
        start: start,
        end: end,
        title: "",
        memo: "",
      }))
    } else {
      const start_month = date.start.getMonth() + 1;
      const start_date = date.start.getFullYear() + "-" + toDoubleDigits(start_month) + "-" + toDoubleDigits(date.start.getDate());
      const start_time = toDoubleDigits(date.start.getHours()) + ":" + toDoubleDigits(date.start.getMinutes());
      const start = start_date + "T"+ start_time;
      const end_month = date.end.getMonth() + 1;
      const end_date = date.end.getFullYear() + "-" + toDoubleDigits(end_month) + "-" + toDoubleDigits(date.end.getDate());
      const end_time = toDoubleDigits(date.end.getHours()) + ":" + toDoubleDigits(date.end.getMinutes());
      const end = end_date + "T" + end_time;
      this.setState((prevState) => ({
        displayFormFlg: !prevState.displayFormFlg,
        user: this.state.user,
        start: start,
        end: end,
        title: date.title,
        memo: date.memo,
        id: date.id,
      }))
    }
  }

  render() {
    const localizer  = BigCalendar.momentLocalizer(moment);
    return (
      <div>
        <div>
          <BigCalendar
            selectable
            localizer={localizer}
            events={this.state.events}
            onSelectEvent={event => this.handleSelect(event)}
            onSelectSlot={this.handleSelect}
          />
        </div>

        <div>
          <ReserveFormPresenter 
            flg={this.state.displayFormFlg}
            user={this.state.user}
            id={this.state.id}
            title={this.state.title}
            memo={this.state.memo}
            handleSelect={this.handleSelect}
            handleCloseSelected={this.handleCloseSelected}
            start_date={this.state.start}
            end_date={this.state.end}
            getSchedules={this.getSchedules}
            users={this.state.users}
          />
        </div>
      </div>
    )
  }
}

const ReserveFormPresenter = ({
  flg,
  user,
  users,
  id,
  title,
  memo,
  handleSelect,
  handleCloseSelected,
  start_date,
  end_date,
  getSchedules
}) => {
  return(
    flg ? (
      <ReserveForm
        flg={flg}
        user={user}
        // searchできるユーザー
        users={users}
        id={id}
        title={title}
        memo={memo}
        handleSelect={handleSelect}
        handleCloseSelected={handleCloseSelected}
        start_date={start_date}
        end_date={end_date}
        getSchedules={getSchedules}
        />
    ) : null
  )
}


export default Calendar;
