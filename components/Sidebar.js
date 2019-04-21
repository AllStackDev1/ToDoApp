import React, { Component, Fragment } from 'react';
import withRedux from 'next-redux-wrapper';
import { connect } from 'react-redux';
import { getTodoList, addTodoItem } from '../redux/actions';

class TodoApplication extends Component {
  render() {
    return <h1>Hello</h1>;
  }
}

export default connect()(TodoApplication);
