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
  const [location, setLocation] = useState('')
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

  const handleAddVehicleDetails = (e) => {
    e.preventDefault()
    const id = state.userData.userId;
    navigate(`/addvehicledetails/${id}`);
  }

  const handleUpdatePersonalDetails = (e) => {
    e.preventDefault()
    const id = state.userData.userId;
    navigate(`/updatepersonaldetails/${id}`);
  }

  const handleTrackingDetails = (e) => {
    e.preventDefault()
    const id = state.userData.userId;
    navigate(`/order-tracking/${id}`);
  }

  const handleFeedback =(e)=>{
    e.preventDefault()
    const id =state.userData.userId;
    navigate(`/manage-feedback/${id}`)
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
            <NavItem>
              <NavSearch>
                <input type="text" placeholder="Search..." />
                <FaSearch />
              </NavSearch>
            </NavItem>
            <NavItem>
              <NavLinks onClick={event => handleAddVehicleDetails(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Add Vehicle Details</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={event => handleUpdatePersonalDetails(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Update Personal Details</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={event => handleTrackingDetails(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Track Order Details</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={event => handleFeedback(event)} smooth={true} duration={500} spy={true} exact='true' offset={-80} >Add Feedback</NavLinks>
            </NavItem>
            <NavItem>
              <FaMapMarkerAlt />
              <NavLinks to="/location-details">{location}</NavLinks>
            </NavItem>
          </NavMenu>

        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
