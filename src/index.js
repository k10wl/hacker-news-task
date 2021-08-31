import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { StoreProvider } from './store/Store';
import { initialState, reducer } from './store/reducer';

ReactDom.render(
  <StoreProvider initialState={initialState} reducer={reducer}>
    <App />
  </StoreProvider>
  , document.getElementById("root"));
