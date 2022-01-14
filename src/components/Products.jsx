import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Section from "./Section";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import SentProducts from "./SentProducts";

const Products = () => {
  const { products, status, sentProducts } = useSelector(
    (state) => state.goods
  );
  if (status !== "idle") {
    return (
      <>
        <h1>{status + "..."}</h1>
        {status === "successfully_sent" ? (
          <SentProducts sentProducts={sentProducts} />
        ) : null}
      </>
    );
  }
  //   console.log(products);

  return (
    <StyledTable>
      <tbody>
        {products.map((section) => {
          return (
            <Section
              key={section.rid || uuidv4()}
              rname={section.rname}
              goods={section.goods}
            />
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default Products;
const StyledTable = styled.table`
  width: max(80vw, 600px);
  margin: 2rem auto 4rem;
  border-collapse: collapse;

  &,
  th,
  td {
    height: 30px;
    border: 1px solid black;
  }
  h1 {
    font-size: 1.5rem;
    padding: 0.3rem 0;
  }
  td.input-amount {
    /* border: none; */
    width: 5rem;
    input {
      height: 30px;
      border: none;
      width: 5rem;
      text-align: center;
      &.first {
        border-top: 1px solid black;
      }
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      opacity: 1;
      margin-right: 4px;
    }
  }
  td.total-price {
    width: 8rem;
  }
`;

/*
 products = [section1:{goods: []}, section2:{goods: []}, ...]
*/
