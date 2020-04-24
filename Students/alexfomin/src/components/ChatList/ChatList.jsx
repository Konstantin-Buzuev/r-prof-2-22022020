import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem,  InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import './style.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addChat, delChat } from '../../store/actions/chats_actions.js'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'

 class ChatList extends Component {
    static propTypes = {
        chats: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        addChat: PropTypes.func.isRequired,
    }


        state = {   title: '' }

        handleAddChat = () => {
            this.props.addChat(this.state.title)
            this.setState({ title: '' })
        }

        handleDelChat = (event, chatId) => {
            this.props.delChat(chatId)
            event.stopPropagation()
        }

        handleNavigate = (link) => {
            this.props.push(link)
        }

        handleChangeChatName = (e) => {
            if (e.keyCode !== 13) {
                this.setState ({title: e.target.value})
                console.log(this.state.title)
            }
        }

    render() {
        let { chats } = this.props
        let chatsArray = []
        
        Object.keys(chats).forEach(key => {
            chatsArray.push(
                <ListGroupItem onClick = { () => this.handleNavigate(`/chat/${key}`) }>{chats[key].title}<Button close onClick = {(event) => this.handleDelChat(event, key)}/></ListGroupItem>
            )
        })


        return (
  <>
      <ListGroup className="chatlist">
      { chatsArray }
        <ListGroupItem>
        <InputGroup>
        <Input placeholder="название чата" onChange = {this.handleChangeChatName} value={this.state.title} />
        <InputGroupAddon addonType="append">
        <Button color="info" onClick = { this.handleAddChat }>+</Button>
        </InputGroupAddon>
      </InputGroup>
        </ListGroupItem>
      </ListGroup>
</>
        );
    }
}



const mapStateToProps = ({ chatsReducer }) => ({
    chats: chatsReducer.chats
})


const mapDispatchToProps = dispatch => bindActionCreators( { addChat, delChat, push }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)