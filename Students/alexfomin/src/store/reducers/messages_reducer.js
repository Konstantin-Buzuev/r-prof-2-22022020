import update from 'react-addons-update'
//import ACTIONS
import { START_MESSAGE_SENDING,
    SUCCESS_MESSAGE_SENDING,
    ERROR_MESSAGE_SENDING,
    START_MESSAGES_LOADING,
    SUCCESS_MESSAGES_LOADING,
    ERROR_MESSAGES_LOADING } from '../actions/messages_actions.js'

const initialStore = {
    messages: []
    // messages: {
    //     1: {
    //         user: 'Darth Vader',
    //         text: 'Hallo',
    //         chatId: 1
    //     },
    //     2: {
    //         user: 'Luke',
    //         text: 'Where is my droid?',
    //         chatId: 2
    //     },
    //     3: {
    //         user: 'Darth Vader',
    //         text: 'I am your father'
    //     },
    //     4: {
    //         user: 'Luke',
    //         text: 'NOOOOOOOOO',
    //         chatId: 3
    //     },
    //     5: {
    //         user: 'Luke',
    //         text: 'Get out!',
    //         chatId: 3
    //     },
    //     6: {
    //         user: 'Darth Vader',
    //         text: '))))))',
    //         chatId: 2
    //     },
    //     4: {
    //         user: 'Darth Vader',
    //         text: 'Yeap',
    //         chatId: 2
    //     },
    // }
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        // case SEND_MSG: {
        //     return update(store, {
        //         messages: { $merge: { [action.messageId]: { user: action.sender, text: action.text, chatId: action.chatId } } }
        //     });
        // }
        // case SEND_ANS: {
        //     return update(store, {
        //         messages: { $merge: { [action.messageId]: { user: action.sender, text: action.text, chatId: action.chatId } } }
        //     });
        // }
        case SUCCESS_MESSAGE_SENDING: {
            if (action.payload.json) {
                let msg = action.payload.msg
                msg._id = action.payload.json._id
                //console.log('dfdfee', action)
                return update(store, {
                    messages: { $merge: {[msg._id]: { user: msg.sender, text: msg.text, chatId: msg.chatId }} }
                })
            }
        }
        case SUCCESS_MESSAGES_LOADING: {
            console.log('SUCCESS_MESSAGES_LOADING')
            if (action.payload.json) {
                //console.log('dfdfee', action.payload)
                return update(store, {
                    messages: { $set: action.payload.json }
                })
            }
        }
        default:
            return store;
    }
}