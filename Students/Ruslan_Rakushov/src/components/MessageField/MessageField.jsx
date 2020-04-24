import React, { Component } from 'react';
import ReactDom from 'react-dom';

//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { sendMessage, delMessage, loadMessages } from '../../store/actions/messageActions.js';

import Message from '../Message/Message.jsx';

//UI Components
import { withStyles } from '@material-ui/core/styles';
import {IconButton, TextField, Tooltip, CircularProgress } from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

const useStyles = (theme => ({
  wrapper: {
    width: '70vh',
    marginTop: '70px',
    // TODO height 70vh (в body или верхний контейнер 100vh,
    //  дальше вложенным делаем свои или 100.
    //  еще можно футером прибить (см.какое-то свойство css)
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '75vh',
    padding: '5px',
    border: '1px solid grey',
    borderRadius: '5px',
    backgroundColor: 'lightgrey',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  sendMsgField: {
    width: '400px',
    margin: '10px 0px',
    display: 'flex',
  },
  sendText: {
    width: 'inherit',
  },
  sendBtn: {
    padding: '8px',
  },
  loadingCircle: {
    alignSelf: 'center',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

class MessageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgText: '',
    };
    this.msgTextInput = React.createRef()
    this.messageFieldEndRef = React.createRef();
  }
  //methods
  handleSendMsg = (message, sender) => {
    const { currentChatId } = this.props;
    this.props.sendMessage(sender, message, currentChatId);
    this.setState({
      msgText: '',
    });
  };

  handleDelMsg = (dataId) => {
    this.props.delMessage(dataId);
  };

  handleChange = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSendMsg(evt.target.value, 'Me');
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  };
  scrollToBottom = () => {
    if (this.messageFieldEndRef.current.lastElementChild) {
      this.messageFieldEndRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    }
  };
  setFocusOnInput = () => {
    if (this.msgTextInput.current) {
      this.msgTextInput.current.focus();
    }
  }
  //FIX для static_api
  getAllMsgsInChat(chatId, msgsObj) {
    const msgsArr = [];
    for (let i in msgsObj) {
      if (msgsObj.hasOwnProperty(i) && msgsObj[i].chatId === chatId) {
        msgsArr.push({...msgsObj[i], id: i});
      }
    }
    return msgsArr;
  }

  getAllMsgsInChatDB(chatId, msgs) {
    const msgsArr = [];
    msgs.forEach((msg) => {
      if (msg.chatId === chatId) {
        msgsArr.push(msg);
      }
    });
    return msgsArr;
  }

  //FIX для static_api
  getFilteredMsgsInChat(chatId, msgsObj, filterStr) {
    const regexp = new RegExp(filterStr);
    const msgsArr = [];
    for (let i in msgsObj) {
      if (msgsObj.hasOwnProperty(i)
        && msgsObj[i].chatId === chatId
        && regexp.test(msgsObj[i].text)) {
        msgsArr.push({...msgsObj[i], id: i});
      }
    }
    return msgsArr;
  }
  
  getFilteredMsgsInChatDB(chatId, msgs, filterStr) {
    const regexp = new RegExp(filterStr);
    const msgsArr = [];
    msgs.forEach((msg) => {
      if (msg.chatId === chatId && regexp.test(msg.text)) {
        msgsArr.push(msg);
      }
    });
    return msgsArr;
  }

  //hooks
  componentDidMount() {
    this.props.loadMessages();
    this.scrollToBottom();
    this.setFocusOnInput();
  };

  componentDidUpdate(prevProps, prevState) {
      this.scrollToBottom();
      this.setFocusOnInput();
  };

  render() {
    const { classes } = this.props;
    const { msgs, currentChatId, searchText, isLoading } = this.props;
    let currentChatMsgs = [];
    searchText === '' ?
      // For static api
      // currentChatMsgs = this.getAllMsgsInChat(currentChatId, msgs) :
      // currentChatMsgs = this.getFilteredMsgsInChat(currentChatId, msgs, searchText);
      currentChatMsgs = this.getAllMsgsInChatDB(currentChatId, msgs) :
      currentChatMsgs = this.getFilteredMsgsInChatDB(currentChatId, msgs, searchText);
    let MessagesArr = [];
    if (currentChatMsgs.length) {
      MessagesArr = currentChatMsgs.map((msg, index) => (
        <Message key={index.toString()} msg={msg} delMessage={this.handleDelMsg}/>
      ));
    } else {
      MessagesArr = (
        <span>Сообщений пока нет...</span>
      );
    }
    return (
      <div className={classes.wrapper}>
        <div className={classes.root} ref={this.messageFieldEndRef}
        >
          { isLoading ? (
            <div className={classes.loadingCircle}>
              <CircularProgress />
            </div>
          )
          : MessagesArr }
        </div>
        <div className={classes.sendMsgField}>
          <TextField
            placeholder = 'Введите сообщение...'
            inputRef = {this.msgTextInput}
            className = {classes.sendText}
            variant = "outlined"
            size = "small"
            onChange = {this.handleChange}
            onKeyUp = {this.handleChange}
            value = {this.state.msgText}
            name = 'msgText'
            />
          <Tooltip title="Отправить">
            <IconButton 
              className={classes.sendBtn}
              name="sendMsgUI"
              onClick={() => this.handleSendMsg(this.state.msgText, 'Me')}
            >
                <SendOutlinedIcon />
              </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ messageReducer, chatReducer }) => ({
  msgs: messageReducer.msgs,
  isLoading: messageReducer.isLoading,
  searchText: messageReducer.searchText,
  chats: chatReducer.chats,
  currentChatId: chatReducer.currentChatId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendMessage,
  delMessage,
  loadMessages,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MessageField));