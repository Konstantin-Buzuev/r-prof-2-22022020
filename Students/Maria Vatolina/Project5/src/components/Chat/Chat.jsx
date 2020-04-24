import React from 'react'
import ReactDom from 'react-dom'
import {Link} from 'react-router-dom'

import { IconButton, Input, List, 
         ListItem, 
         ListItemAvatar, 
         ListItemText, 
         Avatar, 
         Badge, 
         Box } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add';
// import AddIcon from '@material-ui/svg-icons/content/add'

//store
import {addChat} from '../../store/actions/chat_actions.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import { Chat } from '@material-ui/icons'

const useStyles = (theme => ({
   root: {
      width: '100%',
      height: 'calc(100vh - 145px)',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.common.white
   },
   item: {
      '&:hover, &:active': {
         backgroundColor: theme.palette.primary.main,
      },
   },
   selected: {
      backgroundColor: theme.palette.primary.main,
   },
   avatar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main
   }
}))

class Chat extends React.Component {
   state = {
      input: ''
   }
   handleChange = (evt) => {
      this.setState({ [evt.target.name]:evt.target.value })
   }
   handleKeyUp = (event) => {
      if (event.keyCode === 13 ) {
         this.handleAdd()           
      }
   }
   handleAdd = () => {
      if(this.state.input !==''){
         this.props.addChat(this.state.input)
         this.setState({ input: '' })
      }
   }
   render() {
      const { classes, chats, title, chatId } = this.props 

      let chatsArray = []

      Object.keys(chats).forEach(chatId => {
         chatsArray.push(
         <Link to={`/chat/${chatId}`}>
            <ListItem divider={ true } button className={classes.item}>
               <ListItemAvatar>
                  <Badge color="secondary" overlap="circle" variant="dot">
                     <Avatar className={classes.avatar}>  </Avatar>
                  </Badge>
               </ListItemAvatar>
               <ListItemText primary={chats[chatId].title} secondary={ chats[chatId].message } />
            </ListItem>
         </Link>)
      })
      
      return (
         <Box className={classes.root}>
            { chatsArray }
            
            <Box>
               <IconButton onClick = { this.handleAdd }>
                  <AddIcon /> 
               </IconButton >
               
               <Input name="input"
                  key={ chats }
                  placeholder="Add new chat"
                  onChange = { this.handleChange }
                  value = { this.state.input }
                  onKeyUp = { this.handleKeyUp }
               />
            </Box>
         </Box>
      )
   }
}
{/* <Divider variant="inset" component="li" /> */}

const mapStateToProps = ({ chatReducer }) => ({
   chats: chatReducer.chats
})
const mapDispatchToProps = dispatch => bindActionCreators({ addChat }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Chat))
