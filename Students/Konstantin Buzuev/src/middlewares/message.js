import {
  SUCCESS_MESSAGE_SEND,
  sendMessage
} from "../store/actions/chat_actions.js";

export default store => next => action => {
  let payload = action.payload
  switch (action.type) {
    case SUCCESS_MESSAGE_SEND:
      payload.user = payload.user ? payload.user : "Bot";
      payload.text = payload.text ? payload.text : "Sorry, I'm busy ...";
      let sendAnswer = payload.user !== "Bot";
      // Здесь можно вставить произвольные фильтры
      // if (payload.text === "111") {
      //   payload.type = null;
      //   sendAnswer = false;
      // }
      if (sendAnswer) {
        setTimeout(() => {
          let currentID = store.getState().messageReducer.messages.length + 1;
          store.dispatch(sendMessage(currentID, payload.chatID, null, null));
        }, 300);
      }
      break

  }
  return next(action);
};