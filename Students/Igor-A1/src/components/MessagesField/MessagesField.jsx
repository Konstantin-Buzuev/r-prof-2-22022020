import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { sendMessage, loadMessages } from "../../store/actions/messages_actions";

import
{ Box,
  Divider,
  TextField,
  Input,
  FloatingActionButton,
  Fab,
  Icon } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import Message from '../Message/Message.jsx'

import { withStyles } from '@material-ui/core/styles';
const useStyles = (theme => ({
   root: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      padding: theme.spacing(4)
   },
   foot: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary,
      padding: theme.spacing(2)
   },
   hovered: {
      '&:hover, &:active': {
         color: theme.palette.secondary.main
      },
   },
   input: {
     color: "#FFF59D"
   }
}));

const scrolledId = 'last_msg';

import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import { Types } from 'mongoose';

class Messages extends Component {
    static propTypes = {
      chatId: PropTypes.string.isRequired,
      chats: PropTypes.object.isRequired,
      msgs: PropTypes.object.isRequired,
      sendMessage: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired,
    };
    
    state = { msg: '' };
    
    constructor(props) {
      super(props);
      this.scrolledEl = null;
    };

    _sendMessage = (e) => {
      this.props.sendMessage(
        new (Types.ObjectId),
        this.props.chatId,
        this.props.chats[this.props.chatId].user,
        this.state.msg || `... ${String.fromCodePoint(0x1F43E)}`
      );
      this.setState ({
          msg: '' // clear input field
      });
    };

    handleChange = (e) => {
      e.keyCode === 13 ? this._sendMessage(e)
        : this.setState ({msg: e.target.value});
    };
    
    scrollToBottom = () => {
      if(this.scrolledEl) 
        this.scrolledEl.scrollIntoView({behavior: "smooth"});
    };

    componentDidMount() {
      this.props.loadMessages(this.props.chatId);
      this.scrolledEl = document.getElementById(scrolledId);
      this.scrollToBottom();
    };
    
    componentDidUpdate(prevProps, prevState) {
      if(this.props.chatId !== prevProps.chatId) 
        this.props.loadMessages(this.props.chatId);
      this.scrollToBottom();
    }
    
    render() {
      if(this.props.isLoading) {
        return <CircularProgress />
      };
      
      const placeholder = `Новое сообщение ...`;
      
      let { chats, chatId, msgs, classes } = this.props,
        msgArray = [];
        
      if(msgs) {
        Object.keys(msgs).forEach(key => {
          let { sender, text } = msgs[key],
            userName = sender || chats[chatId].bot;
          msgArray.push(
            <Message
              sender={ userName }
              text={ msgs[key].text }
              bot={ userName === chats[chatId].bot } 
              self={ userName === chats[chatId].user }
              key={ key }
            />
          );
        });
      } else {
        // empty msgList
        console.log('empty msgs list');
      };

      return (
        <div className="msgs-body">
          <Box className={ `msgs-list ${classes.root}` }>
            { msgArray }
            <div id={ scrolledId } />
          </Box>
          
          <Divider variant="middle" />
          
          <Box className={ `msgs-foot ${classes.foot}` }>
            <TextField
              className="msg-input"
              autoFocus
              color="secondary"
              variant = "filled"
              placeholder = { placeholder }
              onChange = { this.handleChange }
              onKeyUp = { this.handleChange }
              value = { this.state.msg || '' }
              InputProps={{ className: classes.input }}
            />
            
            <Fab
              className={classes.hovered}
              color="primary"
              aria-label="add"
              onClick = { this._sendMessage }
            >
              <Icon>send</Icon>
            </Fab>
          </Box>
        </div>
      );
    };
};

const mapStateToProps = ({ chatsReducer, msgReducer }) => ({
  chatId: chatsReducer.chatId,
  chats: chatsReducer.chats,
  msgs: msgReducer.msgs,
  isLoading: chatsReducer.isLoading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators( { sendMessage, loadMessages }, dispatch);

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withStyles(useStyles)(Messages));
