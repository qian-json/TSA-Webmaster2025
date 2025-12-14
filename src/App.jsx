import {Outlet, Link, NavLink} from "react-router-dom";
import styled from "styled-components";
import logo from "/public/logo.png";
import "./App.css";

const Footer = styled.footer`
  margin-top: auto;
  padding: 16px 0;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #ddd;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.2rem;
  width: 100%;
  text-align: center;
  padding: 2.4rem 0.6rem;
  text-decoration: none;
  color: #f2f2f2;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid #b6b6b6;
    color: #b6b6b6;
  }

  &.active {
    border-bottom: 2px solid #b8b8b8;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function App() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <LogoLink to="/">
            <img className="logo" src={logo} alt="Katy Texas" />
          </LogoLink>
          <ul className="nav-links">
            <StyledNavLink to="/resources">Resources</StyledNavLink>
            <StyledNavLink to="/references">Reference Page</StyledNavLink>
            <StyledNavLink to="/contact">Contact</StyledNavLink>
          </ul>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <Footer>
        © {new Date().getFullYear()} Jason Qian, Agasthya Tatti, Taeyun Kim,
        Farzaan Siddiqui, Vivan Rajesh Kanna, Aadi Jain. All rights reserved.
      </Footer>
    </>
  );
}
