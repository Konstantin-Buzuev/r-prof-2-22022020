import {
  SEND_MESSAGE, sendMessage,
  DEL_MESSAGE, 
} from '../store/actions/messageActions';
import { blinkChat } from '../store/actions/chatActions';

export default store => next => async (action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const { sender, text, chatId } = action;
      action.msgId = await sendToServer(sender, text, chatId);
      
      if (action.sender === 'Me') {
        setTimeout(() => {
          const sender = 'Bot';
          const text = 'Leave me alone, human...';
                store.dispatch(sendMessage(sender, text, action.chatId));
        }, 1000);
      }
      //TODO Мигать на любое новое "чужое" сообщение, не только бота
      if (action.sender === 'Bot') {
        store.dispatch(blinkChat(action.chatId));
      };
      break;
    
    case DEL_MESSAGE:
      action.result = await delFromServer(action.msgId);
      break;
  }
  return next(action);
};

async function sendToServer(sender, text, chatId) {
  const newMsg = { sender, text, chatId };
  const data = await fetch('/api/message', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMsg),
  });
  const res = await data.json();
  if (res.status == 1) {
    return res.msgId;
  }
}

async function delFromServer(messageId) {
  const data = await fetch(`/api/message/${messageId}`, {
    method: 'DELETE',
  });
  const res = await data.json();
  return res.status;
}