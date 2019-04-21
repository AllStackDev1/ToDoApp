import React, { Component } from 'react';
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
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import {
  getTodoList,
  addTodoItem,
  editTodoItem,
  markSeletedTodoItemsDone,
  unmarkSeletedTodoItemsDone,
  deleteSelectedTodoItems,
  clearAll
} from '../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TodoApplication extends Component {
  constructor(props) {
    super(props);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      modalOpen: false,
      dropdownSplitOpen: false,
      title: '',
      detail: '',
      time: null,
      color: 'secondary',
      date: new Date(),
      selectedItems: [],
      lastChecked: null,
      status: 'PENDING'
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  toggleSplit() {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  componentDidMount() {
    document.title = 'TODO APP';
    this.props.getTodoList();
  }

  addNewItem() {
    const newItem = {
      title: this.state.title,
      detail: this.state.detail,
      time: this.state.time,
      color: this.state.color,
      date: this.state.date,
      status: this.state.status
    };
    this.props.addTodoItem(newItem);
    this.toggleModal();
    this.setState({
      title: '',
      detail: '',
      time: '',
      color: 'secondary',
      date: new Date(),
      status: 'PENDING'
    });
  }

  handleCheckChange(id) {
    if (this.state.lastChecked == null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = Object.assign([], this.state.selectedItems);
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({ selectedItems });
    return;
  }

  handleChangeSelectAll() {
    if (this.state.selectedItems.length >= this.props.todoItems.length) {
      this.setState({
        selectedItems: []
      });
    } else {
      this.setState({
        selectedItems: this.props.todoItems.map(x => x.id)
      });
    }
  }

  render() {
    const { modalOpen, title, detail, time, date, dropdownSplitOpen, selectedItems } = this.state;
    const { todoItems } = this.props;
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
              isOpen={modalOpen}
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
                    defaultValue={title}
                    onChange={event => {
                      this.setState({ title: event.target.value });
                    }}
                  />
                  <Label className="mt-4">Detail</Label>
                  <Input
                    id=""
                    type="textarea"
                    defaultValue={detail}
                    onChange={event => {
                      this.setState({ detail: event.target.value });
                    }}
                  />
                  <Row>
                    <Col md="6">
                      <Label className="mt-4">Time</Label>
                      <Input
                        type="time"
                        defaultValue={time}
                        onChange={event => {
                          this.setState({ time: event.target.value });
                        }}
                      />
                    </Col>
                    <Col md="6">
                      <Label className="mt-4">Date</Label>
                      <DatePicker
                        selected={date}
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
            <ButtonDropdown isOpen={dropdownSplitOpen} toggle={this.toggleSplit}>
              <div className="btn btn-primary pr-0 check-button">
                <Label
                  for="checkAll"
                  className="custom-control custom-checkbox mb-0 d-inline-block"
                >
                  <Input
                    className="custom-control-input"
                    type="checkbox"
                    id="checkAll"
                    checked={todoItems ? selectedItems.length >= todoItems.length : false}
                    onChange={() => this.handleChangeSelectAll()}
                  />
                  <span
                    className={`custom-control-label ${
                      selectedItems.length > 0 && selectedItems.length < todoItems.length
                        ? 'indeterminate'
                        : ''
                    }`}
                  />
                </Label>
              </div>
              <DropdownToggle caret color="primary" className="dropdown-toggle-split pl-2 pr-2" />
              <DropdownMenu right>
                <DropdownItem onClick={() => this.props.markSeletedTodoItemsDone(selectedItems)}>
                  Done
                </DropdownItem>
                <DropdownItem onClick={() => this.props.unmarkSeletedTodoItemsDone(selectedItems)}>
                  Undone
                </DropdownItem>
                <DropdownItem onClick={() => this.props.deleteSelectedTodoItems(selectedItems)}>
                  Delete
                </DropdownItem>
                <DropdownItem onClick={() => this.props.clearAll()}>Delete All</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
        <hr className="mb-5" />
        <Row className="todo-list-container">
          {todoItems &&
            todoItems.map((item, index) => {
              return (
                <Col md={12} className="todo-list-item" key={index}>
                  <Card className="card d-flex mb-3">
                    <div className="d-flex flex-grow-1 min-width-zero" style={{ paddingRight: 15 }}>
                      <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                        <span
                          className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
                          id={`toggler${index}`}
                        >
                          {item.status === 'COMPLETED' ? (
                            <FontAwesomeIcon icon="check-circle" className={`font-${item.color}`} />
                          ) : (
                            <FontAwesomeIcon icon="sync-alt" className={`font-${item.color}`} />
                          )}{' '}
                          <Badge color={item.color} pill>
                            {item.title}
                          </Badge>
                        </span>
                        <div className="w-15 w-xs-100">
                          <Badge color={item.color} pill>
                            Time: {item.time}
                          </Badge>{' '}
                          <Badge color={item.color} pill>
                            Date: {moment(item.date).format('DD.MM.YYYY')}
                          </Badge>
                        </div>
                      </CardBody>
                      <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_${index}`}
                          checked={selectedItems.includes(index) || false}
                          onChange={() => this.handleCheckChange(index)}
                          label=""
                        />
                      </div>
                    </div>
                    <div className="card-body pt-1">
                      <Card>
                        <CardBody className="mb-0">{item.detail}</CardBody>
                      </Card>
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </main>
    );
  }
}
const mapStateToProps = todoApp => {
  const { todoItems, message } = todoApp;
  return { todoItems, message };
};
export default connect(
  mapStateToProps,
  {
    getTodoList,
    addTodoItem,
    editTodoItem,
    markSeletedTodoItemsDone,
    unmarkSeletedTodoItemsDone,
    deleteSelectedTodoItems,
    clearAll
  }
)(TodoApplication);
