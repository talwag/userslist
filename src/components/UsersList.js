import React, { Component } from "react";
import User from "./User";
import { connect } from "react-redux";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { filterUsers: [] };
  }

  componentDidUpdate(prevProps) {
    const { users, loading, filterString } = this.props;

    if (filterString !== prevProps.filterString) {
      const filterUsers = users.filter((user) =>
        `${user.name} ${user.email}`.toLowerCase().includes(filterString)
      );
      this.setState({ filterUsers });
    }
    if (users.length !== prevProps.users.length) {
      this.setState({ users, filterUsers: users });
    }
    if (!loading && prevProps.loading) {
      this.setState({ filterUsers: users });
    }
  }

  render() {
    const { filterUsers } = this.state;
    return (
      <div>
        <div>
          {filterUsers.map((user) => (
            <User key={`user-${user.id}`} userData={user} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { users, loading } = state;
  return {
    users,
    loading,
  };
};

export default connect(mapStateToProps)(UserList);
