import React, { Component } from "react";
import "./css/Todo.css";
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.task.completed,
      id: this.props.task.id,
      title: this.props.task.title,
    };
  }
  markCompleted = () => {
    this.setState({ completed: true });
  };
  render() {
    let completedButton = "";
    if (!this.state.completed)
      completedButton = (
        <div>
          <input
            type="button"
            value="Mark Completed"
            onClick={this.markCompleted}
            className="btn btn-warning"
          />
        </div>
      );
    return (
      <div className="todo" key={this.state.id}>
        <div>
          <div>
            <span className="todoTitles">Title : </span>
            {this.state.title}
          </div>
          <div>
            <span className="todoTitles">Completed :</span>{" "}
            {this.state.completed.toString()}
          </div>
        </div>
        {completedButton}
      </div>
    );
  }
}

export default Todo;
