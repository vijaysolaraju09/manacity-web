import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Shops.scss";

interface Shop {
  _id: string;
  name: string;
  category: string;
  location: string;
  image?: string;
}

const Shops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/shops").then((res) => setShops(res.data));
  }, []);

  const filteredShops = shops.filter((shop) => {
    return (
      (!category || shop.category === category) &&
      (!location || shop.location === location) &&
      (!search || shop.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="shops">
      <h2>Explore Shops</h2>

      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Fashion">Fashion</option>
          <option value="Grocery">Grocery</option>
        </select>

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Town Center">Town Center</option>
          <option value="West End">West End</option>
          <option value="East Side">East Side</option>
        </select>

        <input
          type="text"
          placeholder="Search shops..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="shop-list">
        {filteredShops.map((shop) => (
          <div
            key={shop._id}
            className="shop-card"
            onClick={() => navigate(`/shops/${shop._id}`)}
          >
            <img
              src={shop.image || "https://via.placeholder.com/150"}
              alt={shop.name}
            />
            <h3>{shop.name}</h3>
            <p>{shop.category}</p>
            <p>{shop.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shops;
