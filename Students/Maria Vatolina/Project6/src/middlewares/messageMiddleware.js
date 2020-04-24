import { SEND_MSG, sendMessage } from '../store/actions/messages_actions.js'

export default store => next => (action) => {
    switch (action.type) {
        case SEND_MSG:
            if (action.sender === 'Darth'){
                console.log('middleware')
                setTimeout(() => store.dispatch(
                    sendMessage(
                        action.chatId,
                        Object.keys(store.getState().msgReducer.messages[action.chatId]).length + 1,
                        null,
                        'NoooOoooOo!'
                    )
                ), 1000
                )

            }
    }
    return next(action)
}