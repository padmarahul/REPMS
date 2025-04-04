import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const NavSearch = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 25px;
  padding: 5px 10px;
  transition: all 0.3s ease-in-out;

  input {
    border: none;
    background: transparent;
    color: #fff;
    padding: 5px;
    font-size: 16px;
    outline: none;
    width: 0;
    transition: width 0.3s ease-in-out;

    &::placeholder {
      color: #ddd;
    }

    &:focus {
      width: 200px;  /* Adjust the width as needed */
    }
  }

  svg {
    color: #fff;
    cursor: pointer;
  }
  `;
export const Nav = styled.nav`
  background: ${({ scrollNav }) => (scrollNav ? 'rgba(0, 0, 0, 0.85)' : '#000')};
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0ms .8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1500px;
`;

export const NavLogo = styled(LinkR)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  img {
    height: 50px;

    @media screen and (max-width: 768px) {
      height: 43px;
    }
    @media screen and (max-width: 480px) {
      height: 33px;
    }
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: -10px;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: center;
  list-style: none;
  text-align: center;
  margin: 0 5% 0 -4%;
  /* margin-right: -22px; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  display: flex;
  align-items: center;
`;

export const NavLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover{
    color: #0176B6;
  }

  &.active {
    border-bottom: 3px solid #01bf71;
    color: #fff;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #0176B6;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
