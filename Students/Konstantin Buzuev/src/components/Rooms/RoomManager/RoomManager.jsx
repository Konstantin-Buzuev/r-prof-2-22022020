import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
// ACTIONS
import { sendMessage } from "../../../store/actions/chat_actions.js";
import { addChat } from "../../../store/actions/room_actions.js";
// REDUX
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
// MATERIAL
import {
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Avatar,
  Button,
  MenuItem
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
//ICONS
import AddIcon from "@material-ui/icons/Add";
// MY COMPONENTS
import { chatTypes } from "../dictionary.jsx";
// STYLES
import { withStyles } from "@material-ui/core/styles";
const useStyles = theme => ({
  addButton: {
    flexDirection: "column"
  },
  textField: {
    width: "100%",
    fontSize: "14px"
  },
  iconPopUp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

class ChatManager extends React.Component {
  static propTypes = {
    addChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.state.chatTypeValue = null;
    this.state.name = "";
    this.state.description = "";
    this.state.type = null;
  }

  setType(newValue) {
    if (newValue === null) this.setState({ type: null });
    else this.setState({ type: newValue.type });
    this.setState({ chatTypeValue: newValue });
  }

  addChat(chatID, name, description, type) {
    this.props.addChat(chatID, name, description, type);
    this.props.sendMessage(
      this.props.currentID,
      chatID,
      "Bot",
      `Welcome to  ${name} chatroom`
    );
  }
  handleAddChat(_name, _description, _type) {
    const { chats } = this.props;
    const chatID = Object.keys(chats).length + 1;
    let name = _name !== "" ? _name : `Room ${chatID}`;
    let description =
      _description !== "" ? _description : `Room ${chatID} description`;
    let type = _type !== null ? _type : "normal";
    this.addChat(chatID, name, description, type);
    this.setState({ name: "", description: "", type: null });
    this.setType(null);
  }
  handleChange = event => {
    if (event.keyCode !== 13) {
      this.setState({ [event.target.id]: event.target.value });
    } else
      this.handleAddChat(
        this.state.name,
        this.state.description,
        this.state.type
      );
  };
  handleClick = () => {
    this.handleAddChat(
      this.state.name,
      this.state.description,
      this.state.type
    );
  };
  componentDidMount() {
    fetch("staticapi/chats.json")
      .then(body => body.json())
      .then(json => {
        Object.keys(json).forEach(key => {
          this.props.addChat(
            key,
            json[key].name,
            json[key].description,
            json[key].type
          );
        });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <TextField
            className="flex-grow-1"
            className={classes.textField}
            label="Имя нового чата"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
            onKeyUp={this.handleChange}
            size="small"
            variant="outlined"
          />
        </ListItem>
        <ListItem>
          <TextField
            className="flex-grow-1"
            className={classes.textField}
            label="Краткое описание"
            id="description"
            value={this.state.description}
            onChange={this.handleChange}
            onKeyUp={this.handleChange}
            size="small"
            variant="outlined"
          />
        </ListItem>
        <ListItem>
          <Autocomplete
            id="icon"
            autoSelect={false}
            size="small"
            options={chatTypes}
            className={classes.textField}
            value={this.state.chatTypeValue}
            onChange={(event, newValue) => {
              this.setType(newValue);
            }}
            getOptionLabel={option => option.label}
            renderOption={option => {
              if (option !== "")
                return (
                  <React.Fragment>
                    <div className={classes.iconPopUp}>
                      {option.component}
                      {option.label}
                    </div>
                  </React.Fragment>
                );
            }}
            renderInput={params => (
              <TextField {...params} label="Тип чата" variant="outlined" />
            )}
          />
        </ListItem>
        <ListItem
          button
          onClick={this.handleClick}
          className={classes.addButton}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = ({ chatReducer, messageReducer }) => {
  return {
    chats: chatReducer.chats,
    currentID: messageReducer.messages.length + 1
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addChat, sendMessage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ChatManager));

/*




*/
