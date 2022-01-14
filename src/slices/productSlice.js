import {
  createSlice,
  //   createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

const initialState = {
  status: "",
  products: [],
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
  sentProducts: [],
};
const calcTotals = (cart) => {
  const totalQuantity = cart.reduce(
    (acc, product) => (acc += product.amount),
    0
  );
  const totalPrice = cart.reduce((acc, product) => {
    return (acc += product.amount * product.price);
  }, 0);
  return {
    totalPrice,
    totalQuantity,
  };
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.status = "loading";
    },
    fetchProductsSuccess(state, action) {
      action.payload.map((section) => {
        if (!(section.rid && section.rname)) {
          section.rid = uuidv4();
          section.rname = "Без названия";
        }
        return section;
      });
      state.status = "idle";
      state.products = action.payload;
    },
    fetchProductsError(state) {
      state.status = "error";
    },
    addProduct(state, action) {
      const { id, amount, price } = action.payload;
      state.cart.push({ id, amount, price });
      const { totalQuantity, totalPrice } = calcTotals(state.cart);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },
    changeProductAmount(state, action) {
      const { id, amount } = action.payload;
      state.cart = state.cart.map((product) => {
        if (product.id === id) {
          product.amount = amount;
        }
        return product;
      });
      const { totalQuantity, totalPrice } = calcTotals(state.cart);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },
    deleteProduct(state, action) {
      const { id } = action.payload;
      state.cart = state.cart.filter((product) => product.id !== id);
      const { totalQuantity, totalPrice } = calcTotals(state.cart);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },
    backToCatalog(state) {
      state.status = "idle";
    },
    sendCartInit(state) {
      state.status = "sending";
    },
    sendCartSuccess(state, action) {
      state.status = "successfully_sent";
      state.sentProducts = Object.entries(action.payload).map((arrItem) => {
        return {
          id: arrItem[0],
          amount: arrItem[1],
        };
      });
      state.cart = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
    sendCartError(state) {
      state.status = "error";
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProductsThunk.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchProductsThunk.fulfilled, (state, action) => {
  //       action.payload.map((section) => {
  //         if (!(section.rid && section.rname)) {
  //           section.rid = uuidv4();
  //           section.rname = "Без названия";
  //         }
  //         return section;
  //       });
  //       state.status = "idle";
  //       state.products = action.payload;
  //     })
  //     .addCase(fetchProductsThunk.rejected, (state, action) => {
  //       state.status = "error";
  //     })
  //     .addCase(sendCart.pending, (state) => {
  //       state.status = "sending";
  //     })
  //     .addCase(sendCart.fulfilled, (state, action) => {
  //       console.log(action.payload);

  //       state.status = "successfully_sent";
  //       state.sentProducts = Object.entries(action.payload).map((arrItem) => {
  //         return {
  //           id: arrItem[0],
  //           amount: arrItem[1],
  //         };
  //       });
  //       state.cart = [];
  //       state.totalPrice = 0;
  //       state.totalQuantity = 0;
  //     })
  //     .addCase(sendCart.rejected, (state) => {
  //       state.status = "error";
  //     });
  // },
  //////
  //these extrareducers I used with redux thunk middleware before level 4 :)
});
export const fetchProducts = async () => {
  try {
    const response = await fetch(
      "https://datainlife.ru/junior_task/get_products.php"
    ).then((res) => res.json());
    return response;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};
// export const fetchProductsThunk = createAsyncThunk(
//   "products/sendCart",
//   fetchProducts
// );
export const sendFormData = async (cart) => {
  let formData = new FormData();
  cart.forEach((product) =>
    formData.append(`product[${product.id}]`, product.amount)
  );
  try {
    const response = await fetch(
      "https://datainlife.ru/junior_task/add_basket.php",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());
    return response.data.product;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};
// export const sendFormDataThunk = createAsyncThunk("products/fetch", sendFormData);

export const {
  addProduct,
  changeProductAmount,
  deleteProduct,
  backToCatalog,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsError,
  sendCartInit,
  sendCartSuccess,
  sendCartError,
} = productsSlice.actions;
export default productsSlice.reducer;
