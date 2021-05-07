import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Specifier = styled.li`
  font-size: calc(10px + 0.2rem);

  margin-top: 2px;
  margin-bottom: 2px;

  & a {
    color: #363636;
    padding: 3px;
  }

  & a:hover {
    text-decoration: none;
    color: hsl(204, 86%, 53%) !important;
  }
`;

const List = ({ label, specifiers, field }) => {
  specifiers = specifiers ? specifiers.nodes : null;
  return (
    <>
      {specifiers && (
        <>
          <p className="menu-label">{label}</p>
          <ul>
            {specifiers.map((spec) => {
              return (
                <Specifier>
                  <Link to={`/glossary/${spec.slug}`}>{spec[field]}</Link>
                </Specifier>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default List;
