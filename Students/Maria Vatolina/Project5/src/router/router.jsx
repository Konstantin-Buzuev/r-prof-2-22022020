import React from 'react'


import { Switch, Route } from 'react-router-dom'
// import { render } from 'react-dom'
import Layout from '../components/Layout/Layout.jsx'

export default class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path = "/" component = { Layout } />
                <Route path="/chat/:chatId" component= { Layout }/> }/>
                {/* <Route exact path = "chat/1" render = {
                    () => <Layout chatId = { 1 } /> } />
                 */}
            </Switch>
        );
    }
}