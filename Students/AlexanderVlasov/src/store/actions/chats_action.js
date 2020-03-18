export let ADD_CHAT = '@@messages/ADD_CHAT';
export let DEL_CHAT = '@@messages/DEL_CHAT';

export let addChat = (title) => ({
    type: ADD_CHAT,
    title: title
})

export let delChat = (chatId) => ({
    type: DEL_CHAT,
    chatId
})