import React from 'react'
import ReactDom from 'react-dom'

// Styles, UI
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex',
      flexDirection: 'column',
      color: theme.palette.text.primary,
   },
   myAnswer: {
      alignSelf: 'flex-end',
      backgroundColor: theme.palette.primary.main,
   },
   botAnswer: {
      alignSelf: 'flex-start',
      backgroundColor: theme.palette.primary.light,
   }
 }))

let msg = (props) => {

   const classes = useStyles()

   let { sender, text, botName} = props
   sender = (sender === 'bot' ? botName : sender)

   let boxView = (sender === 'Me' ? classes.myAnswer : classes.botAnswer)

   return (
      <Grid container wrap="nowrap" className={ classes.root }>
         <Box className={ boxView } m={1} p={1} width="55%" borderRadius="4px" boxShadow={1}>
            <Grid item >
               <Typography variant="caption"> { sender } </Typography>
            </Grid>
            <Grid item >
               <Typography variant="body1"> { text } </Typography>
            </Grid>
         </Box>
      </Grid>
   )
}

export default msg