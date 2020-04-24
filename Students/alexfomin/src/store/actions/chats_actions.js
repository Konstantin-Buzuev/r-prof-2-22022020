export let ADD_CHAT = '@@chat/ADD_CHAT'
export let DEL_CHAT = '@@chat/DEL_CHAT'

export let addChat = (title) => ({
    type: ADD_CHAT,
    title: title
})

export let delChat = (chatId) => ({
    type: DEL_CHAT,
    chatId: chatId
})