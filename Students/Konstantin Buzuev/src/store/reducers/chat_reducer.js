import update from 'react-addons-update'
// ACTIONS
import {
    ADD_CHAT,
    START_CHATS_LOADING,
    SUCCESS_CHATS_LOADING,
    ERROR_CHATS_LOADING
} from '../actions/room_actions.js'


let initialStore = {
    chats: {},
    isLoading: true
}

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case ADD_CHAT: {
            store = update(store, {
                chats: {
                    $merge: {
                        [action.chatID]: {
                            name: action.name,
                            description: action.description,
                            type: action.chatType,
                        }
                    }
                }
            });
            return store;
        }
        case START_CHATS_LOADING: {
            store = update(store, {
                isLoading: {
                    $set: true
                },
            });
            return store;
        }
        case SUCCESS_CHATS_LOADING: {
            const chats = action.payload;
            store = update(store, {
                chats: {
                    $merge: chats
                },
                isLoading: {
                    $set: false
                },
            });
            return store;
        }
        case ERROR_CHATS_LOADING: {
            store = update(store, {
                isLoading: {
                    $set: false
                },
            });
            return store;
        }

        default:
            return store;
    }
}