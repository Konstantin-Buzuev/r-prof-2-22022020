import React from "react";
import PropTypes from "prop-types";
import "typeface-roboto";

import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  Container,
  Grid,
  Fab
} from "@material-ui/core";
import "./style.css";

import Messages from "../Chat/MessageField/MessageField.jsx";
import MessageManager from "../Chat/MessageManager/MessageManager.jsx";
import Chat from "../Chat/Chat.jsx";
import Header from "../Header/Header.jsx";
import Rooms from "../Rooms/Rooms.jsx";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto", "Arial"].join(",")
  },
  overrides: {
    MuiContainer: {
      root: {
        height: "100vh",
        overflow: "hidden"
      }
    }
  }
});

export default class Layout extends React.Component {
  static propTypes = {
    chatID: PropTypes.number,
    user: PropTypes.string
  };
  static defaultProps = {
    chatID: 1,
    user: "Darth Vader"
  };
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <Container maxWidth="lg">
          <Header chatID={this.props.chatID} />
          <Grid
            container
            direction="row"
            justify="space-around"
            align-items="flex-start"
            spacing={1}
            className="wrapperGrid"
          >
            <Grid item xs={3} className="panel">
              <Rooms />
            </Grid>
            <Grid item xs={9} className="panel">
              <Chat chatID={Number(this.props.chatID)} user={this.props.user} />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}
