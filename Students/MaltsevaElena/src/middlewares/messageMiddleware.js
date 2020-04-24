import { SUCCESS_MESSAGE_SENDING, sendMessage } from '../store/actions/messages_action.js'

export default store => next => (action) => {
   switch (action.type) {
      case SUCCESS_MESSAGE_SENDING:
         if (action.payload.sender === 'Me') {
            setTimeout(() => store.dispatch(
               sendMessage(
                  "bot",
                  "We'll call you back",
                  action.payload.chatId
               )
            ), 1000)
         }
   }
   return next(action)
}