import { RSAA, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { chats } from '../../utils/schemas'; 

export let ADD_CHAT = '@@chat/ADD_CHAT'

export let addChat = (chatId, title) => ({
    type: ADD_CHAT,
    title: title,
    chatId: chatId
})

export const START_CHATS_LOADING = '@@chat/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@chat/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@chat/ERROR_CHATS_LOADING';

export const loadChats = () => ({
   [RSAA]: {
       endpoint: '/staticAPI/chats.json',
       method: 'GET',
       types: [
           START_CHATS_LOADING,
           {
               type: SUCCESS_CHATS_LOADING,
               payload: (action, state, res) => getJSON(res).then(
                   json => normalize(json, [chats]),
               ),
           },
           ERROR_CHATS_LOADING,
       ],
   },
});