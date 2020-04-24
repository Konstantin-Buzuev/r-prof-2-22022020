//export const SEND_MSG = '@@messages/SEND_MSG'
//export const SEND_ANS = '@@messages/SEND_ANS'
import { RSAA, getJSON } from 'redux-api-middleware';

export const START_MESSAGE_SENDING = '@@message/START_MESSAGE_SENDING';
export const SUCCESS_MESSAGE_SENDING = '@@message/SUCCESS_MESSAGE_SENDING';
export const ERROR_MESSAGE_SENDING = '@@message/ERROR_MESSAGE_SENDING';
export const START_MESSAGES_LOADING = '@@message/START_MESSAGE_LOADING';
export const SUCCESS_MESSAGES_LOADING = '@@message/SUCCESS_MESSAGE_LOADING';
export const ERROR_MESSAGES_LOADING = '@@message/ERROR_MESSAGE_LOADING';

export const sendMessage = (messageId, sender, text, chatId) => ({
   [RSAA]: {
       endpoint: '/api/message',
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({chatId, sender, text}),
       types: [
        START_MESSAGE_SENDING,
           {
               type: SUCCESS_MESSAGE_SENDING,
               payload: (action, state, res) => getJSON(res).then(
                   json => {
                    return {json,  msg: {chatId, sender, text}} //Status
                }
               ),
           },
           ERROR_MESSAGE_SENDING,
       ],
   },
});


export const loadMessages = () => ({
    [RSAA]: {
        endpoint: '/api/messages',
        method: 'GET',
        types: [
         START_MESSAGES_LOADING,
            {
                type: SUCCESS_MESSAGES_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => {
                        // console.log('sdsdds')
                     return {json} //Status
                 }
                ),
            },
            ERROR_MESSAGES_LOADING,
        ],
    },
 });

// export let sendMessage = (messageId, sender, text, chatId) => ({
//     type: SEND_MSG,
//     messageId: messageId,
//     sender: sender,
//     text: text,
//     chatId: chatId
// })



// export let sendAnswer = (messageId, sender, text, chatId) => ({
//     type: SEND_ANS,
//     messageId: messageId,
//     sender: sender,
//     text: text,
//     chatId: chatId
// })