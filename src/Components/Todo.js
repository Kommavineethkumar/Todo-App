import React, { Component } from "react";
import "../css/todo.css";
import wrong from "../wrong.jpg";
import right from "../right.jpg";

class Todo extends Component {
  // Calling parent component method to delete a Todo
  deleteTodo = () => {
    this.props.deleteATodo(this.props.todo);
  };

  // Calling parent component method to convey the completeness of task
  completedTodo = () => {
    this.props.completedTodo(this.props.todo);
  };

  render() {
    // Renderering for a single todo
    const { todo } = this.props;
    return (
      <div>
        <div className="todo-item">
          <div id="todo-header">
            <p>{todo.name}</p>
          </div>
          {/*Image button for completition of task*/}
          <img
            id="right"
            src={right}
            alt="right"
            onClick={this.completedTodo}
          ></img>
          {/*Image button for deletion of task*/}
          <img
            id="wrong"
            src={wrong}
            alt="wrong"
            onClick={this.deleteTodo}
          ></img>
          <div id="todo-time">
            <p>{todo.time}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
