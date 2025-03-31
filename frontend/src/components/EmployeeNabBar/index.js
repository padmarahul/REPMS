import React, { useEffect, useState, useContext } from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavMenu,
  NavItem,
  NavLinks,
  MobileIcon,
  NavSearch
} from "./NavbarElements";
import { FaBars, FaSearch, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from '../../GlobalStateContext';

const Navbar = ({ toggle }) => {
  const [state] = useContext(GlobalStateContext);
  const [hover, setHover] = useState(false);

  const iconStyle = hover
    ? { color: 'whitesmoke', fontSize: '30px', cursor: 'pointer', transform: 'scale(1.2)' }
    : { color: 'whitesmoke', fontSize: '30px', cursor: 'pointer' };
  console.log(iconStyle)
  const [type, setType] = useState('')
  const navigate = useNavigate();
  const [scrollNav, setScrollNav] = useState(false)
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true)
    }
    else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop()
  }

  const handleProducts = (e) => {
    e.preventDefault()
    const id = state.userData.userId;
    navigate(`/manage-products/${id}`);
  }

  const handleSales = (e) => {
    e.preventDefault()
    const id = state.userData.userId;
    navigate(`/manage-onlinesales/${id}`);
  }

  const handleInventory = (e) => {
    e.preventDefault()
    const id = state.userData.userId;
    navigate(`/manage-inventory/${id}`);
  }

  const handleStockStatus = (e) => {
    e.preventDefault()
    const id = state.userData.userId;
    navigate(`/manage-stockstatus/${id}`);
  }
  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo onClick={toggleHome} to="/">
            <h1>
              REPMS
            </h1>
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            {
              type === 'store_owner' && (
                <NavItem>
                  <NavLinks onClick={event => handleProducts(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Manage Properties</NavLinks>
                </NavItem>
              )
            }
            <NavItem>
              <NavLinks onClick={event => handleInventory(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >View Insights</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={event => handleStockStatus(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Manage Inquiries</NavLinks>
            </NavItem>
          </NavMenu>

        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
