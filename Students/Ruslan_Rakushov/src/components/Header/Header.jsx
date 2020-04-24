// TODO Fix автофокус после поиска убегает на поле сообщения
// FIX При поиске 'l' находит сообщения без нее...

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { push } from "connected-react-router";
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton, Typography, Badge, TextField, 
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { setSearchText } from "../../store/actions/messageActions.js";
import { loadChats } from "../../store/actions/chatActions.js";
import { loadProfile } from "../../store/actions/profileActions.js";

const useStyles = (theme => ({
  root: {},
  appbar: {
    backgroundColor: 'skyblue',
    maxWidth: '600px',
    right: 'auto',
  },
  menuButton: {},
  title: {},
  rightMenu: {
    marginLeft: 'auto',
  },
  searchField: {
    position: 'absolute',
    right: '0px',
    bottom: '-25px',
    backgroundColor: 'lightgrey',
    opacity: '.9',
    width: '245px',
  },
}));

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchVisible: false,
    }
  }
  static propTypes = {
    chats: PropTypes.array.isRequired,
    currentChatId: PropTypes.string,
    profile: PropTypes.object.isRequired,
  };
  static defaultProps = {
    currentChatId: '',
  };

  handleAccBtnClick = () => {
    this.props.push('/profile/');
  };

  handleSeachBtnClick = () => {
    this.setState({
      isSearchVisible: !this.state.isSearchVisible,
    });
  };

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSearch(evt.target.value);
    } else if (evt.keyCode === 27) {
      this.handleSearch('');
      this.setState({
        isSearchVisible: !this.state.isSearchVisible,
      });
    }
  };

  handleSearch = (str) => {
    this.props.setSearchText(str);
  };

  componentDidMount() {
    this.props.loadChats();
    this.props.loadProfile();
  };

  render() {
    const { classes} = this.props;
    const { chats, currentChatId, profile } = this.props;
    const currentChat = chats.find(chat => chat._id === currentChatId);
    const currentChatTitle = currentChat ? currentChat.title : '';
    
    return (
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              ReactGram &copy; {currentChatTitle}
            </Typography>
            <div className={classes.rightMenu}>
              {profile.userName}
              <IconButton aria-label="search" color="inherit"
                onClick={this.handleSeachBtnClick}
                >
                <SearchIcon/>
              </IconButton>
              {/* <IconButton aria-label="notifications" color="inherit">
                <Badge badgeContent={2} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton aria-label="account" color="inherit"
                onClick={this.handleAccBtnClick}>
                <AccountCircle/>
              </IconButton>
            </div>
          </Toolbar>
        {this.state.isSearchVisible &&
          <TextField
          name='searchText'
          className={classes.searchField}
          size='small'
          variant='outlined'
          autoFocus
          label='Enter - поиск, Esc - отмена'
          onChange = {this.handleChange}
          onKeyUp = {this.handleChange}
          />}
        </AppBar>
    );
  };
}

const mapStateToProps = ({ chatReducer, profileReducer }) => ({
  chats: chatReducer.chats,
  currentChatId: chatReducer.currentChatId,
  profile: profileReducer.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  setSearchText,
  loadChats,
  loadProfile,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Header));
