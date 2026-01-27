import { NavLink, Outlet } from "react-router-dom";
import "./SharedLayout.css";

export default function SharedLayout() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>
        <NavLink to="/search" className="nav-item">
          Find plant
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
}
