import React from "react";

import "./styles.scss";
import CustomLink from "../CustomLink";

const Hamburger = ({onClick, isOpen}) => (
  <div className={`navbar-hamburger${isOpen ? ' navbar-hamburger--open' : ''}`} onClick={onClick}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
)


export class NavbarTemplate extends React.Component {
  state = {
    isOpen: false
  }

  handleMenuToggle = () => {
    this.setState((state) => ({isOpen: !state.isOpen}))
  }

  render() {
    const { data, currentPage } = this.props;
    return (
      <nav className={`navbar${this.state.isOpen ? ' navbar--open' : ''}`}>
        <div className={`navbar-container${this.state.isOpen ? ' navbar-container--open'  : ''}`}>
          {data.menuItems.length > 0 && (
            <ul className={`navbar-menu${this.state.isOpen ? ' navbar-menu--open'  : ''}`}>
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
        <Hamburger onClick={this.handleMenuToggle} isOpen={this.state.isOpen}/>
      </nav>
    );
  }
}

const Navbar = props => {
  if (!props.data) {
    return null;
  }
  const data = props.data.edges[0].node.frontmatter;
  return <NavbarTemplate data={data} currentPage={props.currentPage} />;
};

export { Navbar };
