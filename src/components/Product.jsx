import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../helpers/formatPrice";
import {
  addProduct,
  changeProductAmount,
  deleteProduct,
} from "../slices/productSlice";

const Product = ({ gid: id, gname: name, gprice: price }) => {
  const inCart = useSelector(
    (state) =>
      state.goods.cart.find((product) => product.id === id)?.amount || 0
  );
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(inCart);

  const changeHandler = (event) => {
    const amount = +event.target.value;
    if (quantity === 0 && amount === 0) {
      return;
      // could happen when user tries to delete 0 in input
    }
    setQuantity(amount);
    if (quantity === 0 && amount > 0) {
      return dispatch(addProduct({ id, amount, price }));
    }

    if (amount === 0 && quantity > 0) {
      return dispatch(deleteProduct({ id, price }));
    }
    return dispatch(changeProductAmount({ id, amount, price }));
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td className='input-amount'>
        <input
          type='number'
          min='0'
          value={quantity.toString()}
          onChange={changeHandler}
        />
      </td>
      <td className='total-price'>{formatPrice(quantity * price)}</td>
    </tr>
  );
};

export default Product;
