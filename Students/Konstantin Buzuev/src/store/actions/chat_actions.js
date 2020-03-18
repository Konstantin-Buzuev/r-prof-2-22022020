import {
  RSAA,
  getJSON
} from 'redux-api-middleware';
// Начальная загрузка сообщений
export const START_MESSAGES_LOADING = '@@chat/START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = '@@chat/SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = '@@chat/ERROR_MESSAGES_LOADING';
// Два ваарианта API
let loadEndPoint = '/staticapi/messages.json';
// let loadEndPoint = '/api/messages';
export const loadMessages = () => ({
  [RSAA]: {
    endpoint: loadEndPoint,
    method: 'GET',
    types: [
      START_MESSAGES_LOADING,
      {
        type: SUCCESS_MESSAGES_LOADING,
        payload: (action, state, res) => getJSON(res).then(json => {
          json.forEach(message => {
            if (!!message._id) { // Загружаем сообщения из mongo, а не из staticapi
              message.user = message.sender // Парсим из-за различия в реализации фронта и бэка
              delete message.sender
              message.chatID = Number(message.chatId)
              delete message.chatId
              message.messageID = Number(message.messageId)
              delete message.Id
            }
          })
          return json
        }),
      },
      ERROR_MESSAGES_LOADING,
    ],
  },
});

export const START_MESSAGE_SEND = '@@chat/START_MESSAGE_SEND';
export const SUCCESS_MESSAGE_SEND = '@@chat/SUCCESS_MESSAGE_SEND';
export const ERROR_MESSAGES_SEND = '@@chat/ERROR_MESSAGES_SEND';
let sendEndPoint = '/staticapi/messages.json';
// let sendEndPoint = '/api/message';

export let sendMessage = (messageID, chatID, sender, text) => {
  let _sender = (sender === null) ? "Bot" : sender;
  let _text = (text === null) ? "Sorry I'm busy" : text;
  if (sendEndPoint === '/staticapi/messages.json') {
    return ({
      type: SUCCESS_MESSAGE_SEND,
      payload: {
        chatID: chatID,
        messageID: messageID,
        user: _sender,
        text: _text
      }
    })
  } else {
    return ({
      [RSAA]: {
        endpoint: sendEndPoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: () => {
          return JSON.stringify({
            chatId: chatID,
            sender: _sender,
            text: _text
          });
        },
        types: [
          START_MESSAGE_SEND,
          {
            type: SUCCESS_MESSAGE_SEND,
            payload: (action, state, res) => getJSON(res).then(json => {
              json.user = json.sender // Парсим из-за различия в реализации фронта и бэка
              delete json.sender
              json.chatID = Number(json.chatId)
              delete json.chatId
              json.messageID = Number(json.messageId)
              delete json.Id
              return json
            })

          },
          ERROR_MESSAGES_SEND,
        ],
      },
    })
  }

}


















//   ({
//   type: SEND_MESSAGE,
//   messageID: messageID,
//   chatID: chatID,
//   sender: sender,
//   text: text
// });