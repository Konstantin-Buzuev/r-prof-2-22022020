import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChatsHead      from '../ChatsHead/ChatsHead.jsx';
import ChatsList      from '../ChatsList/ChatsList.jsx';

import MessagesHead   from '../MessagesHead/MessagesHead.jsx';
import MessagesField  from '../MessagesField/MessagesField.jsx';

class Layout extends Component {
  
  render () {
    return (
      <div className="grid">
        <div className="chats">
          <ChatsHead />
          <ChatsList />
        </div>
        
        <div className="msgs">
          <MessagesHead className="msgs-head" />
          <MessagesField />
        </div>
      </div>
    )
  };
};
 
export default Layout;
