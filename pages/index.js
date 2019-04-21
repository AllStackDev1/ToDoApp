import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodoList, addTodoItem } from '../redux/actions';

class TodoApplication extends Component {
  static getInitialProps({ store }) {
    // store.dispatch(getTodoList());
    return {};
  }

  componentDidMount() {
    // this.props.getTodoList();
  }

  render() {
    console.log(this.props);
    return <h1>Hello</h1>;
  }
}
const mapStateToProps = todoApp => {
  const { loading, error } = todoApp;
  return { loading, error };
};
export default connect(
  mapStateToProps,
  {
    getTodoList,
    addTodoItem
  }
)(TodoApplication);
