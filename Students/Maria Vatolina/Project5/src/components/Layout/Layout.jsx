import React from 'react'
import './style.css'
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types'

import Header from '../Header/Header.jsx'
import Messages from '../MessagesField/MessagesField.jsx'
import Chats from '../ChatList/ChatList.jsx'

//store
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { sendMessage } from '../../store/actions/messages_actions.js'

class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
        chats: PropTypes.object,
        messages: PropTypes.object,
        sendMessage: PropTypes.func,
     }
     static defaultProps = {
        chatId: 1
     }

    render() {
        let { chatId, chats, messages, sendMessage } = this.props

        return(
            <div className="container">
                <Header title={ this.props.chatId }/>
                <Grid container spacing={0}>
                    <Grid item xs={3} >
                    <Chats chatId={ chatId } chats={ chats } messages={ messages } />
               </Grid>
               <Grid item xs={9}>
                  <Messages chatId={ chatId } chats={ chats } messages={ messages } sendMessage={ sendMessage } />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = ({ msgReducer, chatReducer }) => ({
    
    messages: msgReducer.messages,
    chats: chatReducer.chats
})
const mapDespatchToProps = dispatch => bindActionCreators( {sendMessage}, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(Layout) 