import { SEND_MSG, sendMessage } from '../store/actions/messages_action.js';

export default store => next => (action) => {
    switch (action.type) {
        case SEND_MSG: 
            if (action.sender === 'Alex') {
                setTimeout(() => store.dispatch(
                    sendMessage(
                        Object.keys(store.getState().msgReducer.messages[action.chatId]).length + 1,
                        action.chatId,
                        'Bot',
                        'I\'m bot'
                    )
                ), 1000);
            }
    }
    return next(action);
}