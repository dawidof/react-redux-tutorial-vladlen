import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import App from "./App";
import { rootReducer } from "./redux/rootReducer";
import { forbiddenWordsMiddleware } from "./redux/middleware";
import { sagaWatcher } from "./redux/sagas";

const saga = createSagaMiddleware();
const middleware = [thunk, logger, forbiddenWordsMiddleware, saga];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
const rootElement = document.getElementById("root");

saga.run(sagaWatcher);
const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

render(app, rootElement);
