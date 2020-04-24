export const SEND_MSG = '@@messages/SEND_MSG';

export const sendMessage = (messageId, sender, text, chatId) => ({
   type: SEND_MSG,
   messageId,
   sender, 
   text,
   chatId
});

export const ADD_MSG = '@@messages/ADD_MSG';

export const addMessage = (messageId, sender, text, chatId) => ({
   type: ADD_MSG,
   messageId,
   sender, 
   text,
   chatId
});