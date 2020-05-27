import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserActions from "../actions/UserActions";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: { street: "", suite: "", city: "", zipcode: "" },
    };
  }
  componentDidUpdate(prevProps) {
    const { loading, error } = this.props;
    if (!loading && prevProps.loading && !error) {
      this.setState({ name: "", email: "" });
    }
  }

  addUser = () => {
    const { nextId, addUser } = this.props;
    const { name, email, address } = this.state;

    addUser(nextId, name, email, address);
  };

  setName = (e) => {
    this.setState({ name: e.target.value });
  };
  setEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  render() {
    const { loading } = this.props;
    const { name, email } = this.state;
    return (
      <div>
        <div className="addTitle titles">Add New User</div>
        <div className="addContainer">
          <div>
            <label>Name : </label>
            <input value={name} type="text" onChange={this.setName} />
          </div>
          <div>
            <label>Email : </label>
            <input value={email} type="email" onChange={this.setEmail} />
          </div>
          <div>
            <Link to="/">
              <input
                type="button"
                value="Cancel"
                className="btn btn-warning"
                disabled={loading}
              />
            </Link>
            <input
              type="button"
              value="Add"
              onClick={this.addUser}
              disabled={loading || !name || !email}
              className="btn btn-warning"
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (id, name, email, address) =>
      dispatch(UserActions.addUser(id, name, email, address)),
  };
};

const mapStateToProps = (state) => {
  const { nextId, loading, error } = state;
  return {
    nextId,
    loading,
    error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
