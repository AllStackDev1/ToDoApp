import { ADD_TODO_ITEM, GET_TODO_ITEM, EDIT_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes';

export const addTodoItem = item => ({
  type: ADD_TODO_ITEM,
  payload: item
});

export const getTodoList = list => ({
  type: GET_TODO_ITEM,
  payload: list
});

export const editTodoItem = data => ({
  type: EDIT_TODO_ITEM,
  payload: data
});

export const deleteTodoItem = id => ({
  type: DELETE_TODO_ITEM,
  payload: id
});
