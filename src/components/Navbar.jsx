import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setMenuOpen(false);

      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${showNavbar ? "navbar-visible" : "navbar-hidden"}`}>
      <Link to="/" className="navbar-logo">
        SecondDesk
      </Link>

      <div className={`navbar-links ${menuOpen ? "menu-open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Browse
        </Link>

        <Link to="/saved" onClick={() => setMenuOpen(false)}>
          Saved
        </Link>

        <Link to="/sell" onClick={() => setMenuOpen(false)}>
          Sell Item
        </Link>

        <Link to="/notes" onClick={() => setMenuOpen(false)}>
          Notes
        </Link>
      </div>

      <Link
        to="/cart"
        className="cart-link"
        aria-label="Shopping cart"
      >
        <FiShoppingCart />
      </Link>

      <button
        className={`menu-toggle ${menuOpen ? "menu-open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </nav>
  );
}

export default Navbar;