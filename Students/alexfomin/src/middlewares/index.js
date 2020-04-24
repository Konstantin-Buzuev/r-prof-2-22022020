import messageMiddleware from './messageMiddleware';
import { apiMiddleware } from 'redux-api-middleware';


export default [
  messageMiddleware,
   apiMiddleware
  // logger,
  // crashReporter
];