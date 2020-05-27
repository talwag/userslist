import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import UserActions from "../actions/UserActions";
import TodosAndPosts from "./TodosAndPosts";
import UsersList from "./UsersList";
import AddUser from "./AddUser";
import "./css/Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { filterString: "" };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.props.fetchUsers();
  };

  setFilter = (e) => {
    this.setState({ filterString: e.target.value });
  };
  render() {
    return (
      <div className="app">
        <div className="usersContainer">
          <div className="searchContainer">
            <label htmlFor="search">Search :</label>{" "}
            <input type="text" id="search" onChange={this.setFilter} />
            <Link to="/AddUser">
              <input type="button" value="Add" className="btn btn-warning" />
            </Link>
          </div>
          <UsersList filterString={this.state.filterString} />
        </div>
        <Switch>
          <Route path="/TodosAndPosts" component={TodosAndPosts} />
          <Route path="/AddUser" component={AddUser} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(UserActions.fetchUsers()),
  };
};

export default connect(null, mapDispatchToProps)(Main);
