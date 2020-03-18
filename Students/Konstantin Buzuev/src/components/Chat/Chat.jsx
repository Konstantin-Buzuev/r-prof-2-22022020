import React, { Component } from "react";
import PropTypes from "prop-types";
// MY COMPONENTS
import MessageManager from "./MessageManager/MessageManager.jsx";
import MessageField from "./MessageField/MessageField.jsx";
// COMPONENTS
import Divider from "@material-ui/core/Divider";

// STYLES
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    overflowY: "hidden",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  }
});

class Chat extends Component {
  static propTypes = {
    chatID: PropTypes.number,
    user: PropTypes.string
  };
  static defaultProps = {
    chatID: 1,
    user: "SomeUser"
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MessageField
          chatID={Number(this.props.chatID)}
          user={this.props.user}
        />
        <Divider />
        <MessageManager
          chatID={Number(this.props.chatID)}
          user={this.props.user}
        />
      </div>
    );
  }
}
export default withStyles(useStyles)(Chat);
