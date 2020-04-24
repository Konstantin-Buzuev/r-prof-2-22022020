import React, { Component } from 'react';

import { List, 
         ListItem, 
         ListItemAvatar, 
         ListItemText,
         Box,
         TextField,
         InputAdornment,
         Avatar,
         Icon,
         Badge, 
         Divider } from "@material-ui/core";
         
import { withStyles } from '@material-ui/core/styles'
import { indigo, purple, blue } from '@material-ui/core/colors';

const useStyles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    color: indigo["400"],
    padding: 0
  },
  item: {
    '&:link, $:visited': {
      color: indigo["400"],
    },
    '&:hover, &:active': {
       backgroundColor: theme.palette.hovered,
       color: theme.palette.common.white,
    },
    '&.Mui-selected': {
      backgroundColor: indigo["300"],
      color: blue["100"],
      '& .MuiAvatar-circle': {
        backgroundColor: indigo["50"],
        color: blue["300"],
      },
      '&:hover, &:active': {
        backgroundColor: purple["400"],
        color: purple["50"],
        '& .MuiAvatar-circle': {
          backgroundColor: purple["50"],
          color: purple["300"],
        },
      }
    },
  },
  avatar: {
    backgroundColor: theme.palette.common.white,
    color: indigo["300"]
  },
  foot: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary,
    padding: theme.spacing(2)
  },
  input: {
    autocomplete: "off",
    color: "#FFF59D", // Yellow_50["200"]
  }
});

const scrolledId = 'last_chat';
const defaultUserName = 'Я';
const defaultBotName = 'чат-бот';

import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import { Types } from 'mongoose';
import { push } from 'connected-react-router';
import { changeChat, loadChats, addChat } from '../../store/actions/chats_actions' ;

class ChatsList extends Component {
  static propTypes = {
    chats: PropTypes.object.isRequired,
    addChat: PropTypes.func.isRequired,
    loadChats: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    classes: PropTypes.object,
  };

  state = {
    input: '',
    selectedIndex: 0
  };

  handleListItemClick = (e, index) => {
    this.setState({selectedIndex: index});
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleKeyUp = e => {
    if(e.keyCode === 13) {
      this.handleAdd()
    };
  }

  handleAdd = () => {
    if(this.state.input !== '') {
      this.props.addChat(
        new (Types.ObjectId),
        this.state.input,
        defaultUserName,
        defaultBotName
      )
      this.setState({ input: '' })
    };
  };
  
  handleNavigate = (key, index) => {
    this.setState({ selectedIndex: index });
    this.props.push(`/chat/${key}`);
    //console.log('this.props:', this.props)
    this.props.changeChat(key);
  };
  
  scrollToBottom = () => {
    if(this.scrolledEl) 
      this.scrolledEl.scrollIntoView();
  };

  componentDidMount() {
    this.props.loadChats();
    this.scrolledEl = document.getElementById(scrolledId);
    this.scrollToBottom();
  };
  
  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }
  
  render() {
    const { classes, chats } = this.props;
    
    const chatsArray = [];
    Object.keys(chats).forEach((key, index) => {
      chatsArray.push((
        <div key={ key }>  
          <ListItem
            button
            className={ classes.item } 
            selected={this.state.selectedIndex === index}
            onClick={ () => this.handleNavigate(key, index) }
          >
            <ListItemAvatar>
              <Avatar className={ classes.avatar } ><Icon>chat</Icon></Avatar>
            </ListItemAvatar>
            
            <ListItemText primary={ chats[key].title } />
            
          </ListItem>
          <Divider variant="middle" component="li" />
        </div>
      ))
    });
    
    return (
        <div className="chats-body">
          <List className={ `chats-list ${classes.root}` }>
            { chatsArray }
            <div id={ scrolledId } />
          </List>
          
          <Divider variant="middle" />
          
          <Box className={ `chats-foot ${classes.foot}` }>
            <TextField
              className="chat-input"
              name="input"
              color="secondary"
              variant = "filled"
              placeholder="Добавить чат ..."
              autoComplete="off"
              onChange = { this.handleChange }
              onKeyUp = { this.handleKeyUp }
              value = { this.state.input || '' }
              InputProps={{ className: classes.input }}
            />
          </Box>
      </div>
    );
  };
};



const mapStateToProps = ({ chatsReducer }) => ({
  chatId: chatsReducer.chatId,
  chats: chatsReducer.chats
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeChat, loadChats, addChat, push }, dispatch);

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withStyles(useStyles)(ChatsList));
