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
import DashboardServices from "../../services/DashboardServices";
import EmployeeServices from "../../services/EmployeeServices";
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

  const findEmployeeByUserName = () => {
    EmployeeServices.findEmployeeByUserName(state.userData.userName).then(response => {
      const empresp = response.data.employee_type
      setType(empresp);
    }).catch(error => {
      console.log(error)
    })
  }


  useEffect(() => {
    findEmployeeByUserName();
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

  const handleStockStatus =(e) => {
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
              Part Pro
            </h1>
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            {
              type === 'store_owner' && (
                <NavItem>
                  <NavLinks onClick={event => handleProducts(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Manage Products</NavLinks>
                </NavItem>
              )
            }
            <NavItem>
              <NavLinks onClick={event => handleInventory(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Manage Inventory</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={event => handleStockStatus(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Update Inventory By Stock Status</NavLinks>
            </NavItem>
            {
              type === 'store_owner' && (
                <NavItem>
                  <NavLinks onClick={event => handleSales(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Manage Online Sales</NavLinks>
                </NavItem>)
            }

          </NavMenu>

        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
