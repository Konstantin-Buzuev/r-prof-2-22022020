import { RSAA, getJSON } from 'redux-api-middleware';

export const ADD_CHAT = '@@chats/ADD_CHAT';

export const addChat = (chatId, title) => ({
   type: ADD_CHAT,
   chatId,
   title
});

export const START_CHATS_LOADING = '@@message/START_CHATS_LOADING'; 
export const SUCCESS_CHATS_LOADING = '@@message/SUCCESS_CHATS_LOADING'; 
export const ERROR_CHATS_LOADING = '@@message/ERROR_CHATS_LOADING';

export const loadChats = () => ({ 
   [RSAA]: { 
       endpoint: '/api/chats', 
       method: 'GET', 
       types: [ 
           START_CHATS_LOADING, 
           { 
               type: SUCCESS_CHATS_LOADING, 
               payload: (action, state, res) => getJSON(res).then( 
                   json => json, 
               ), 
           }, 
           ERROR_CHATS_LOADING, 
       ], 
   }, 
});