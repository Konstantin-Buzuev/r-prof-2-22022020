import { RSAA, getJSON } from "redux-api-middleware";

export const START_MESSAGES_LOADING = '@@message/START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = '@@message/SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = '@@message/ERROR_MESSAGES_LOADING';

export const SEND_MESSAGE = '@@message/SEND_MESSAGE';
export const DEL_MESSAGE = '@@message/DEL_MESSAGE';
export const SET_SEARCH_TEXT = '@@message/SET_SEARCH_TEXT';

export const sendMessage = (sender, text, chatId) => ({
  type: SEND_MESSAGE,
  sender,
  text,
  chatId,
});

export const delMessage = (msgId) => ({
  type: DEL_MESSAGE,
  msgId,
});

export const setSearchText = (str) => ({
  type: SET_SEARCH_TEXT,
  str,
});

export const loadMessages = () => ({
  [RSAA]: {
    // endpoint: '/static_api/messages.json',
    endpoint: '/api/messages',
    method: 'GET',
    types: [
      START_MESSAGES_LOADING,
      {
        type: SUCCESS_MESSAGES_LOADING,
        payload: (action, state, res) =>
          getJSON(res).then(json => json)
        ,
      },
      ERROR_MESSAGES_LOADING,
    ],
  },
});