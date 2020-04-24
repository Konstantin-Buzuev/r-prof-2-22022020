import React from 'react';
import ReactDom from 'react-dom';
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './style.css';

const useStyles = makeStyles(theme => ({
    root: {
       display: 'flex',
       flexDirection: 'column',
       color: theme.palette.text.primary,
    },
    myText: {
       alignSelf: 'flex-end',
       backgroundColor: theme.palette.primary.main,
    },
    answer: {
       alignSelf: 'flex-start',
       backgroundColor: theme.palette.primary.light,
    }
  }))

let msg = (props) => {
    const classes = useStyles()

    let { sender, text, chatId, chats} = props
    sender ? sender = sender : sender = 'Luke'

   let boxView = props.sender ? classes.myText : classes.answer

    return (
        <Grid container wrap="nowrap" className={ classes.root }>
         <Box className={ boxView } m={1} p={1} width="55%" borderRadius="5px" boxShadow={1}>
            <Grid item >
               <Typography variant="caption"> { sender } </Typography>
            </Grid>
            <Grid item >
               <Typography variant="body1"> { props.sender || (!props.sender && text) ? text : "please whait..."} </Typography>
            </Grid>
         </Box>
      </Grid>
    )
}

export default msg