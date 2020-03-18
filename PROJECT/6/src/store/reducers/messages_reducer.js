import update from 'react-addons-update'
//import ACTIONS
import {
    SEND_MSG
} from '../actions/messages_actions.js'

const initialStore = {
    messages: {
        1: {
            user: 'Darth Vader',
            text: 'Hallo'
        },
        2: {
            user: null,
            text: null
        },
        3: {
            user: 'Darth Vader',
            text: 'I am your father'
        },
        4: {
            user: null,
            text: 'NOOOOOOOOO'
        }
    }
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            return update(store, {
                messages: {
                    $merge: {
                        [action.messageID]: {
                            user: action.sender,
                            text: action.text
                        }
                    }
                }
            });
        }
        default:
            return store;
    }
}