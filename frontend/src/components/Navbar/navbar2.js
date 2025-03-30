import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { Nav, NavbarContainer, NavLogo } from "./NavbarElements";

const Navbar2 = () => {
  const toggleHome = () => {
    scroll.scrollToTop()
  }
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo onClick={toggleHome} to="/">
            Real Estate Property Management System
          </NavLogo>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar2;
