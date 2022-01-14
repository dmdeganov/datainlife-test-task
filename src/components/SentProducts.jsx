import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { backToCatalog } from "../slices/productSlice";

const SentProducts = ({ sentProducts }) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <br />
      {sentProducts.map((product) => (
        <h3
          key={product.id}
        >{`Товар с ID: ${product.id}, Количество: ${product.amount}`}</h3>
      ))}
      <br />
      <button
        className='btn'
        style={{ border: "1px solid black" }}
        onClick={() => dispatch(backToCatalog())}
      >
        Вернуться в каталог
      </button>
    </Wrapper>
  );
};

export default SentProducts;

const Wrapper = styled.div`
  margin-left: 300px;
`;
