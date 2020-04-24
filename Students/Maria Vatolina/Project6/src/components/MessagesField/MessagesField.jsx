import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './style.css';
import { Input, IconButton, Box } from '@material-ui/core'
import { Send, SentimentVerySatisfiedRounded, AttachmentRounded } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import Header from '../Header/Header.jsx'
import Message from '../Message/Message.jsx'

//ACTIONS
import { sendMessage } from '../../store/actions/messages_actions.js'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

const useStyles = (theme => ({
   root: {
       heigth: '100vh',
       width: "100%"
    },
   msgList: {
      overflow: 'auto'
   },
   msgBlock: {
      height: 'calc(100vh - 160px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: theme.spacing(2)
   },
   sendForm: {
      maxHeight: '60px',
      position: 'static',
      display: 'flex',
      justifyContent: 'space-between',
   }
 }))

class Messages extends Component {
   mesagesRef= React.createRef()
   constructor(props) {
      super(props)
      this.state = {
         usr: 'Darth',
         msg: '',
      }   
   }

   sendMessage = (text, sender) => {
      // console.log('props:', this.props)
      let { chatId, messages, sendMessage } = this.props
      let chatMessages = messages[chatId]
      const messageId = Object.keys(chatMessages).length + 1;

      sendMessage(chatId, messageId, sender, text)
      // console.log('chatMessages:', messageId)
      this.scrollToBottom()   
   }

   handleSendMessage = (text, sender) => {
      console.log('sent')
      this.setState({ msg: '' })
      if (sender == 'Darth')
         this.sendMessage (text, sender) 
   }

   handleChange = (event) => {
         if (event.keyCode !== 13 ) {
           this.setState({ msg: event.target.value })           
         } else {
            this.sendMessage(this.state.msg, this.state.usr)
            this.setState({ msg: ''})
         }
   }

   // componentDidUpdate (prevProps) {
   //    const { messages, chatId } = this.props;
   //    let chatMessages = messages[chatId]
   //    if (Object.keys(prevProps.messages).length < Object.keys(chatMessages).length && 
   //    chatMessages[Object.keys(chatMessages).length].user === this.state.usr) {
   //       setTimeout(() => {
   //       this.sendMessage('Please, wait...');
   //       }, 1500)
   //    }

   //    this.scrollToBottom()
   // }

   componentDidMount() {
      
      this.scrollToBottom();
   }

   scrollToBottom = () => {
      this.mesagesRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
   }

   render() {
      let { messages, classes, chatId, chats } = this.props
      let chatMessages = messages[chatId]

      let MessagesArr = []

      Object.keys(chatMessages).forEach(messageId => {
         MessagesArr.push( 
            <Message 
            sender={ chatMessages[messageId].user } 
            text={ chatMessages[messageId].text } 
            key={ messageId }
            chatId={ chatId }
            chats={ chats }
         />)
      })

      return (
         <div  className={classes.root}>
         
         <Box className={classes.msgBlock}>
            <Box className={classes.msgList} ref={this.mesagesRef}>
               { MessagesArr }
            </Box>
         </Box>
         <Box className={classes.sendForm} p={2}>
            <Box width="85%" mr={2}>
               <Input placeholder="Enter your message..."
                  fullWidth={ true }
                  onChange={ this.handleChange }  
                  onKeyUp={ this.handleChange }
                  value={ this.state.msg }/>
            </Box>
            <IconButton aria-label="send" onClick={ () => this.handleSendMessage(this.state.msg, this.state.usr) }>
               <Send />
            </IconButton>
            <IconButton aria-label="smile">
               <SentimentVerySatisfiedRounded />
            </IconButton>
            <IconButton aria-label="attachment" >
               <AttachmentRounded />
            </IconButton>
         </Box>

      </div>
      )
   }
}

const mapStateToProps = ({ msgReducer }) => ({
   messages: msgReducer.messages
})
const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Messages))
