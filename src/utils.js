import axios from "axios";
const usersUrl = "https://jsonplaceholder.typicode.com/users";
const tasksUrl = "https://jsonplaceholder.typicode.com/todos";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const getUsers = () => {
  return axios.get(usersUrl);
};

const getUserTasks = async (id) => {
  const resp = await axios.get(tasksUrl);

  const todos = resp.data;
  const lastId = Math.max(...todos.map((todo) => todo.id));
  const userTodos = todos.filter((x) => x.userId == id);
  // let titles = userTodos.map(todo => todo.title);
  // console.log(lastId);
  return { userTasks: userTodos, lastId: lastId };
};

const getUserPosts = async (id) => {
  const resp = await axios.get(postsUrl);

  const posts = resp.data;
  const lastId = Math.max(...posts.map((post) => post.id));
  const userPosts = posts.filter((x) => x.userId == id);

  return { userPosts: userPosts, lastId: lastId };
};

const updateUser = async (user) => {
  try {
    const resp = await axios.put(usersUrl + "/" + user.id, user);
    console.log(resp);
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  await axios.delete(usersUrl + "/" + id);
};

const addUser = (newUser) => {
  return axios.post(usersUrl, newUser);
};

const addPost = async (newPost) => {
  try {
    const resp = await axios.post(postsUrl, newPost);
    console.log(resp);
  } catch (error) {
    console.error(error);
  }
};

const addTodo = async (newTodo) => {
  try {
    const resp = await axios.post(tasksUrl, newTodo);
    console.log(resp);
  } catch (error) {
    console.error(error);
  }
};

export default {
  getUsers,
  getUserTasks,
  updateUser,
  deleteUser,
  getUserPosts,
  addUser,
  addPost,
  addTodo,
};
