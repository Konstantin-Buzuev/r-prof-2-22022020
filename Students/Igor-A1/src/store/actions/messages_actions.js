import { RSAA , getJSON } from 'redux-api-middleware';

export const START_MESSAGES_LOADING = '@@msgs/START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = '@@msgs/SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = '@@msgs/ERROR_MESSAGES_LOADING';

export const loadMessages = (chatId) => ({
  [RSAA]: {
    endpoint: `/api/msgs/${chatId}`,
    method: 'GET',
    types: [
      START_MESSAGES_LOADING,
      {
        type: SUCCESS_MESSAGES_LOADING,
        payload: (action, state, res) => 
          getJSON(res)
            .then(json => json.msgs)
      },
      ERROR_MESSAGES_LOADING
    ]
  }
});

export const START_MESSAGE_SEND = '@@msgs/START_MESSAGES_SEND';
export const SUCCESS_MESSAGE_SEND = '@@msgs/SUCCESS_MESSAGES_SEND';
export const ERROR_MESSAGE_SEND = '@@msgs/ERROR_MESSAGES_SEND';

export const sendMessage = (_id, chatId, sender, text) => ({
  [RSAA]: {
    endpoint: '/api/msg',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: () => JSON.stringify({
      _id:    _id,
      chat:   chatId,
      sender: sender,
      text:   text
    }),
    types: [
      START_MESSAGE_SEND,
      {
        type: SUCCESS_MESSAGE_SEND,
        payload: (action, state, res) => 
          getJSON(res)
            .then(json => json.msg)
      },
      ERROR_MESSAGE_SEND
    ]
  }
});
