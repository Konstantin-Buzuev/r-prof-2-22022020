import React from 'react';
import ReactDom from 'react-dom';

import { Link } from 'react-router-dom'

import { List, ListItem } from 'material-ui/List'
import ContentSend from 'material-ui/svg-icons/content/send'
import AddIcon from 'material-ui/svg-icons/content/add'
import { TextField } from 'material-ui'
//store
import { addChat } from '../../store/actions/chats_actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class ChatList extends React.Component {
    state = {
        input: ''
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
        let { chats } = this.props
        const chatId = Object.keys(chats).length + 1;
        
        if (this.state.input !== '') {
            this.props.addChat(chatId, this.state.input)
            this.setState({ input: '' })
        }
    }

    render() {
        let { chats } = this.props
        let chatsArray = []
        Object.keys(chats).forEach(key => {
            chatsArray.push(
            <Link to={ `/chat/${key}` } key={ key }>
                <ListItem primaryText={chats[key].title} leftIcon = { <ContentSend /> } />
            </Link>
            )
        })

        return (
            <List>
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
                <div className="chatsListBlock">
                    { chatsArray }
                </div>
            </List>
            
        )
    }
}

const mapStateToProps = ({ chatsReducer }) => ({
    chats: chatsReducer.chats
})

const mapDispatchToProps = dispatch => bindActionCreators( { addChat }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)