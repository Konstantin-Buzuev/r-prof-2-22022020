import { RSAA, getJSON } from "redux-api-middleware";

export const START_PROFILE_LOADING = '@@profile/START_PROFILE_LOADING';
export const SUCCESS_PROFILE_LOADING = '@@profile/SUCCESS_PROFILE_LOADING';
export const ERROR_PROFILE_LOADING = '@@profile/ERROR_PROFILE_LOADING';

export const SET_USER_DATA = '@@profile/SET_USER_DATA';

export const setUserInfo = (userName, userEmail, userAge) => ({
  type: SET_USER_DATA,
  userName,
  userEmail,
  userAge,
});

export const loadProfile = () => ({
  [RSAA]: {
    endpoint: '/static_api/profile.json',
    method: 'GET',
    types: [
      START_PROFILE_LOADING,
      {
        type: SUCCESS_PROFILE_LOADING,
        payload: (action, state, res) => {
          return getJSON(res).then(json => json);
        },
      },
      ERROR_PROFILE_LOADING,
    ],
  },
});
