import React, {Component} from 'react';

import { Button, Form, Row, } from 'react-bootstrap';
// import './style.css';

import Message from '../Message/Message.jsx';

import { sendMessage, addMessage } from '../../store/actions/messages_actions.js';
// import { addMessage } from '../../store/actions/add_messages_action';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class Messages extends Component {
    constructor(props) {
        super(props);
    }
    state = {
           newMessage: ''
       }

    addNewMessage = (text, sender) => {
        // const { messages } = this.props;
        const { chatId } = this.props;
        // const messageId = Object.keys(messages).length + 1;

        this.setState({
            newMessage: ''
        });

        const newMessage = {
            sender,
            text,
            chatId,
        };

        fetch("/api/message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
          })
            .then(response => response.json())
            .then(data => {
              this.props.sendMessage(data._id, sender, text, chatId);
            })
            .catch(err => {
              console.log(err);
            });
    }

    handleChange = (event) => {
        event.keyCode !== 13 ?
            this.setState({
                newMessage: event.target.value
            })
            : this.addNewMessage(this.state.newMessage, this.props.usr);
    }

    componentDidMount() {
        const block = this.refs["msgBlock"];
        block.scrollTop = block.scrollHeight;

        fetch('/api/messages')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data.forEach( msg => this.props.addMessage( msg._id, msg.sender, msg.text, msg.chatId ) );
            });
    }

    componentDidUpdate () {
        const block = this.refs["msgBlock"];
        block.scrollTop = block.scrollHeight;
    }

    render() {

        const { usr } = this.props;
        const { messages } = this.props;
        const { chatId } = this.props;

        const MessagesArr = Object.keys(messages).map( key => {
                if ( messages[key].chatId === chatId ) {
                    return ( <Message 
                                key={ key }
                                sender={ messages[key].user }
                                text={ messages[key].text }
                                chatId={ chatId }
                            /> );
                }
            });

        return (
            <div className="d-flex flex-column justify-content-end h-100 col-10">

                <div className="d-flex flex-column overflow-auto" ref="msgBlock">
                    { MessagesArr }
                </div>

                <Row className="flex-nowrap">
                    <Form.Control
                        type="text"
                        className="m-2"
                        placeholder="type here"
                        onChange={ this.handleChange }
                        onKeyUp= { this.handleChange }
                        value = { this.state.newMessage }
                    />

                    <Button 
                        className="m-2" 
                        onClick={ () => this.addNewMessage (this.state.newMessage, usr) }
                    >
                        Send&nbsp;Message
                    </Button>
                </Row>

            </div>
        );

    }
}

const mapStateToProps = ({ msgReducer, userReducer }) => ({
    messages: msgReducer.messages,
    usr: userReducer.user,
});

const mapDispatchToProps = dispatch => bindActionCreators( { sendMessage, addMessage }, dispatch );

export default connect(mapStateToProps, mapDispatchToProps)(Messages);