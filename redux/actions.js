import {
  ADD_TODO_ITEM,
  MARK_SELECTED_TODO_ITEMS_DONE,
  UNMARK_SELECTED_TODO_ITEMS_DONE,
  GET_TODO_LIST,
  EDIT_TODO_ITEM,
  DELETE_SELECTED_TODO_ITEMS,
  CLEAR_ALL
} from './actionTypes';

export const addTodoItem = newItem => ({
  type: ADD_TODO_ITEM,
  payload: newItem
});

export const getTodoList = () => ({
  type: GET_TODO_LIST
});

export const markSeletedTodoItemsDone = indexs => ({
  type: MARK_SELECTED_TODO_ITEMS_DONE,
  payload: indexs
});

export const unmarkSeletedTodoItemsDone = indexs => ({
  type: UNMARK_SELECTED_TODO_ITEMS_DONE,
  payload: indexs
});

export const editTodoItem = (index, item) => ({
  type: EDIT_TODO_ITEM,
  payload: { index, item }
});

export const deleteSelectedTodoItems = indexs => ({
  type: DELETE_SELECTED_TODO_ITEMS,
  payload: indexs.sort()
});

export const clearAll = () => ({
  type: CLEAR_ALL
});
