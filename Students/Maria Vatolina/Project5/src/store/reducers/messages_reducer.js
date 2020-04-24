import update  from 'react-addons-update'
import { SEND_MSG } from '../actions/messages_actions.js'

const initialStore = {
    messages: {
        1: {
            1: { user: 'Darth Vader', text: 'Halo'},
            2: { user: null, text: null},
            3: { user: 'Darth Vader', text: 'I am your father' },
            4: { user: null, text: 'NOOOOOOOOO' }
        },
        2: {
            1: { user: 'Support', text: 'Describe your problem'} 
        },
        3: {
            1: { user: 'Friend', text: 'Hi! How you doing'},
            2: { user: 'You', text: 'ok'},
        }
    }
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            console.log('store.messages:',store.messages)
            return update(store, {
                messages: { 
                    [action.chatId]: {
                        $merge: { 
                            [action.messageId]: {
                                user: action.sender, 
                                text: action.text 
                            } 
                        } 
                    }
                }
            });
        }
        default: return store;
    }
}