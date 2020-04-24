import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Messages from '../MessagesField/MessagesField.jsx';
import ChatList from '../ChatList/ChatList.jsx';

class Layout extends React.Component {

   render() {
      const chatId = this.props.match.params.chatId || this.props.defaultChat;

      return (
         <div className="d-flex align-items-end h-75 flex-grow-1">
            <ChatList chatId={chatId} />
            <Messages chatId={chatId} />
         </div>
      );
   }
}

const mapStateToProps = ({ chatsReducer, }) => ({
   defaultChat: chatsReducer.defaultChat,
});

// const mapDispatchToProps = dispatch => bindActionCreators({ addChat, loadChats, push }, dispatch);

export default connect(mapStateToProps)(Layout);