import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, removeTodo, undoTodo, redoTodo } from '../actions/todo.actions';

import UndoRedoButtons from './UndoRedoButtons';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';

class App extends Component {

  onUndoClicked() {
    this.props.undoTodo();
  }

  onRedoClicked() {
    this.props.redoTodo();
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header todo-header">
            <div>
              React-Redux Todo App with Undo&Redo Feature
            </div>
            <div>
              <UndoRedoButtons
                onUndoClicked={this.onUndoClicked.bind(this)}
                onRedoClicked={this.onRedoClicked.bind(this)}
                isRedoDisabled={this.props.isRedoDisabled} isUndoDisabled={this.props.isUndoDisabled} />
            </div>
          </div>
          <div className="card-body">


            <TodoForm onAdd={this.props.addTodo} />
            <TodoItems onRemoveItem={this.props.removeTodo} items={this.props.items} />
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUndoDisabled: state.todo.past.length === 0,
    isRedoDisabled: state.todo.future.length === 0,
    items: state.todo.current
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (item) => dispatch(addTodo(item)),
    removeTodo: (item) => dispatch(removeTodo(item)),
    undoTodo: () => dispatch(undoTodo()),
    redoTodo: () => dispatch(redoTodo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

export { App } //for test
