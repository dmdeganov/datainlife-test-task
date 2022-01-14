import React from "react";
import { useSelector } from "react-redux";
import Section from "./Section";
import styled from "styled-components";
import SentProducts from "./SentProducts";
import { useParams } from "react-router-dom";

const Products = () => {
  let { sectionId } = useParams();
  if (!sectionId) sectionId = "218";

  const { products, status, sentProducts } = useSelector(
    (state) => state.goods
  );
  if (status !== "idle") {
    return (
      <>
        <h1 style={{ marginLeft: "300px" }}>{status + "..."}</h1>
        {status === "successfully_sent" ? (
          <SentProducts sentProducts={sentProducts} />
        ) : null}
      </>
    );
  }
  const section = products.find((section) => section.rid === sectionId);

  return (
    <StyledTable>
      <table>
        <tbody>
          <Section
            key={section.rid}
            rname={section.rname}
            goods={section.goods}
          />
        </tbody>
      </table>
    </StyledTable>
  );
};

export default Products;
const StyledTable = styled.div`
  & {
    margin: 2rem 0 4rem 300px;
  }
  table {
    width: min(800px, calc(100vw - 350px));
    padding: 0 5rem;
    margin: 0 auto 7rem;

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
  }
`;
