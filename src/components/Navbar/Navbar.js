import React from "react";

import "./styles.scss";
import CustomLink from "../CustomLink";

export const NavbarTemplate = ({ data, currentPage }) => (
  <nav className="navbar">
    <div className="container  navbar-container">
      {data.menuItems.length > 0 && (
        <ul className="navbar-menu">
          {data.menuItems.map((menuItem, index) => (
            <li key={menuItem.linkURL + index} className="navbar-menuItem">
              <CustomLink
                linkType={menuItem.linkType}
                linkURL={menuItem.linkURL}
                className={currentPage === menuItem.linkURL ? "navbar-menuLink  navbar-menuLink--active" : "navbar-menuLink"}
              >
                {menuItem.label}
              </CustomLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  </nav>
);

const Navbar = props => {
  if (!props.data) {
    return null;
  }
  const data = props.data.edges[0].node.frontmatter;
  return <NavbarTemplate data={data} currentPage={props.currentPage} />;
};

export { Navbar };
