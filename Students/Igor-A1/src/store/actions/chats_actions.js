import { RSAA , getJSON } from 'redux-api-middleware';

export const CHANGE_CHAT = '@@chats/CHANGE_CHAT';

export const changeChat = chatId => ({
  type: CHANGE_CHAT,
  chatId
});

export const START_ADD_CHAT = '@@chats/START_ADD_CHAT';
export const SUCCESS_ADD_CHAT = '@@chats/SUCCESS_ADD_CHAT';
export const ERROR_ADD_CHAT = '@@chats/ERROR_ADD_CHAT';

export const addChat = (_id, title, user, bot) => ({
  [RSAA]: {
    endpoint: '/api/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: () => JSON.stringify({
      _id:    _id,
      title:  title,
      user:   user,
      bot:    bot
    }),
    types: [
      START_ADD_CHAT,
      {
        type: SUCCESS_ADD_CHAT,
        payload: (action, state, res) => 
          getJSON(res)
            .then(json => json.chat)
      },
      ERROR_ADD_CHAT
    ]
  }
});

export const START_CHATS_LOADING = '@@chats/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@chats/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@chats/ERROR_CHATS_LOADING';

export const loadChats = () => ({
  [RSAA]: {
    endpoint: '/api/chats',
    method: 'GET',
    types: [
      START_CHATS_LOADING,
      {
        type: SUCCESS_CHATS_LOADING,
        payload: (action, state, res) => 
          getJSON(res)
            .then(json => json.chats)
      },
      ERROR_CHATS_LOADING
    ]
  }
});

export const START_GET_CHAT = '@@chats/START_GET_CHAT';
export const SUCCESS_GET_CHAT = '@@chats/SUCCESS_GET_CHAT';
export const ERROR_GET_CHAT = '@@chats/ERROR_GET_CHAT';

export const getChat = (_id) => ({
  [RSAA]: {
    endpoint: `/api/chat/${_id}`,
    method: 'GET',
    types: [
      START_GET_CHAT,
      {
        type: SUCCESS_GET_CHAT,
        payload: (action, state, res) => 
          getJSON(res)
            .then(json => json.chat)
      },
      ERROR_GET_CHAT
    ]
  }
});