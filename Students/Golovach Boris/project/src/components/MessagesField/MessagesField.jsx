import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx'

//material-ui
import { TextField, FloatingActionButton } from 'material-ui';
import Button from '@material-ui/core/Button';
import CircularProgress from 'material-ui/CircularProgress';

//actions
import { sendMessage, loadMessages } from '../../store/actions/messages_actions.js'
import { loadChats } from '../../store/actions/chats_actions';

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import PropTypes from 'prop-types'

class Messages extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            msg: '',
        }
    }
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        messages: PropTypes.object.isRequired,
        chats: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
        loadChats: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };
    //methods
    sendMessage = (text, sender) => {
        const { chatId } = this.props
        //const messages = this.props.messages[chatId]
        const messages = this.props.messages
        const messageId = Object.keys(messages).length + 1;

        this.props.sendMessage(messageId, sender, text, chatId)

        //отправка на сервер
        let newMsg = {
            sender: sender,
            text: text,
            chatId: chatId
        }
        fetch('api/message', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMsg)
        })
    }

    handleSendMessage = (message, sender) => {
        this.setState({ msg: '' })
        if (sender == 'Darth Vader') {
            this.sendMessage(message, sender)
        }
    }

    handleChange = (evt) => {
        if (evt.keyCode !== 13) {
            this.setState ({msg: evt.target.value})
        }
            //this.sendMessage(evt)
    }
    
    componentDidMount() {
        this.props.loadChats();

        //сервер
        let msgs = null
        fetch('api/messages')
        .then(d => d.json())
        .then(data => msgs = data)
        .finally(() => {
            console.log(msgs)
        })
    }

    render() {
        if (this.props.isLoading) {
            return <CircularProgress />
        } 
        //let user = this.props.usr
        let usr = 'Darth Vader'
        let { messages } = this.props
        let { chatId } = this.props
        let MessagesArr = []

        Object.keys(messages).forEach(key => {
            if(messages[key].chatId===chatId){
                MessagesArr.push(<Message 
                    sender={ messages[key].user } 
                    text={ messages[key].text }
                    key={ key }
                />)
            }
        })

        //server

        // let msgs = null
        // fetch('api/messages')
        // .then(d => d.json())
        // .then(data => msgs = data)
        // .finally(() => {
        //     let messages = msgs
        //     Object.keys(messages).forEach(key => {
        //         if(messages[key].chatId==chatId){
        //             MessagesArr.push(<Message 
        //                 sender={ messages[key].sender } 
        //                 text={ messages[key].text }
        //                 key={ key }
        //             />)
        //         }
        //     })
        // })
        return (
            <div className="container-fluid align-items-center">
                <div className="col-md-3">
                    <div className="header">
                        <h2>ReactGram &copy;</h2>
                        <p>Hello { usr }!</p>
                    </div>
                    <div className="messagesBlock">
                        { MessagesArr }
                    </div>
                    <TextField
                        id="TextField"
                        label="Введите сообщение"
                        fullWidth
                        margin="normal"
                        onChange = { this.handleChange } 
                        onKeyUp = { this.handleChange }
                        value = { this.state.msg }
                    />
                    <Button fullWidth variant="contained" color="primary" onClick = { 
                            () => this.handleSendMessage (this.state.msg, 'Darth Vader') 
                        }>Send
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ msgReducer, chatsReducer }) => ({
    messages: msgReducer.messages,
    chats: chatsReducer.chats,
    isLoading: msgReducer.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators( { sendMessage, loadChats }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
