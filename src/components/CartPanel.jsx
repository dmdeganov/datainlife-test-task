import React from "react";
import styled from "styled-components";
import { BsFillCartCheckFill } from "react-icons/bs";
import { formatPrice } from "../helpers/formatPrice";
import { useSelector, useDispatch } from "react-redux";
import { sendCartInit } from "../slices/productSlice";
const CartPanel = () => {
  const dispatch = useDispatch();
  const { totalPrice, totalQuantity, cart } = useSelector(
    (state) => state.goods
  );
  const sendHandler = () => {
    if (cart.length === 0) return;
    dispatch({ type: sendCartInit().type, payload: cart });
  };
  return (
    <Wrapper>
      <div className='label'>Количество товаров</div>
      <div className='label'>Общая сумма</div>
      <div className='to-cart'>
        <BsFillCartCheckFill />
        <button onClick={sendHandler}>Добавить в корзину</button>
      </div>
      <div className='total-amoun'>{totalQuantity}</div>
      <div className='total-price'>{formatPrice(totalPrice)}</div>
    </Wrapper>
  );
};

export default CartPanel;
const Wrapper = styled.div`
  display: grid;
  /* grid-template-rows: max-content 2rem; */
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  position: fixed;
  padding-bottom: 0.5rem;
  margin-left: 300px;
  width: calc(100vw - 300px);
  height: 5.5rem;
  background-color: #2b2d3e;
  color: whitesmoke;
  font-size: 1.3rem;
  z-index: 1000;
  bottom: 0;
  .to-cart {
    grid-row: 1/3;
    grid-column: 3/4;
    align-self: stretch;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    svg {
      font-size: 1.5rem;
    }
  }
`;
