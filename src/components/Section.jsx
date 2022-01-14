import React from "react";
import Product from "./Product";

const Section = ({ rname, goods }) => {
  return (
    <>
      <tr>
        <td colSpan={5}>
          <h1>{rname}</h1>
        </td>
      </tr>
      {goods.map((good) => {
        return (
          <Product
            key={+good.gid}
            gid={+good.gid}
            gname={good.gname}
            gprice={+good.gprice}
          />
        );
      })}
    </>
  );
};

export default Section;
