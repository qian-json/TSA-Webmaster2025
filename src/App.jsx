import { Outlet, Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="logo">Katy Texas</h1>
          <ul className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}