import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import battleReducer from "./store/reducers/battle";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { CssBaseline } from "@material-ui/core";
// import reportWebVitals from './reportWebVitals';

const composeEnhancers = compose;

const rootReducer = combineReducers({
  battle: battleReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
