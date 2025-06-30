import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  AiFillHome,
  AiOutlineShop,
  AiOutlineUsergroupAdd,
  AiOutlineGift,
  AiOutlineCalendar,
  AiOutlineUser,
} from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import "./TabLayout.scss";

const TabLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const tabs = [
    { name: "Home", icon: <AiFillHome />, path: "/home" },
    { name: "Shops", icon: <AiOutlineShop />, path: "/shops" },
    {
      name: "Verified",
      icon: <AiOutlineUsergroupAdd />,
      path: "/verified-users",
    },
    { name: "Events", icon: <AiOutlineCalendar />, path: "/events" },
    { name: "Special", icon: <AiOutlineGift />, path: "/special-shop" },
  ];

  useEffect(() => {
    if (location.pathname === "/") navigate("/home");
  }, [location.pathname]);

  return (
    <div className="tab-layout">
      <motion.header
        className="top-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="logo" onClick={() => navigate('/home')}>Manacity</h1>
        <button
          className="profile-btn"
          onClick={() => navigate('/profile')}
        >
          <AiOutlineUser />
        </button>
      </motion.header>
      <main className="tab-content">
        <Outlet />
      </main>

      {/* Floating Cart */}
      {cartItems.length > 0 && (
        <motion.button
          className="floating-cart"
          onClick={() => navigate("/cart")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaShoppingCart />
          <span className="count">{cartItems.length}</span>
        </motion.button>
      )}

      <motion.nav
        className="tab-bar"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="desktop-extras">
          <h1 className="sidebar-logo" onClick={() => navigate('/home')}>
            Manacity
          </h1>
          {cartItems.length > 0 && (
            <button
              className="sidebar-cart"
              onClick={() => navigate('/cart')}
            >
              <FaShoppingCart />
              <span className="count">{cartItems.length}</span>
            </button>
          )}
          <button
            className="sidebar-profile"
            onClick={() => navigate('/profile')}
          >
            <AiOutlineUser />
          </button>
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={location.pathname === tab.path ? 'active' : ''}
            onClick={() => navigate(tab.path)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </motion.nav>
    </div>
  );
};

export default TabLayout;
