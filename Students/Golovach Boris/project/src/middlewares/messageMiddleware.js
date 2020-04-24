import { SEND_MSG, sendMessage } from "../store/actions/messages_actions.js";

export default store => next => (action) => {
   switch (action.type) {
       case SEND_MSG:
           if (action.sender === 'Darth Vader') {
               if (action.chatId===1) {
                    setTimeout(() => store.dispatch(
                        sendMessage(
                            action.messageId + 1,
                            'Luke', 
                            'Noooo!',
                            action.chatId, 
                        )
                    ), 1000)
               }else{
                    setTimeout(() => store.dispatch(
                        sendMessage(
                            action.messageId + 1,
                            'Bot', 
                            'Заяц – Волк',
                            action.chatId, 
                        )
                    ), 1000)
               }

        }
   }
   return next(action)
}