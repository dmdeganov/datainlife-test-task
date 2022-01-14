import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsReducer from "../slices/productSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/productsSaga";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  goods: productsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});
sagaMiddleware.run(rootSaga);
