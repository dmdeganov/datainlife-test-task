import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchProductsThunk, fetchProductsStart } from "./slices/productSlice";

// store.dispatch(fetchProductsThunk());
store.dispatch(fetchProductsStart());
// store.dispatch(fet)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
