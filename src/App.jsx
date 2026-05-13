import {Outlet, Link, NavLink} from "react-router-dom";
import styled from "styled-components";
import logo from "/favicon.png";
import "./App.css";

const Footer = styled.footer`
  margin-top: 3rem;
  padding: 1.5rem 2rem;
  border-top: 3px solid #591506;
  background-color: #ffffff;
  color: #555;
  font-size: 0.9rem;
`;

const FooterRow = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const FooterCol = styled.div``;

const FooterTitle = styled.h4`
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
  line-height: 1.45;
  margin-bottom: 0.25rem;
`;

const FooterLink = styled(Link)`
  display: block;
  color: #555;
  text-decoration: none;
  margin-bottom: 0.3rem;

  &:hover {
    color: #591506;
    text-decoration: underline;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.05rem;
  text-align: center;
  padding: 0 0.9rem;
  text-decoration: none;
  color: #f2f2f2;
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3f0e04;
    color: #ffffff;
  }

  &.active {
    color: #ffffff;
    border-bottom: 2px solid #ffffff;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

const Wordmark = styled.span`
  color: #f2f2f2;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.01em;
`;

const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: 0;
  background-color: #591506;
  color: #ffffff;
  padding: 0.6rem 1rem;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  z-index: 2000;

  &:focus {
    left: 0;
  }
`;

export default function App() {
  return (
    <>
      <SkipLink href="#main">Skip to main content</SkipLink>
      <nav className="navbar">
        <div className="nav-content">
          <LogoLink to="/">
            <img className="logo" src={logo} alt="Katy Resource Hub home" />
            <Wordmark>Katy Resource Hub</Wordmark>
          </LogoLink>
          <ul className="nav-links">
            <StyledNavLink to="/resources">Catalog</StyledNavLink>
            <StyledNavLink to="/map">Map</StyledNavLink>
            <StyledNavLink to="/references">Reference Page</StyledNavLink>
            <StyledNavLink to="/contact">Contribute</StyledNavLink>
          </ul>
        </div>
      </nav>

      <main id="main">
        <Outlet />
      </main>

      <Footer>
        <FooterRow>
          <FooterCol>
            <FooterTitle>Katy Resource Hub</FooterTitle>
            <FooterText>Find what Katy has to offer.</FooterText>
          </FooterCol>
          <FooterCol>
            <FooterTitle>Explore</FooterTitle>
            <FooterLink to="/resources">Catalog</FooterLink>
            <FooterLink to="/map">Map</FooterLink>
            <FooterLink to="/references">Reference Page</FooterLink>
            <FooterLink to="/contact">Contribute</FooterLink>
          </FooterCol>
          <FooterCol>
            <FooterTitle>About</FooterTitle>
            <FooterText>Built for TSA Webmaster 2025-2026.</FooterText>
            <FooterText>
              © {new Date().getFullYear()} JQ. All rights reserved.
            </FooterText>
          </FooterCol>
        </FooterRow>
      </Footer>
    </>
  );
}
