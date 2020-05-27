import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import mainReducer from "./appReducer";

export default createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
