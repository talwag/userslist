import React, { Component } from "react";
import { connect } from "react-redux";
import utils from "../utils";
import Todo from "./Todo";
import Post from "./Post";
import "./css/TodosAndPosts.css";

class TodosAndPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTasks: [],
      userPosts: [],
      TasksLastId: -1,
      newTaskTitle: "",
      postsLastId: -1,
      newPostTitle: "",
      newPostBody: "",
      allTasksCompleted: true,
      showExtraDetails: false,
      showTasksAndPosts: false,
      userBgColor: false,
      addTask: false,
      addPost: false,
    };
  }

  toggleTasksAndPosts = () => {
    this.setState({
      showTasksAndPosts: !this.state.showTasksAndPosts,
      userBgColor: !this.state.userBgColor,
    });
  };
  addTask = () => {
    const newTaskId = this.state.TasksLastId + 1;
    const newTask = {
      completed: false,
      userId: this.props.selectedUserId,
      title: this.state.newTaskTitle,
      id: newTaskId,
    };
    utils.addTodo(newTask);
    const tasks = [...this.state.userTasks, newTask];
    this.setState({
      userTasks: tasks,
      TasksLastId: newTaskId,
    });
  };

  addPost = () => {
    const newPostId = this.state.postsLastId + 1;

    const newPost = {
      userId: this.props.selectedUserId,
      title: this.state.newPostTitle,
      body: this.state.newPostBody,
      id: newPostId,
    };
    utils.addPost(newPost);
    const posts = [...this.state.userPosts, newPost];
    this.setState({
      userPosts: posts,
      postsLastId: newPostId,
    });
  };

  toggleAddTaskSection = () => {
    this.setState({ addTask: !this.state.addTask });
  };
  toggleAddPostSection = () => {
    this.setState({ addPost: !this.state.addPost });
  };
  setTaskTitle = (e) => {
    this.setState({ newTaskTitle: e.target.value });
  };
  setPostTitle = (e) => {
    this.setState({ newPostTitle: e.target.value });
  };
  setPostBody = (e) => {
    this.setState({ newPostBody: e.target.value });
  };
  async componentDidMount() {
    let userTasks;
    let userPosts;
    const resp = await utils.getUserTasks(this.props.selectedUserId);
    userTasks = resp.userTasks;
    const lastId = resp.lastId;
    this.setState({ TasksLastId: lastId, userTasks: userTasks });
    if (userTasks.some((task) => task.completed == false)) {
      this.setState({ allTasksCompleted: false });
    }
    const respPosts = await utils.getUserPosts(this.props.selectedUserId);
    userPosts = respPosts.userPosts;

    const lastIdPosts = respPosts.lastId;
    this.setState({ postsLastId: lastIdPosts, userPosts: userPosts });
  }
  async componentDidUpdate(prevProps) {
    let userTasks;
    let userPosts;
    if (this.props.selectedUserId != prevProps.selectedUserId) {
      const resp = await utils.getUserTasks(this.props.selectedUserId);
      userTasks = resp.userTasks;
      this.setState({ userTasks: userTasks });
      if (userTasks.some((task) => task.completed == false)) {
        this.setState({ allTasksCompleted: false });
      }
      const postResp = await utils.getUserPosts(this.props.selectedUserId);
      userPosts = postResp.userPosts;
      this.setState({ userPosts: userPosts });
    }
  }
  render() {
    let tasks;
    let posts;
    let addTask;
    let addPost;
    if (this.state.addTask) {
      addTask = (
        <div>
          <div className="titles">
            New Todo - User {this.props.selectedUserId}
          </div>
          <div className="addContainer">
            <div>
              <div>Title :</div>
              <input type="text" onChange={this.setTaskTitle} />
            </div>
            <div>
              <input
                type="button"
                value="Cancel"
                onClick={this.toggleAddTaskSection}
                className="btn btn-warning"
              />
              <input
                type="button"
                value="Add"
                onClick={this.addTask}
                className="btn btn-warning"
              />
            </div>
          </div>
        </div>
      );
    }

    if (this.props.selectedUserId && !this.state.addTask) {
      tasks = (
        <div>
          <div className="titlesContainer">
            <span className="titles">
              Todos - User {this.props.selectedUserId}
            </span>
            <input
              type="button"
              value="Add"
              onClick={this.toggleAddTaskSection}
              className="btn btn-warning"
            />
          </div>
          <div className="todosAndPostsWrapper">
            {this.state.userTasks.map((task) => {
              return <Todo task={task} key={task.id} />;
            })}
          </div>
        </div>
      );
    }

    if (this.state.addPost) {
      addPost = (
        <div>
          <div>
            <div className="titles">
              New Post - User {this.props.selectedUserId}
            </div>
            <div className="addContainer">
              <div>
                <div>Title :</div>
                <input type="text" onChange={this.setPostTitle} />
              </div>
              <div>
                <div>Body :</div>
                <input type="text" onChange={this.setPostBody} />
              </div>
              <div>
                <input
                  type="button"
                  value="Cancel"
                  onClick={this.toggleAddPostSection}
                  className="btn btn-warning"
                />
                <input
                  type="button"
                  value="Add"
                  onClick={this.addPost}
                  className="btn btn-warning"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.selectedUserId && !this.state.addPost) {
      posts = (
        <div className="postContainer">
          <div className="titlesContainer">
            <span className="titles">
              Posts - User {this.props.selectedUserId}
            </span>
            <input
              type="button"
              value="Add"
              onClick={this.toggleAddPostSection}
              className="btn btn-warning"
            />
          </div>
          <div className="todosAndPostsWrapper">
            {this.state.userPosts.map((post) => {
              return <Post post={post} key={post.id} />;
            })}
          </div>
        </div>
      );
    }
    return (
      <div className="todosAndPosts">
        <div> {tasks}</div>
        <div>{addTask}</div>
        <div>{posts}</div>
        <div>{addPost}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state,
    selectedUserId: state.selectedUserId,
  };
};
export default connect(mapStateToProps)(TodosAndPosts);
