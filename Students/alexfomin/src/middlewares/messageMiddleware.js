import { SEND_MSG, sendAnswer, sendMessage } from "../store/actions/messages_actions.js";

export default store => next => (action) => {
   switch (action.type) {
       case SEND_MSG:
           if (action.sender === 'Darth Vader') {
            
            setTimeout(() => store.dispatch( 
              sendAnswer(Object.keys(store.getState().msgReducer.messages).length + 1,
             'Luke', "I'm not your son, just bot", action.chatId)), 1000)

           }
   }
   return next(action)
}
