import { SEND_MSG, sendMessage } from '../store/actions/messages_actions.js';

export default store => next => (action) => {
   switch (action.type) {
      case SEND_MSG: {
         if ( action.sender === store.getState().userReducer.user ) {
            // const messageId = action.messageId + 1;
            const newMessage = {
               sender: 'Bot',
               text: 'NOOOOOOOOOO...',
               chatId: action.chatId,
           };
            fetch("/api/message", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json"
               },
               body: JSON.stringify(newMessage)
             })
               .then(response => response.json())
               .then(data => {
                 console.log(data._id);
                 store.dispatch (sendMessage(data._id, null, 'NOOOOOOOOOO...', action.chatId));
               })
               .catch(err => {
                 console.log(err);
               });
         } 
      }

   }
   return next (action);
};