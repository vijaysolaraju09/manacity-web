import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { sampleSpecialProducts } from "../../data/sampleHomeData";
import Shimmer from "../../components/Shimmer";
import "./SpecialShop.scss";

interface Product {
  _id: string;
  name: string;
  image?: string;
}

const SpecialShop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/special-products")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts(sampleSpecialProducts);
        }
      })
      .catch(() => setProducts(sampleSpecialProducts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="special-shop">
      <h2>Special Shop</h2>
      <div className="product-list">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="product-card">
                <Shimmer className="rounded" style={{ height: 120 }} />
                <Shimmer style={{ height: 16, marginTop: 8, width: "60%" }} />
              </div>
            ))
          : products.map((product) => (
              <div
                key={product._id}
                className="product-card"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SpecialShop;
