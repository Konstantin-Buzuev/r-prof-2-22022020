import {
    RSAA,
    getJSON
} from 'redux-api-middleware';

export const START_CHATS_LOADING = '@@room/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@room/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@room/ERROR_CHATS_LOADING';

export const loadChats = () => ({
    [RSAA]: {
        endpoint: '/staticapi/chats.json',
        //        endpoint: '/api/',
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

export let ADD_CHAT = "@@room/ADD_CHAT";

export let addChat = (chatID, name, description, type) => ({
    type: ADD_CHAT,
    chatID: chatID,
    name: name,
    description: description,
    chatType: type
});