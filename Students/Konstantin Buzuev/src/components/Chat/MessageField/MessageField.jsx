import React, { Component } from "react";
import PropTypes from "prop-types";
// REDUX
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
// ACTIONS
import { loadMessages } from "../../../store/actions/chat_actions.js";
// MY COMPONENTS
import Message from "../Message/Message.jsx";
// STYLES
import { withStyles } from "@material-ui/core/styles";
import { Box, Fab, TextField, GridList, Grid } from "@material-ui/core";
// MATERIAL
import CircularProgress from "@material-ui/core/CircularProgress";

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
  },
  gridList: {
    width: "100%"
  }
});
class Messages extends Component {
  static propTypes = {
    isMessageLoading: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired
  };
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();
  }
  scrollToBottom = () => {
    if (
      this.messagesEndRef !== undefined &&
      this.messagesEndRef.current !== null &&
      this.messagesEndRef.current.lastElementChild !== null
    )
      this.messagesEndRef.current.lastElementChild.scrollIntoView({
        behavior: "smooth"
      });
  };

  componentDidMount() {
    if (this.props.isMessageLoading) this.props.loadMessages();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    if (this.props.isMessageLoading) {
      return <CircularProgress />;
    }
    const { classes } = this.props;
    let { messages } = this.props;
    let Messages = [];
    Object.keys(messages).forEach(key => {
      Messages.push(
        <Message
          key={key}
          sender={messages[key].user}
          text={messages[key].text}
        />
      );
    });
    return (
      <div className={classes.root}>
        <GridList
          className={classes.gridList}
          cols={1}
          spacing={0}
          ref={this.messagesEndRef}
        >
          {Messages}
        </GridList>
      </div>
    );
  }
}
const mapStateToProps = ({ messageReducer }, ownProps) => {
  const { chatID } = ownProps;
  const { messages } = messageReducer;
  let chatMessages = [];
  messages.forEach(message => {
    message.chatID = Number(message.chatID);
  });
  messages.forEach(message => {
    if (+message.chatID === chatID) chatMessages.push(message);
  });

  return {
    messages: chatMessages,
    isMessageLoading: messageReducer.isMessageLoading
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadMessages }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Messages));
