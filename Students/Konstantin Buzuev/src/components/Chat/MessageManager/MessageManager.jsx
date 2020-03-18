import React, { Component } from "react";
import PropTypes from "prop-types";
// ACTIONS
import { sendMessage } from "../../../store/actions/chat_actions.js";
// REDUX
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
// COMPONENTS
import { Fab, TextField, Grid } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
// STYLES
import { withStyles } from "@material-ui/core/styles";
const useStyles = theme => ({
  inputText: {
    width: "calc(100% - 64px)"
  },
  bottomPanel: {
    padding: "10px"
  }
});
class MessageManager extends Component {
  static propTypes = {
    currentID: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.state.message = "";
  }
  sendMessage = (text, sender) => {
    const chatID = this.props.chatID;
    const currentID = this.props.currentID;
    this.props.sendMessage(currentID, chatID, sender, text);
  };

  handleSendMessage(message, sender) {
    this.sendMessage(message, sender);
    this.setState({ message: "" });
  }

  handleChange = event => {
    if (event.keyCode !== 13) this.setState({ message: event.target.value });
    else this.handleSendMessage(this.state.message, this.props.user);
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          className={classes.bottomPanel}
          container
          direction="row"
          justify="space-between"
          align-items="flex-start"
          spacing={1}
        >
          <TextField
            className="flex-grow-1"
            className={classes.inputText}
            label="Новое сообщение"
            id="Name"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyUp={this.handleChange}
            variant="outlined"
            size="small"
          />
          <Fab
            color="primary"
            className="sendButton"
            size="small"
            onClick={() =>
              this.handleSendMessage(this.state.message, this.props.user)
            }
          >
            <SendIcon />
          </Fab>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ messageReducer }) => {
  return {
    currentID: messageReducer.messages.length + 1
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ sendMessage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MessageManager));
