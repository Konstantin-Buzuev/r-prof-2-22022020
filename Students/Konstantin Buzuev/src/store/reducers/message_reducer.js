import update from 'react-addons-update'
// ACTIONS
import {
    START_MESSAGES_LOADING,
    SUCCESS_MESSAGES_LOADING,
    ERROR_MESSAGES_LOADING,
    SEND_MESSAGE,
    START_MESSAGE_SEND,
    SUCCESS_MESSAGE_SEND,
    ERROR_MESSAGES_SEND,
} from '../actions/chat_actions.js'


let initialStore = {
    messages: [],
    isMessageLoading: true,
    isMessageSending: false
}

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            store = update(store, {
                messages: {
                    $push: [{
                        messageID: action.messageID,
                        chatID: action.chatID,
                        user: action.sender,
                        text: action.text

                    }]
                }
            });
            return store;
        }
        case START_MESSAGES_LOADING: {
            store = update(store, {
                isMessageLoading: {
                    $set: true
                },
            });
            return store;
        }
        case SUCCESS_MESSAGES_LOADING: {
            const messages = action.payload;
            store = update(store, {
                messages: {
                    $push: messages
                },
                isMessageLoading: {
                    $set: false
                },
            });
            return store;
        }
        case ERROR_MESSAGES_LOADING: {
            console.log("Message loading failed")
            store = update(store, {
                isMessageLoading: {
                    $set: false
                },
            });
            return store;
        }
        case START_MESSAGE_SEND: {
            store = update(store, {
                isMessageSending: {
                    $set: true
                },
            });
            return store;
        }
        case SUCCESS_MESSAGE_SEND: {
            const message = action.payload;
            store = update(store, {
                messages: {
                    $push: [message]
                },
                isMessageSending: {
                    $set: false
                },
            });
            return store;
        }
        case ERROR_MESSAGES_SEND: {
            console.log("Message sent failed")
            store = update(store, {
                isMessageSending: {
                    $set: false
                },
            });
            return store;
        }

        default:
            return store;
    }
}