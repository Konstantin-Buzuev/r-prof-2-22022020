import update  from 'react-addons-update'
import { SEND_MSG } from '../actions/messages_actions.js'

const initialStore = {
    messages: {
        1: {
            1: { user: 'Darth', text: 'Halo', chatId: 1},
            2: { user: null, text: null, chatId: 1},
            3: { user: 'Darth', text: 'I am your father', chatId: 1 },
            4: { user: null, text: 'NOOOOOOOOO', chatId: 1 }
        },
        2: {
            1: { user: 'Support', text: 'Describe your problem', chatId: 2} 
        },
        3: {
            1: { user: 'Friend', text: 'Hi! How you doing?', chatId: 3},
            2: { user: 'You', text: 'ok', chatId: 3},
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
                                text: action.text, 
                                chatId: action.chatId 
                            } 
                        } 
                    }
                }
            });
        }
        default: return store;
    }
}