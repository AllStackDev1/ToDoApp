import { createStore } from 'redux';
import { ADD_TODO_ITEM, GET_TODO_ITEM, EDIT_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes';

const INIT_STATE = {
  todoData: '',
  loading: false,
  message: null,
  error: null
};

const todoApp = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_TODO_ITEM:
      return { ...state, message: null, loading: true };
    case GET_TODO_ITEM:
      return { ...state, message: null, loading: true };
    case EDIT_TODO_ITEM:
      return { ...state, message: null, loading: true };
    case DELETE_TODO_ITEM:
      return { ...state, message: null, loading: true };
    default:
      return { ...state };
  }
};

const makeStore = initialState => {
  return createStore(todoApp, initialState);
};

export default makeStore;
