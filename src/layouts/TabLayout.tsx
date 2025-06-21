import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  AiFillHome,
  AiOutlineShop,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineGift,
} from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import "../TabLayout.scss";

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
    { name: "Special", icon: <AiOutlineGift />, path: "/special-shop" },
    { name: "Profile", icon: <AiOutlineUser />, path: "/profile" },
  ];

  useEffect(() => {
    if (location.pathname === "/") navigate("/home");
  }, [location.pathname]);

  return (
    <div className="tab-layout">
      <main className="tab-content">
        <Outlet />
      </main>

      {/* Floating Cart */}
      {cartItems.length > 0 && (
        <button className="floating-cart" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          <span className="count">{cartItems.length}</span>
        </button>
      )}

      <nav className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={location.pathname === tab.path ? "active" : ""}
            onClick={() => navigate(tab.path)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabLayout;
