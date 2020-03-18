import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";
// REDUX
import connect from "react-redux/es/connect/connect";

class Router extends React.Component {
  render() {
    const { chats } = this.props;
    let Routes = [];
    Object.keys(chats).forEach(key => {
      Routes.push(
        <Route
          exact
          key={key}
          path={"/chat/" + key}
          render={() => <Layout user={this.props.user} chatID={Number(key)} />}
        />
      );
    });
    return (
      <Switch>
        <Route
          exact
          key="0"
          path="/"
          render={() => <Layout user={this.props.user} chatID="" />}
        />
        {Routes}
      </Switch>
    );
  }
}
const mapStateToProps = ({ chatReducer }) => {
  return {
    chats: chatReducer.chats
  };
};

export default connect(mapStateToProps)(Router);
