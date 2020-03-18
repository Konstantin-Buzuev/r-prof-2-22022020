import React from "react";
import ReactDom from "react-dom";
import "bootstrap";

import { Provider } from "react-redux";
import initStore from "./store/store.js";
import { history } from "./store/store.js";
import Router from "./router/router.jsx";
import { ConnectedRouter } from "connected-react-router";

const store = initStore();
let user = "Constantine";

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router user={user} />
    </ConnectedRouter>
  </Provider>,

  document.getElementById("app")
);
