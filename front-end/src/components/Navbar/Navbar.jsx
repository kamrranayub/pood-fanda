import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from '../../context/StoreContext';
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { getCartItemCount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  const cartCount = getCartItemCount();

  return (
    <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Link to='/'><img src={assets.logo} alt="Pood Fanda" className="logo" /></Link>

      <ul className={`navbar-menu ${mobileOpen ? 'navbar-menu-open' : ''}`}>
        <Link to='/' onClick={() => { setMenu("home"); setMobileOpen(false) }} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu"); setMobileOpen(false) }} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#footer' onClick={() => { setMenu("contact"); setMobileOpen(false) }} className={menu === "contact" ? "active" : ""}>Contact Us</a>
        <a href='#app-download' onClick={() => { setMenu("mobile-app"); setMobileOpen(false) }} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="Cart" /></Link>
          {cartCount > 0 && <div className="dot"><span>{cartCount}</span></div>}
        </div>

        {!token
          ? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" />My Orders</li>
                <hr />
                <li onClick={logOut}><img src={assets.logout_icon} alt="" />Logout</li>
              </ul>
            </div>
        }

        <div className="navbar-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
