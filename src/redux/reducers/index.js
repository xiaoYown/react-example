import { GET_LIST } from '../actions';

export const testData = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_LIST:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
