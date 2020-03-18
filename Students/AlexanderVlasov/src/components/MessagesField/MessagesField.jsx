import React, {Component } from 'react';
import ReactDom from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import styles from './style.css';

import Message from '../Message/Message.jsx';
import { Box, Fab, TextField, GridList, List } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = (theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      overflow: 'auto',
      height: 'calc(100vh - 120px)',
    }
  }));

import { sendMessage } from '../../store/actions/messages_action.js';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';

class Messages extends Component {

    messagesEndRef = React.createRef()

    constructor(props) {
        super(props);
        this.user = props.usr;
        this.state = {
            msg: ''
        }
    }

    handleChanges = (event) => {
        event.keyCode !== 13 ?
            this.setState({msg: event.target.value}) :
            this.newMessage('Alex', this.state.msg);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
    }

    newMessage = (sender, text) => {
        const { messages, match: { params } } = this.props;
        this.props.sendMessage(null, params.chatId, sender, text);
        this.setState({msg: ''});
        this.scrollToBottom();
    }

    render() {
        const { classes, messages, match: { params } } = this.props;
        const mapMessages = messages[params.chatId];
        const renderMessages = Object.keys(mapMessages).map(messageId => {
            return (
                <Message 
                    key={ `${params.chatId}@@${messageId}` } 
                    sender={ mapMessages[messageId].user } 
                    text={ mapMessages[messageId].text }
                />
            )
        })
        return (
            <div className={ classes.root}>
                <List className={ classes.gridList } cols={ 1 } spacing={ 0 } ref={this.messagesEndRef}>
                    { renderMessages.length ? renderMessages : <div></div> }
                </List>
                <TextField 
                    className="flex-grow-1"
                    label="Новое сообщение"
                    value={this.state.msg}
                    onChange={this.handleChanges}
                    onKeyUp={this.handleChanges}
                    variant="outlined"
                />
                <Fab 
                    color="primary" 
                    onClick={() => this.newMessage('Alex', this.state.msg)} >
                    <SendIcon />
                </Fab>
            </div>
        )
    }
}

const mapStateToProps = ({ msgReducer }) => ({
    messages: msgReducer.messages
});
const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(Messages)))