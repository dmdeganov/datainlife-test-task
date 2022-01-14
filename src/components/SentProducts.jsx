import React from "react";
import { useDispatch } from "react-redux";
import { backToCatalog } from "../slices/productSlice";

const SentProducts = ({ sentProducts }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <br />
      {sentProducts.map((product) => (
        <h3>{`Товар с ID: ${product.id}, Количество: ${product.amount}`}</h3>
      ))}
      <br />
      <button
        className='btn'
        style={{ border: "1px solid black" }}
        onClick={() => dispatch(backToCatalog())}
      >
        Вернуться в каталог
      </button>
    </div>
  );
};

export default SentProducts;
