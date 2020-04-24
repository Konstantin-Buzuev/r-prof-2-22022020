import {
  ADD_CHAT, DEL_CHAT, 
} from '../store/actions/chatActions';
import { delMessage } from "../store/actions/messageActions.js";

export default store => next => async (action) => {
  switch (action.type) {
    case ADD_CHAT:
      action.chatId = await sendToServer(action.title);
      break;
    
    case DEL_CHAT:
      action.result = await delFromServer(action.chatId);
      if (await action.result) {
        store.getState().messageReducer.msgs.forEach(msg => {
          if (msg.chatId === action.chatId) {
            store.dispatch(delMessage(msg._id));
          }
        });
      }
      break;
  }
  return next(action);
};


//TODO Такие же функции в messageMiddleware - обощить и вынести с отдельный файл?
async function sendToServer(title) {
  const data = await fetch('/api/chat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title: title}),
  });
  const res = await data.json();
  if (res.status == 1) {
    return res.chatId;
  }
}

async function delFromServer(chatId) {
  const data = await fetch(`/api/chat/${chatId}`, {
    method: 'DELETE',
  });
  const res = await data.json();
  return res.status;
}
