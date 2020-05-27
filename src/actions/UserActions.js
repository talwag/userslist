import types from "./Types";
import utils from "../utils";

const fetchUsers = () => {
  return (dispatch) => {
    utils
      .getUsers()
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error));
      });
    return dispatch({
      type: types.FETCH_USERS,
      payload: null,
    });
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: types.FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: types.FETCH_USERS_FAILURE,
    payload: error,
  };
};

const addUser = (id, name, email, address) => {
  const user = { id, name, email, address };
  return (dispatch) => {
    utils
      .addUser(user)
      .then(() => {
        dispatch(addUserSuccess(user));
      })
      .catch((error) => {
        dispatch(addUserFailure(error));
      });
    // setTimeout(() => dispatch(addUserSuccess(user)), 100);
    return dispatch({
      type: types.ADD_USER,
      payload: null,
    });
  };
};

const addUserSuccess = (user) => {
  return {
    type: types.ADD_USER_SUCCESS,
    payload: user,
  };
};

const addUserFailure = (error) => {
  return {
    type: types.ADD_USER_FAILURE,
    payload: error,
  };
};

const updateUser = (userData) => {
  return (dispatch) => {
    utils
      .updateUser(userData)
      .then(() => {
        dispatch(updateUserSuccess(userData));
      })
      .catch((error) => {
        dispatch(updateUserFailure(error));
      });
    return dispatch({
      type: types.UPDATE_USER,
      payload: null,
    });
  };
};

const updateUserSuccess = (updates) => {
  return {
    type: types.UPDATE_USER_SUCCESS,
    payload: updates,
  };
};

const updateUserFailure = (error) => {
  return {
    type: types.UPDATE_USER_FAILURE,
    payload: error,
  };
};

const deleteUser = (userId) => {
  return (dispatch) => {
    utils
      .deleteUser(userId)
      .then(() => {
        dispatch(deleteUserSuccess(userId));
      })
      .catch((error) => {
        dispatch(deleteUserFailure(error));
      });
    return {
      type: types.DELETE_USER,
      payload: null,
    };
  };
};

const deleteUserSuccess = (userId) => {
  return {
    type: types.DELETE_USER_SUCCESS,
    payload: userId,
  };
};

const deleteUserFailure = (error) => {
  return {
    type: types.DELETE_USER_FAILURE,
    payload: error,
  };
};

const selectUser = (userId) => {
  return {
    type: types.SELECT_USER,
    payload: userId,
  };
};

export default { fetchUsers, addUser, updateUser, deleteUser, selectUser };
