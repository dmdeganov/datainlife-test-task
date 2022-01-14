import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const SidePanel = () => {
  let { sectionId } = useParams();
  if (!sectionId) sectionId = "218";

  const sections = useSelector((state) =>
    state.goods.products.map((section) => {
      let name = section.rname;
      if (!name) name = "Без названия";
      if (name.length > 50) {
        name = name?.slice(0, 50) + "…";
      }
      return {
        name,
        id: section.rid,
      };
    })
  );

  const defineClassName = (section) => {
    let className = "";
    if (section.name.length < 33) className += "vert-center";
    if (section.id === sectionId) className += " active";
    return className;
  };

  return (
    <Wrapper>
      <ul>
        {sections.map((section) => (
          <Link key={section.id} to={`/${section.id}`}>
            <li className={defineClassName(section)}>{section.name}</li>
          </Link>
        ))}
      </ul>
    </Wrapper>
  );
};

export default SidePanel;

const Wrapper = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: calc(100vh - 5.1rem);
  width: max(300px);
  background-color: #2b2d3e;
  color: whitesmoke;
  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    list-style: none;
    align-items: flex-start;
    margin-top: 4px;
    a {
      color: whitesmoke;
      text-decoration: none;
      width: 100%;
      li {
        min-height: 2.3rem;
        font-size: 1rem;
        text-align: left;
        padding-left: 1rem;
        padding-right: 0.5rem;
        border-bottom: 1px solid #293c55;
        cursor: pointer;

        &:nth-child(2n + 1) {
          background-color: #2c2e41;
        }
        &.active {
          color: #afa;
        }
        &:hover {
          background-color: #223144;
        }
        &.vert-center {
          line-height: 2.3rem;
          vertical-align: middle;
        }
      }
    }
  }
`;
