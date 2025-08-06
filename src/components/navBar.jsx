import { Link } from "react-router-dom";
import "../navBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/draw" className="nav-link">
          Drawing Page
        </Link>
        <Link to = "/favourites" className = "nav-link">
          Favourites
        </Link>
      </div>
    </nav>
  );
}
export default NavBar;
