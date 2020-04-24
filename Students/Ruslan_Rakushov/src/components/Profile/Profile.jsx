import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { push } from "connected-react-router";
import {
  Card, CardContent, CardActions, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, 
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import { extend } from 'immutability-helper';
// import { red } from '@material-ui/core/colors';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { setUserInfo } from '../../store/actions/profileActions.js';

//TODO add styles
const useStyles = (theme => ({
  root: {
    minWidth: 275,
    width: '550px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  profileTable: {
    width: '300px',
    borderCollapse: 'collapse',
    '& tr:not(:last-child)': {
      borderBottom: '1px solid lightgrey',
    },
    '& td:first-child': {
      width: '100px',
      borderRight: '1px solid lightgrey',
    }
  },
  infoBtn: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  returnBtn: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'column',
  },
}));

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      userAge: 0,
      userNameErr: false,
      userEmailErr: false,
      userAgeErr: false,
      openDialog: false,
    };
  }

  handleSetUserInfoClick = () => {
    this.setState({
      openDialog: true,
    });
  }
  handleSetUserInfoCancel = () => {
    this.setState({
      openDialog: false,
    });
  }
  handleSetUserInfoSave = (userName, userEmail, userAge) => {
    if (!userName || !userEmail || !userAge) {
      this.setState({
        userNameErr: !userName,
        userEmailErr: !userEmail,
        userAgeErr: !userAge,
      });
      return;
    }
    this.props.setUserInfo(userName, userEmail, userAge);
    this.setState({
      openDialog: false,
    });
  }
  handleDelUserInfoClick = () => {
    this.setState({
      userNameErr: '',
      userEmailErr: '',
      userAgeErr: 0,
    });
    this.props.setUserInfo('', '', 0);
  }
  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSetUserInfoSave(this.state.userName, this.state.userEmail, this.state.userAge);
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
      if (!!evt.target.value) {
        this.setState({
          [`${evt.target.name}Err`]: !evt.target.value
        });
      }
    }
  };

  render() {
    const { classes, profile } = this.props;
    return (
      <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="inherit" gutterBottom
          component='h1'>
            User Profile
          </Typography>
          <Typography variant="h5" component="h2">
            {profile.userName}
          </Typography>
          <table className= {classes.profileTable}>
            <tbody>
              <tr>
                <td>User name</td>
                <td>{ profile.userName }</td>
              </tr>
              <tr>
                <td>User e-mail</td>
                <td>{ profile.userEmail }</td>
              </tr>
              <tr>
                <td>User age</td>
                <td>{profile.userAge ? profile.userAge : '' }</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
          <CardActions
            disableSpacing
            className={classes.actions}>
          <div className={classes.infoBtn}>
          <Button size="small"
              variant='outlined'
              onClick={this.handleSetUserInfoClick}>
              Ввести информацию о себе
          </Button>
          <Button size="small"
              variant='outlined'
              onClick={this.handleDelUserInfoClick}>
              Удалить информацию о себе
          </Button>
          </div>
          <div className={classes.returnBtn}>
          <Button size="small"
              variant='outlined'
              onClick={() => this.props.push(`/chat/${this.props.currentChatId}`)}>
              Вернуться к чатам...
          </Button>
          </div>
        </CardActions>
        </Card>
        
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleSetUserInfoCancel}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Введите информацию о себе:</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="userName"
              name="userName"
              label="Имя пользователя"
              type="text"
              fullWidth
              required
              error={this.state.userNameErr}
              value={this.state.userName}
              onChange = {this.handleChange}
              onKeyUp = {this.handleChange}
              />
            <TextField
              margin="dense"
              id="userEmail"
              name="userEmail"
              label="Адрес электронной почты"
              type="email"
              fullWidth
              required
              error={this.state.userEmailErr}
              value={this.state.userEmail}
              onChange = {this.handleChange}
              onKeyUp = {this.handleChange}
            />
            <TextField
              margin="dense"
              id="userAge"
              name="userAge"
              label="Ваш возраст"
              required
              error={this.state.userAgeErr}
              type="number"
              value={this.state.userAge}
              onChange = {this.handleChange}
              onKeyUp = {this.handleChange}
            />
          </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSetUserInfoCancel} color="primary">
            Отмена
          </Button>
          <Button onClick={() => this.handleSetUserInfoSave(this.state.userName, this.state.userEmail, this.state.userAge)}
            color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
};

const mapStateToProps = ({ chatReducer, profileReducer }) => ({
  currentChatId: chatReducer.currentChatId,
  profile: profileReducer.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    push,
    setUserInfo,
  },
  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Profile));