import types from "../actions/Types";

const INITIAL_STATE = {
  users: [],
  loading: false,
  error: null,
  filterString: "",
  selectedUserId: "",
  nextId: 0,
};

const mainReducer = (state = INITIAL_STATE, action) => {
  let users;
  switch (action.type) {
    case types.FETCH_USERS:
    case types.ADD_USER:
    case types.UPDATE_USER:
    case types.DELETE_USER:
      return { ...state, loading: true };

    case types.FETCH_USERS_SUCCESS:
      const nextId = Math.max(...action.payload.map((user) => user.id)) + 1;
      return { ...state, loading: false, users: action.payload, nextId };

    case types.ADD_USER_SUCCESS:
      users = [...state.users, action.payload];
      return { ...state, users, loading: false, nextId: state.nextId + 1 };

    case types.UPDATE_USER_SUCCESS:
      users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
      return { ...state, loading: false, users };

    case types.DELETE_USER_SUCCESS:
      users = state.users.filter((user) => user.id !== action.payload);
      return { ...state, loading: false, users };

    case types.ADD_USER_FAILURE:
    case types.FETCH_USERS_FAILURE:
    case types.UPDATE_USER_FAILURE:
    case types.DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.SELECT_USER:
      return { ...state, selectedUserId: action.payload };
    default:
      return state;
  }
};
export default mainReducer;
