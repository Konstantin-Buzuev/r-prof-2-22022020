export let SEND_MSG = '@@messages/SEND_MSG';

export let sendMessage = (messageId, chatId, sender, text) => ({
    type: SEND_MSG,
    chatId: chatId,
    messageId: messageId,
    sender: sender,
    text: text
})