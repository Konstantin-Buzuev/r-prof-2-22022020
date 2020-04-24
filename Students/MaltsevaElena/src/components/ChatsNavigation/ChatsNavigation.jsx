import React from 'react'
import ReactDom from 'react-dom'

// Styles, UI
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { AppBar, 
        Toolbar, 
        IconButton, 
        Menu, MenuItem, 
        ListItemIcon, ListItemText } from '@material-ui/core'
import { ForumRounded, 
        AccountCircleRounded, 
        Settings, 
        Face, 
        Tune } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  appBar: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    borderColor: theme.palette.primary.main
  },
  toolbar: {
    justifyContent: 'space-around'
  }
}))

const StyledMenu = withStyles({})(props => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
  },
}))(MenuItem)

let navigation = () => {

  const classes = useStyles()

  const [ anchorEl, setAnchorEl ] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" color="primary" className={ classes.appBar }>
      <Toolbar className={ classes.toolbar }>
        <IconButton color="secondary">
          <ForumRounded />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleRounded />
        </IconButton>
        
        {/* Settings menu */}
        <IconButton color="inherit" onClick={ handleClick }>
          <Settings />
        </IconButton>
        <StyledMenu
          anchorEl={ anchorEl }
          open={ Boolean(anchorEl) }
          onClose={ handleClose } >
          <StyledMenuItem>
            <ListItemIcon>
              <Face fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My account" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <Tune fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="General settings" />
          </StyledMenuItem>
        </StyledMenu>

      </Toolbar>
    </AppBar>
  )
}

export default navigation

