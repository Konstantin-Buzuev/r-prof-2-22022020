import React, {Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import { Box, AppBar, Toolbar, IconButton, InputBase  } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ForumRounded, AccountCircleRounded, Settings } from '@material-ui/icons/'
import SearchIcon from '@material-ui/icons/Search'

import ChatList from '../Chat/Chat.jsx'
import Footer from '../ChatFooter/ChatFooter.jsx'

const useStyles = (theme => ({
   root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderRight: '4px solid rgba(0, 0, 0, .1)',
   },
    grow: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
   },
   search: {
      position: 'relative',
      borderBottom: '1px solid rgba(255, 255, 255, .2)'
   },
   searchIcon: {
      width: theme.spacing(3),
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center'
   },
   inputRoot: {
      color: 'inherit'
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 5),
   }
}))

class Chats extends Component {
   constructor (props) {
      super(props)
   }
   static propTypes = {
      chatId: PropTypes.number,
      chats: PropTypes.object,
      messages: PropTypes.object,
      classes: PropTypes.object
   }
   // static deafultProps = {
   //    chatId: 1
   // }

   render() {

      const { classes } = this.props
      return (
         <Box className={classes.root}>
            {/* chat Search  */}
            <AppBar position="static" className={classes.grow}>
               <Toolbar className={classes.search}>
                  <SearchIcon className={classes.searchIcon}/>
                  <InputBase
                  placeholder="Search in all..."
                  classes={{
                     root: classes.inputRoot,
                     input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                  />
               </Toolbar>
            </AppBar>

            <Box>
               <ChatList />
            </Box>
            
            {/* chatFooter */}
            <Footer />
         </Box>         
      )
   }
}

export default withStyles(useStyles)(Chats)