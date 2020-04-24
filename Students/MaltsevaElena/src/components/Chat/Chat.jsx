import React from 'react'
import ReactDom from 'react-dom'

// Styles, UI
import { Box, 
         ListItem, ListItemAvatar, ListItemIcon, ListItemText, 
         Avatar,
         IconButton,
         Menu, MenuItem } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   root: {
      '& .MuiListItem-root:hover': {
         backgroundColor: theme.palette.primary.light,
         cursor: 'pointer'
      },
      '& .Mui-selected': {
         backgroundColor: theme.palette.primary.main,
         color: theme.palette.secondary.main,
         '& .MuiListItemAvatar-root > .MuiAvatar-root': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white
         }
      },
   },
   avatar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main
   }
}))

const StyledMenu = withStyles({})(props => (
   <Menu
     elevation={5}
     getContentAnchorEl={null}
     anchorOrigin={{
       vertical: 'center',
       horizontal: 'right',
     }}
     transformOrigin={{
       vertical: 'center',
       horizontal: 'right',
     }}
     {...props}
   />
 ))
 
 const StyledMenuItem = withStyles(theme => ({
   root: {
      '&:hover': {
         background: 'none',
         color: theme.palette.secondary.light,
         '& > .MuiListItemIcon-root': {
            color: theme.palette.secondary.light,
         }
      }
   },
 }))(MenuItem)

let chat = (props) => {

   const classes = useStyles()
   const { handleNavigate, chatRoomId, title, lastMessage, isSelected, deleteChat } = props

   const [ anchorEl, setAnchorEl ] = React.useState(null)

   const handleClick = event => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <Box className={ classes.root }>
         <ListItem divider={ true } 
            selected={ isSelected ? true : false } 
            onClick={ () => handleNavigate(`/chat/${chatRoomId}`) } >
            <ListItemAvatar>
               <Avatar className={ classes.avatar }> { title[0].toUpperCase() } </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ title } secondary={ lastMessage } />

            {/* Chat's actions */}
            { isSelected && 
               <IconButton onClick={ handleClick } aria-label="display more actions" aria-haspopup="true" edge="end">
                  <MoreIcon />
               </IconButton>
            }
            <StyledMenu
               anchorEl={ anchorEl }
               open={ Boolean(anchorEl) }
               onClose={ handleClose } >
               
               <StyledMenuItem onClick={ () => deleteChat(chatRoomId) }>
                  <ListItemIcon>
                     <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
               </StyledMenuItem>
            </StyledMenu>

         </ListItem>
      </Box>
   )
}

export default chat