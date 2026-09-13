import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        SecondDesk
      </Link>

      <div className="navbar-links">
        <Link to="/">Browse</Link>
        <Link to="/saved">Saved</Link>
        <Link to="/sell">Sell Item</Link>
        <Link to="/notes">Notes</Link>
      </div>
    </nav>
  );
}

export default Navbar;