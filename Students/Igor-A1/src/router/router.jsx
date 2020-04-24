import React, { Component }  from 'react';

import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout/Layout.jsx';

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact={ true}
          path='/'
          component={ Layout }
        />
        <Route
          exact 
          path='/chat/:id/' 
          render={ obj => 
            <Layout
              chatId={ obj.match.params.id } 
            />
          }
        />
      </Switch>
    )
  };
};