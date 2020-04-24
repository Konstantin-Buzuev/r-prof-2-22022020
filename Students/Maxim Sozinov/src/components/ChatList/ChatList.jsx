import React from 'react';

import PropTypes from "prop-types";
import { push } from 'connected-react-router';

import { Button, Form, ListGroup, InputGroup, } from 'react-bootstrap';
import './style.css';

import { addChat, loadChats } from '../../store/actions/chats_action.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ChatList extends React.Component {
   static propTypes = {
      chats: PropTypes.object.isRequired,
      addChat: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
   };

   state = {
      newChatTitle: ''
   }

   handleChange = (event) => {
      event.keyCode !== 13 ?
         this.setState({
            newChatTitle: event.target.value
         }) :
         this.addNewChat(this.state.newChatTitle);
   }

   addNewChat = (title) => {
      const { chats } = this.props;
      // const chatId = chats[chats.length - 1].chatId + 1;

      if (title !== '') {
         this.setState({
            newChatTitle: ''
         });
         const newChat = {
            title
         };
         fetch("/api/chat", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(newChat)
         })
            .then(response => response.json())
            .then(data => {
                 console.log(data);
               this.props.addChat(data._id, data.title);
               this.handleNavigate(`/chat/${data._id}`);
            })
            .catch(err => {
               console.log(err);
            });
      }
   }

   handleNavigate = (link) => {
      this.props.push(link);
   };

   componentDidMount() {

      this.props.loadChats();

      // fetch('/api/chats')
      //     .then(response => response.json())
      //     .then(data => {
      //         console.log(data)
      //         data.forEach( chat => this.props.addChat( chat.chatId, chat.title ) );
      //     });
  }

   render() {

      const { usr } = this.props;
      const { chats } = this.props;
      const { chatId } = this.props;

      let chatsArray = Object.keys(chats).map( key => {
         return (
            <ListGroup.Item
               key={key}
               action
               className={chatId == key ? 'active' : ''}
               onClick={() => this.handleNavigate(`/chat/${key}`)}
            >
               {chats[key].title}
            </ListGroup.Item>
         );
      });

      return (
         <div className="bg-light h-100 col-2 d-flex flex-column justify-content-between p-0">
            <div>
               <p className="my-3 text-center font-weight-bold">Hello {usr}!</p>
               <InputGroup className="mb-5">
                  <Form.Control
                     placeholder="New chat"
                     className="border-primary"
                     onChange={this.handleChange}
                     onKeyUp={this.handleChange}
                     value={this.state.newChatTitle}
                  />
                  <InputGroup.Append>
                     <Button
                        variant="outline-primary"
                        className="font-weight-bold"
                        onClick={() => this.addNewChat(this.state.newChatTitle)}
                     >
                        +
                     </Button>
                  </InputGroup.Append>
               </InputGroup>

               <ListGroup>
                  {chatsArray}
               </ListGroup>
            </div>
            <footer className="text-white bg-dark w-100 text-center">
               ReactGram &copy;
         </footer>
         </div>
      );
   }
}

const mapStateToProps = ({ chatsReducer, userReducer }) => ({
   chats: chatsReducer.chats,
   usr: userReducer.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, loadChats, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);