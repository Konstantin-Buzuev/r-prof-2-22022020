import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { registerNewUser, loginUser } from '../../store/actions/users_action.js'

// Styles, UI
import { Paper, 
         Tabs, Tab,
         TextField,
         Snackbar,
         Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme => ({
   root: {
      width: '350px',
      padding: theme.spacing(1, 0),
   },
   form: {
      padding: theme.spacing(0, 4, 2, 4),
   },
   submitBtn: {
      color: theme.palette.text.main,
      margin: theme.spacing(3, 1, 0, 0),
      '&:hover': {
         color: theme.palette.secondary.main,
      },
   },
   clearBtn: {
      color: theme.palette.text.secondary,
      margin: theme.spacing(3, 0, 0, 0),
      '&:hover': {
         color: theme.palette.secondary.light,
      },
   },
}))

class Auth extends Component {
   static propTypes = {
      registerNewUser: PropTypes.func.isRequired, 
      registerErrors: PropTypes.array,
      hasRegistered: PropTypes.bool.isRequired,
      loginUser: PropTypes.func.isRequired,
      authMessage: PropTypes.string,
      classes: PropTypes.object
   }

   state = {
      tabValue: 0,
      userName: '',
      email: '',
      password: '',
      openSnackbar: false,
   }

   handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return
      }
      this.setState({ openSnackbar: false })
   }

   handleChangeTab = (event, newValue) => {
      this.setState({ tabValue: newValue })
   }

   handleChangeInput = event => {
      this.setState({ [event.target.name]: event.target.value })
   }

   handleClear = () => {
      if (this.state.userName || this.state.email || this.state.password) {
         this.setState({ userName: '', email: '', password: ''})
      }
   }

   handleRegister = () => {
      const { userName, email, password } = this.state
      const { registerNewUser, hasRegistered } = this.props

      if (userName && email && password) {
         registerNewUser(userName, email.toLowerCase(), password)
         this.setState({ openSnackbar: true })
         hasRegistered ? this.setState({ tabValue: 0 }) : ''
      }
   }

   handleLogin = () => {
      const { userName, password } = this.state

      if (userName && password) {
         this.props.loginUser(userName, password)
         this.props.authMessage ? this.setState({ openSnackbar: true }) : ''
      }
   }

   render () {
      const { hasRegistered, registerErrors, authMessage, classes } = this.props
      const { tabValue, openSnackbar } = this.state

      let emailError, passwordError
      if (!registerErrors) {
         emailError = passwordError = ''
      } else {
         registerErrors.forEach(err => {
            if (err.param === 'email') {
               emailError = err.msg
            } else if (err.param === 'password') {
               passwordError = err.msg
            }
         })
      }

      return (
         <div className="container container_position__center">
            <Paper square elevation={10} className={ classes.root } >

               <Tabs centered
                  name="tabValue"
                  value={ tabValue }
                  indicatorColor="secondary"
                  textColor="secondary"
                  onChange={ this.handleChangeTab }
               >
                  <Tab label="Login" />
                  <Tab label="Register" />
               </Tabs>

               <form noValidate autoComplete="off" className={ classes.form } >
                  <TextField fullWidth margin="normal" color="secondary"
                     required={ Boolean(tabValue) ? true : false }
                     label="User name" 
                     name="userName" 
                     type="text"
                     value={ this.state.userName }
                     onChange={ this.handleChangeInput }
                  />
                  { Boolean(tabValue) && 
                     <TextField fullWidth required margin="normal" color="secondary"
                        label="Email address" 
                        name="email" 
                        type="email"
                        error={ Boolean(emailError) }
                        helperText={ emailError ? emailError : "example@mail.com"}
                        value={ this.state.email }
                        onChange={ this.handleChangeInput }
                     />
                  }
                  <TextField fullWidth margin="normal" color="secondary"
                     required={ Boolean(tabValue) ? true : false }
                     label="Password" 
                     name="password" 
                     type="password" 
                     error={ Boolean(passwordError) }
                     helperText={ Boolean(tabValue) ? (passwordError ? passwordError : "minimum 6 characters") : "" }
                     value={ this.state.password }
                     onChange={ this.handleChangeInput }
                  />
                  <Button className={ classes.submitBtn }
                     onClick={ tabValue ? this.handleRegister : this.handleLogin } 
                  >
                     Submit
                  </Button>
                  <Button className={ classes.clearBtn } onClick={ this.handleClear } >
                     Clear
                  </Button>
               </form>
               
            </Paper>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'  }}
            open={ openSnackbar } 
            autoHideDuration={ 6000 } 
            onClose={ this.handleClose }>
               <Alert onClose={ this.handleClose } severity={ hasRegistered ? "success" : "error" } variant="outlined">
                  { hasRegistered ? "Registration has completed successfully" : authMessage } 
               </Alert>
            </Snackbar>

         </div>
      )
   }
}

const mapStateToProps = ({ userReducer }) => ({
   hasRegistered: userReducer.hasRegistered,
   registerErrors: userReducer.registerErrors,
   authMessage: userReducer.authMessage,
})
const mapDespatchToProps = dispatch => bindActionCreators( { 
   registerNewUser, loginUser
}, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(withStyles(useStyles)(Auth))