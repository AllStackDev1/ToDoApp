import { createStore } from 'redux';
import {
  ADD_TODO_ITEM,
  MARK_SELECTED_TODO_ITEMS_DONE,
  UNMARK_SELECTED_TODO_ITEMS_DONE,
  GET_TODO_LIST,
  EDIT_TODO_ITEM,
  DELETE_SELECTED_TODO_ITEMS,
  CLEAR_ALL
} from './actionTypes';

const INIT_STATE = {
  todoItems: [],
  message: null
};

const todoApp = (state = INIT_STATE, action) => {
  let updatedlist = [];
  let prevItems = [];
  switch (action.type) {
    case ADD_TODO_ITEM:
      prevItems = JSON.parse(localStorage.getItem('todoItems'));
      if (prevItems && typeof prevItems == 'object') {
        updatedlist = [...prevItems];
        updatedlist.push(action.payload);
      } else {
        updatedlist.push(action.payload);
      }
      localStorage.setItem('todoItems', JSON.stringify(updatedlist));
      return { ...state, message: null, todoItems: updatedlist };
    case GET_TODO_LIST:
      prevItems = JSON.parse(localStorage.getItem('todoItems'));
      return { ...state, message: null, todoItems: prevItems };
    case MARK_SELECTED_TODO_ITEMS_DONE:
      prevItems = JSON.parse(localStorage.getItem('todoItems'));
      action.payload.some(t => {
        prevItems.some((e, i) => {
          if (t === i) {
            e.status = 'COMPLETED';
            e.color = 'success';
          }
        });
      });

      updatedlist = [...prevItems];
      localStorage.setItem('todoItems', JSON.stringify(updatedlist));
      return { ...state, message: null, todoItems: updatedlist };
    case UNMARK_SELECTED_TODO_ITEMS_DONE:
      prevItems = JSON.parse(localStorage.getItem('todoItems'));
      action.payload.some(t => {
        prevItems.some((e, i) => {
          if (t === i) {
            e.status = 'PENDING';
            e.color = 'secondary';
          }
        });
      });
      updatedlist = [...prevItems];
      localStorage.setItem('todoItems', JSON.stringify(updatedlist));
      return { ...state, message: null, todoItems: updatedlist };
    case EDIT_TODO_ITEM:
      prevItems = JSON.parse(localStorage.getItem('todoItems'));
      const { index, item } = action.payload;
      updatedlist = prevItems.splice(index, 1, item);
      localStorage.setItem('todoItems', JSON.stringify(updatedlist));
      return { ...state, message: null, todoItems: updatedlist };
    case DELETE_SELECTED_TODO_ITEMS:
      prevItems = JSON.parse(localStorage.getItem('todoItems'));
      let text = action.payload.length > 1 ? 'these' : 'this';
      if (action.payload.length > 0 && confirm(`Are you sure you want to remove ${text} item?`)) {
        while (action.payload.length) {
          prevItems.splice(action.payload.pop(), 1);
        }
        localStorage.setItem('todoItems', JSON.stringify(prevItems));
      } else {
        alert('No item selected');
      }
      return { ...state, message: null, todoItems: prevItems };
    case CLEAR_ALL:
      if (confirm('Are you sure you want to clear all items?')) {
        localStorage.removeItem('todoItems');
      }
      return { ...state, message: null, todoItems: [] };
    default:
      return { ...state };
  }
};

const makeStore = initialState => {
  return createStore(todoApp, initialState);
};

export default makeStore;
