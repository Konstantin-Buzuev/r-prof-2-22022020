import {
    combineReducers
} from "redux";
import messageReducer from "./message_reducer.js";
import chatReducer from "./chat_reducer.js";

import {
    connectRouter
} from 'connected-react-router';

export default history => combineReducers({
    router: connectRouter(history),
    chatReducer,
    messageReducer
})