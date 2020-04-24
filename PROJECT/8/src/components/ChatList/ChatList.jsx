import React from 'react';
import ReactDom from 'react-dom';

import { Link } from 'react-router-dom'

import { List, ListItem } from 'material-ui/List'
import ContentSend from 'material-ui/svg-icons/content/send'
import AddIcon from 'material-ui/svg-icons/content/add'
import { TextField } from 'material-ui'
//store
import { addChat, loadChats } from '../../store/actions/chats_actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { push } from 'connected-react-router'

class ChatList extends React.Component {
    static propTypes = {
        chats: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        addChat: PropTypes.func.isRequired,
    }

    state = {
        input: ''
    }

    handleNavigate = (link) => {
        this.props.push(link)
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleKeyUp = (evt) => {
        if (evt.keyCode === 13) {
            this.handleAdd()
        }
    }

    handleAdd = () => {
        if (this.state.input !== '') {
            this.props.addChat(this.state.input)
            this.setState({ input: '' })
        }
    }

    componentDidMount() {
        this.props.loadChats()
    }
    render() {
        let { chats } = this.props
        console.log(this.props)
        let chatsArray = []
        
        Object.keys(chats).forEach(key => {
            chatsArray.push(
                <ListItem 
                    primaryText={chats[key].title} 
                    leftIcon = { <ContentSend /> } 
                    onClick = { () => this.handleNavigate(`/chat/${key}`) }
                />
            )
        })

        return (
            <List>
                { chatsArray }
                <ListItem 
                    key="Add new chat"
                    leftIcon = { <AddIcon /> }
                    onClick = { this.handleAdd }
                    children = {
                        <TextField 
                            key="textField"
                            name="input"
                            hintText="Add new chat"
                            onChange = { this.handleChange }
                            value = { this.state.input }
                            onKeyUp = { this.handleKeyUp }
                        />
                    }
                />
            </List>
            
        )
    }
}

const mapStateToProps = ({ chatsReducer }) => ({
    chats: chatsReducer.chats
})

const mapDispatchToProps = dispatch => bindActionCreators( { addChat, loadChats }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)