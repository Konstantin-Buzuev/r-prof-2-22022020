import React from 'react'
import './style.css'

import MessagesField from '../MessagesField/MessagesField.jsx'
import ChatList from '../ChatList/ChatList.jsx'
import Header from '../Header/Header.jsx'

import PropTypes from 'prop-types'

//store
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
    }

    static defaultProps = {
        chatId: 1,
    }
    
    render() {
        return(
            <div className="d-flex justify-content-center w-100 layout">
                <div className="d-flex w-100 justify-content-center layout-left-side">
                    <Header chatId = { this.props.chatId }/>
                    <div className="pr-5">
                        <ChatList />
                    </div>
                    <div className="layout-right-side">
                        <MessagesField usr = { this.props.usr }/>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = ({}) => ({})

export default connect(mapStateToProps)(Layout)