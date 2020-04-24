import { apiMiddleware } from 'redux-api-middleware';
import msgMiddleware from './msgMiddleware';

export default [
  apiMiddleware,
  msgMiddleware
];