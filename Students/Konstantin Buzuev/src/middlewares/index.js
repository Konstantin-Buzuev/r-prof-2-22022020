import {
    apiMiddleware
} from 'redux-api-middleware';
import message from './message.js';

export default [
    apiMiddleware,
    message
];