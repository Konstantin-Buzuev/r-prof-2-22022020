import update from 'react-addons-update'
//import ACTIONS
import { 
    START_MESSAGES_LOADING, 
    SUCCESS_MESSAGES_LOADING,
    ERROR_MESSAGES_LOADING,
    START_MESSAGE_SEND,
    SUCCESS_MESSAGE_SEND,
    ERROR_MESSAGE_SEND
} from '../actions/messages_actions.js'

const initialStore = {
    messages: []
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SUCCESS_MESSAGES_LOADING: {
            return update(store, {
                messages: { $set: action.payload }
            })
        }
        
        case SUCCESS_MESSAGE_SEND: {
            if (action.payload._id) {
                let msg = action.payload.msg
                msg._id = action.payload._id
                return update(store, {
                    messages: { $push: [msg] }
                })
            }
        }
        default:
            return store;
    }
}