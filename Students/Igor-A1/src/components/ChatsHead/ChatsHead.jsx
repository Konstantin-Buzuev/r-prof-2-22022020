import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  Fab,
  IconButton,
  Icon } from '@material-ui/core';

import { indigo, purple, blue } from '@material-ui/core/colors';
const useStyles = (theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    justifyContent: 'space-around',
  },
  hovered: {
    '&:hover, &:active': {
       color: theme.palette.secondary.main
    },
  },
}));

const LightTooltip = withStyles(theme => ({
  arrow: {
    color: blue["400"],
  },
  tooltip: {
    backgroundColor: blue["400"],
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

class ChatsHead extends Component {
  
  changePushStatus = e => {
    // pushElement.dataset.checked = status;
    // pushElement.checked = status;
    // if(status) {
      // pushElement.classList.add( 'active' ) ;
      // pushImgElement.src = '../images/push-on.png' ;
    // } else {
      // pushElement.classList.remove( 'active' ) ;
      // pushImgElement.src = '../images/push-off.png' ;
    // }
  };

  render() {
    let { classes } = this.props;
    
    return (
      <div className="chats-head">
        <AppBar position="static">
          <Toolbar className={classes.root}>
            <LightTooltip  className={ classes.tooltip } arrow title="блокировать уведомления" aria-label="блокировать уведомления" placement="right">
              <Fab
                className={classes.hovered}
                color="primary"
                aria-label="notifications_off"
                onClick = { this.changePushStatus }
              >
                <Icon>notifications_off</Icon>
              </Fab>
            </LightTooltip >
            
            <Typography className={classes.title}>
              GeekMessenger&trade;
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
};

const mapStateToProps = ({}) => ({});

export default
  connect(mapStateToProps,)
    (withStyles(useStyles)(ChatsHead));
