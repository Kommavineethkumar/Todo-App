import React, { Component } from "react";
import Todo from "./Todo";
import "../css/displaytodos.css";
import plus from "../plus.jpg";
import minus from "../minus.jpg";

class DisplayTodos extends Component {
  constructor(props) {
    super(props);
    // Getting todos array from localstorage
    let todos = JSON.parse(localStorage.getItem("todos"));
    this.state = {
      // If there are prevoius todos, assign them to todos in the state
      todos: todos ? todos : [],
      // To show add todo modal
      showAddTodo: false,
      // To show delete todo modal
      showDeleteTodos: false,
      // To show task completed modal
      showCompleted: false,
    };
  }

  // Method to add todo
  addTodo = () => {
    let head = document.querySelector("#enter-todo-head");
    let time = document.querySelector("#enter-todo-time");
    let val1 = head.value;
    let val2 = time.value;
    if (!val1 || !val2) {
      time.value = "";
      document.querySelector("#infoText").innerHTML = "";
      document.querySelector("#errorText").innerHTML = "Invalid Input!";
      return;
    }
    let new_todo = [
      {
        name: head.value,
        time: time.value + " mins",
      },
    ];
    let flag = 0;
    for (let i = 0; i < this.state.todos.length; ++i) {
      let t = this.state.todos[i];
      if (t.name === head.value) {
        flag = 1;
        break;
      }
    }
    if (flag) {
      document.querySelector("#errorText").innerHTML = "";
      document.querySelector("#infoText").innerHTML = "Task already added!";
      return;
    }
    this.setState(
      {
        todos: [...new_todo, ...this.state.todos],
        showAddTodo: false,
      },
      () => {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
      }
    );
    head.value = "";
    time.value = "";
  };

  // Method to delete all todos
  deleteAllTodos = () => {
    this.setState({ todos: [], showDeleteTodos: false });
    localStorage.removeItem("todos");
  };

  // Method to show add todo modal
  showAddTodo = () => {
    this.setState({ showDeleteTodos: false });
    this.setState({ showAddTodo: true });
  };

  // Method to show delete todos modal
  showDeleteTodos = () => {
    this.setState({ showAddTodo: false });
    this.setState({ showDeleteTodos: true });
  };

  // Method to delete todo
  deleteATodo = (todo) => {
    let todos = this.state.todos;
    todos = todos.filter((item) => item.name !== todo.name);
    this.setState({ todos: todos }, () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  };

  // Method to show task completed modal
  completedTodo = (todo) => {
    let todos = this.state.todos;
    todos = todos.filter((item) => item.name !== todo.name);
    this.setState({ todos: todos, showCompleted: true }, () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  };

  render() {
    return (
      <div className="todo-bar">
        <p
          id="app-heading"
          style={{
            textAlign: "center",
          }}
        >
          Todo App
        </p>
        <div className="options">
          {/*Button Image to add todo*/}
          <img
            className="add-todo"
            src={plus}
            alt="plus"
            onClick={this.showAddTodo}
          ></img>
          <span style={{ paddingRight: "50px" }}></span>
          {/*Button Image to delete all todos*/}
          <img
            className="add-todo"
            src={minus}
            alt="minus"
            onClick={this.showDeleteTodos}
          ></img>
        </div>
        <React.Fragment>
          {" "}
          <div className="todos-holder">
            {/*Rendering all todos*/}
            {this.state.todos.map((todo) => (
              <span key={todo.name}>
                <Todo
                  todo={todo}
                  key={todo.name}
                  deleteATodo={this.deleteATodo}
                  completedTodo={this.completedTodo}
                />
              </span>
            ))}
          </div>
        </React.Fragment>
        <div>
          {/*Add Todo Modal*/}
          {this.state.showAddTodo ? (
            <div className="todo-entry">
              <p id="task-name">Enter Task Name:</p>
              <input
                id="enter-todo-head"
                type="text"
                autoComplete="false"
                placeholder="Reading, Singing, Assignment..."
              ></input>
              <p id="task-time">Enter Task Time:</p>
              <input
                autoComplete="false"
                id="enter-todo-time"
                type="text"
                onKeyPress={(e) => (e.code === "Enter" ? this.addTodo() : null)}
                placeholder="Enter time in number of minutes"
              ></input>
              <p id="errorText"></p>{" "}
              {/*To show any error message in the modal*/}
              <p id="infoText"></p> {/*To show any information in the modal*/}
              <button
                className="add-todo-button"
                onClick={() => this.addTodo()}
              >
                Add Todo
              </button>
              <button
                className="cancel-todo-button"
                onClick={() => this.setState({ showAddTodo: false })}
              >
                Cancel
              </button>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div>
          {/*Delete Todos Modal*/}
          {this.state.showDeleteTodos ? (
            <div className="todo-entry">
              <p id="delete-name">Do you want to delete all todos?</p>
              <button className="add-todo-button" onClick={this.deleteAllTodos}>
                Delete All
              </button>
              <button
                className="cancel-todo-button"
                onClick={() => this.setState({ showDeleteTodos: false })}
              >
                Cancel
              </button>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div>
          {/*Task completed Modal*/}
          {this.state.showCompleted ? (
            <div className="todo-entry">
              <p id="delete-name">Task completed! Congratulations!</p>
              <button
                className="done-todo-button"
                onClick={() => this.setState({ showCompleted: false })}
              >
                Done
              </button>
            </div>
          ) : (
            <span></span>
          )}

          {/*<p className="counter">count = {this.state.count}</p>*/}
        </div>
      </div>
    );
  }
}

export default DisplayTodos;
