import { SEND_MSG } from '../store/actions/messages_action.js';
import { ADD_CHAT } from '../store/actions/chats_action.js';

export default store => next => (action) => {
    switch (action.type) {
        case ADD_CHAT: 
            action.chatId = +new Date();
        case SEND_MSG:
            action.messageId = +new Date();
    }
    return next(action);
}