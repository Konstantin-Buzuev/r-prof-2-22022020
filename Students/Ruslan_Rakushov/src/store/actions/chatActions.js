import { RSAA, getJSON } from "redux-api-middleware";

export const START_CHATS_LOADING = '@@chat/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@chat/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@chat/ERROR_CHATS_LOADING';

export const ADD_CHAT = '@@chat/ADD_CHAT';
export const BLINK_CHAT = '@@chat/BLINK_CHAT';
export const DEL_CHAT = '@@chat/DEL_CHAT';
export const SET_CURRENT_CHAT = '@@chat/SET_CURRENT_CHAT';

export const addChat = (title) => ({
  type: ADD_CHAT,
  title,
});

export const delChat = (chatId) => ({
  type: DEL_CHAT,
  chatId,
});

export const blinkChat = (chatId) => ({
  type: BLINK_CHAT,
  chatId,
});

export const setCurrentChatId = (chatId) => ({
  type: SET_CURRENT_CHAT,
  chatId,
});

export const loadChats = () => ({
  [RSAA]: {
    // endpoint: '/static_api/chats.json',
    endpoint: '/api/chats',
    method: 'GET',
    types: [
      START_CHATS_LOADING,
      {
        type: SUCCESS_CHATS_LOADING,
        payload: (action, state, res) => {
          return getJSON(res).then(json => json);
        },
      },
      ERROR_CHATS_LOADING,
    ],
  },
});
