import React from "react";
import PropTypes from "prop-types";
// REDUX
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
// ROUTER
import { push } from "connected-react-router";
// ACTIONS
import { loadChats } from "../../../store/actions/room_actions.js";
// MY COMPONENTS
import { chatTypes } from "../dictionary.jsx";
function chatTypeToComponent(type) {
  let result = "";
  chatTypes.forEach(el => {
    if (el.type === type) {
      result = el.component;
    }
  });
  return result;
}
// STYLES
import { withStyles } from "@material-ui/core/styles";
const useStyles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});
// MATERIAL
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import SendIcon from "@material-ui/icons/Send";
import ChatIcon from "@material-ui/icons/Chat";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import AssistantOutlinedIcon from "@material-ui/icons/AssistantOutlined";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";

class RoomList extends React.Component {
  static propTypes = {
    chats: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired, //.isRequired - выпилил, поскольку в двух редюсерах пока не уживается
    push: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.chatsEndRef = React.createRef();
  }
  scrollToBottom = () => {
    if (
      this.chatsEndRef !== undefined &&
      this.chatsEndRef.current !== null &&
      this.chatsEndRef.current.lastElementChild !== null
    )
      this.chatsEndRef.current.lastElementChild.scrollIntoView({
        behavior: "smooth"
      });
  };

  componentDidMount() {
    this.props.loadChats();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleNavigate = link => {
    this.props.push(link);
  };

  render() {
    if (this.props.isLoading) {
      return <CircularProgress />;
    }
    const { classes } = this.props;
    const { chats } = this.props;
    let Chats = [];
    Object.keys(chats).forEach(key => {
      Chats.push(
        <ListItem
          button
          key={key}
          onClick={() => this.handleNavigate(`/chat/${key}`)}
        >
          <ListItemAvatar>
            <Avatar>{chatTypeToComponent(chats[key].type)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={chats[key].name}
            secondary={chats[key].description}
          />
        </ListItem>
      );
    });
    return (
      <List className={classes.root} ref={this.chatsEndRef}>
        {Chats}
      </List>
    );
  }
}

const mapStateToProps = ({ chatReducer }) => {
  return {
    chats: chatReducer.chats,
    isLoading: chatReducer.isLoading
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ push, loadChats }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(RoomList));
