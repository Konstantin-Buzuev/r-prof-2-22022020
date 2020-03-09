import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
// REDUX
import connect from "react-redux/es/connect/connect";

import { Link } from "react-router-dom";
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
// STYLES
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});
// MY COMPONENTS
import { chatTypes } from "../dictionary.jsx";
function chatTypeToComponent(type) {
  chatTypes.forEach(el => {
    if (el.type === type) return el.component;
  });
}

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.chatsEndRef = React.createRef();
  }
  scrollToBottom = () => {
    this.chatsEndRef.current.lastElementChild.scrollIntoView({
      behavior: "smooth"
    });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { classes } = this.props;
    const { chats } = this.props;
    console.log(this.props);
    let Chats = [];
    Object.keys(chats).forEach(key => {
      Chats.push(
        <Link to={"/chats/" + key} key={key}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>{chatTypeToComponent(chats[key].type)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={chats[key].name}
              secondary={chats[key].description}
            />
          </ListItem>
        </Link>
      );
    });
    return (
      <List className={classes.root} ref={this.chatsEndRef}>
        {Chats}
      </List>
    );
  }
}

const mapStateToProps = ({ roomReducer }) => {
  return {
    chats: roomReducer.chats
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(RoomList));
