import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsError,
  fetchProducts,
  sendCartInit,
  sendCartSuccess,
  sendCartError,
  sendFormData,
} from "../slices/productSlice";

function* fetchProductsSaga() {
  try {
    const response = yield call(fetchProducts);
    yield put(fetchProductsSuccess(response));
  } catch {
    yield put(fetchProductsError());
  }
}

function* sendProductsSaga(action) {
  const cart = action.payload;
  try {
    const response = yield call(() => sendFormData(cart));
    console.log(response);

    yield put(sendCartSuccess(response));
  } catch {
    yield put(sendCartError());
  }
}

export function* sendWatcher(action) {
  yield takeLatest(sendCartInit().type, sendProductsSaga);
}

export function* productsFetchWatcher() {
  yield takeLatest(fetchProductsStart().type, fetchProductsSaga);
}

export default function* rootSaga() {
  yield all([productsFetchWatcher(), sendWatcher()]);
}
