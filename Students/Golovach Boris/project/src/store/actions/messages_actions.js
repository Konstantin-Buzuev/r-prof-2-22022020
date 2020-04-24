import { RSAA, getJSON } from 'redux-api-middleware';

export let SEND_MSG = '@@messages/SEND_MSG';

export let sendMessage = (messageId, sender, text, chatId) => ({
    type: SEND_MSG,
    messageId: messageId,
    sender: sender,
    text: text,
    chatId: chatId
})

export const START_MESSAGES_LOADING = '@@message/START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = '@@message/SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = '@@message/ERROR_MESSAGES_LOADING';

export const loadMessages = () => ({
   [RSAA]: {
       endpoint: '/staticAPI/messages.json',
       method: 'GET',
       types: [
           START_MESSAGES_LOADING,
           {
               type: SUCCESS_MESSAGES_LOADING,
               payload: (action, state, res) => getJSON(res).then(
                   json => json,
               ),
           },
           ERROR_MESSAGES_LOADING,
       ],
   },
});