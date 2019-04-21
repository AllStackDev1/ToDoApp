import React, { Component, Fragment } from 'react';
import withRedux from 'next-redux-wrapper';
import Link from 'next/link';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge,
  Input,
  CustomInput,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback,
  Form,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import DatePicker from 'react-datepicker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faSyncAlt);
import { connect } from 'react-redux';
import { getTodoList, addTodoItem } from '../redux/actions';

const data = {
  id: 1,
  title: 'Book train tickets',
  time: '07:00 AM',
  date: '06/06/2019',
  color: 'primary',
  status: 'COMPLETE',
  details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
};

import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../static/css/styles.css';

class TodoApplication extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      modalOpen: false,
      title: '',
      detail: '',
      time: null,
      date: new Date(),
      status: false
    };
  }

  static async getInitialProps({ Component, ctx }) {
    // we can dispatch from here too
    ctx.store.dispatch({ type: 'FOO', payload: 'foo' });

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  componentDidMount() {
    document.title = 'TODO APP';
  }

  addNewItem() {
    const newItem = {
      title: this.state.title,
      detail: this.state.detail,
      time: this.state.time,
      date: this.state.date,
      status: this.state.status
    };
    this.props.addTodoItem(newItem);
    this.toggleModal();
    this.setState({
      title: '',
      detail: '',
      time: '',
      date: '',
      status: false
    });
  }

  handleCheckChange(event, id) {
    if (this.state.lastChecked == null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = Object.assign([], this.props.todoApp.selectedItems);
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.props.selectedTodoItemsChange(selectedItems);

    if (event.shiftKey) {
      var items = this.props.todoApp.todoItems;
      var start = this.getIndex(id, items, 'id');
      var end = this.getIndex(this.state.lastChecked, items, 'id');
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.props.selectedTodoItemsChange(selectedItems);
    }
    return;
  }

  handleChangeSelectAll() {
    if (this.props.todoApp.loading) {
      if (this.props.todoApp.selectedItems.length >= this.props.todoApp.todoItems.length) {
        this.props.selectedTodoItemsChange([]);
      } else {
        this.props.selectedTodoItemsChange(this.props.todoApp.todoItems.map(x => x.id));
      }
    }
  }

  render() {
    const { loading } = this.props;
    return (
      <main className="container">
        <div className="mb-2 d-flex justify-content-between">
          <h1>To-do List</h1>
          <div className="float-sm-right">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={this.toggleModal}
            >
              ADD NEW
            </Button>{' '}
            <Modal
              isOpen={this.state.modalOpen}
              toggle={this.toggleModal}
              wrapClassName="modal-right"
              backdrop="static"
            >
              <ModalHeader toggle={this.toggleModal}>Add New Todo</ModalHeader>
              <ModalBody>
                <Form>
                  <Label className="mt-4">Title</Label>
                  <Input
                    type="text"
                    defaultValue={this.state.title}
                    onChange={event => {
                      this.setState({ title: event.target.value });
                    }}
                  />
                  <Label className="mt-4">Detail</Label>
                  <Input
                    id=""
                    type="textarea"
                    defaultValue={this.state.detail}
                    onChange={event => {
                      this.setState({ detail: event.target.value });
                    }}
                  />
                  <Row>
                    <Col md="6">
                      <Label className="mt-4">Time</Label>
                      <Input
                        type="time"
                        defaultValue={this.state.time}
                        onChange={event => {
                          this.setState({ time: event.target.value });
                        }}
                      />
                    </Col>
                    <Col md="6">
                      <Label className="mt-4">Date</Label>
                      <DatePicker
                        selected={this.state.date}
                        onChange={date => {
                          this.setState({ date });
                        }}
                      />
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" outline onClick={this.toggleModal}>
                  Cancel
                </Button>
                <Button color="primary" onClick={() => this.addNewItem()}>
                  Submit
                </Button>
              </ModalFooter>
            </Modal>
            <ButtonDropdown isOpen={this.state.dropdownSplitOpen} toggle={this.toggleSplit}>
              <div className="btn btn-primary pl-4 pr-0 check-button">
                <Label
                  for="checkAll"
                  className="custom-control custom-checkbox mb-0 d-inline-block"
                >
                  <Input
                    className="custom-control-input"
                    type="checkbox"
                    id="checkAll"
                    checked={loading ? selectedItems.length >= todoItems.length : false}
                    onClick={() => this.handleChangeSelectAll()}
                  />
                  <span
                    className={`custom-control-label ${
                      loading && selectedItems.length > 0 && selectedItems.length < todoItems.length
                        ? 'indeterminate'
                        : ''
                    }`}
                  />
                </Label>
              </div>
              <DropdownToggle caret color="primary" className="dropdown-toggle-split pl-2 pr-2" />
              <DropdownMenu right>
                <DropdownItem>Delete Selected</DropdownItem>
                <DropdownItem>Delete All</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
        <hr className="mb-5" />
        <Row className="todo-list-container">
          <Col md={12} className="todo-list-item">
            <Card className="card d-flex mb-3">
              <div className="d-flex flex-grow-1 min-width-zero">
                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                  <Link href="#">
                    <a
                      className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
                      id={`toggler1`}
                    >
                      {'COMPLETED' === 'COMPLETED' ? (
                        <FontAwesomeIcon icon="check-circle" />
                      ) : (
                        <FontAwesomeIcon icon="sync-alt" />
                      )}{' '}
                      <Badge color="primary" pill>
                        Book train tickets
                      </Badge>
                    </a>
                  </Link>
                  <div className="w-15 w-xs-100">
                    <Badge color="primary" pill>
                      Time: 07:00 AM
                    </Badge>{' '}
                    <Badge color="primary" pill>
                      Date: 22.08.2018
                    </Badge>
                  </div>
                </CardBody>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <CustomInput
                    className="itemCheck mb-0"
                    type="checkbox"
                    id={`check_1`}
                    checked={loading ? selectedItems.includes(1) : false}
                    onClick={event => this.handleCheckChange(event, 1)}
                    label=""
                  />
                </div>
              </div>
              <div className="card-body pt-1">
                <Card>
                  <CardBody className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </CardBody>
                </Card>
              </div>
            </Card>
          </Col>
        </Row>
      </main>
    );
  }
}

// export default withRouter(App);
const mapStateToProps = ({ todoApp }) => {
  return {
    todoApp
  };
};
export default connect(
  mapStateToProps,
  {
    getTodoList,
    addTodoItem
  }
)(TodoApplication);
