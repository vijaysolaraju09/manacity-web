import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { sampleSpecialProducts } from "../../data/sampleHomeData";
import "./SpecialShop.scss";
import fallbackImage from "../../assets/no-image.svg";

interface Product {
  _id: string;
  name: string;
  image?: string;
}

const SpecialShop = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
      .catch(() => setProducts(sampleSpecialProducts));
  }, []);

  return (
    <div className="special-shop">
      <h2>Special Shop</h2>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={product.image || "https://via.placeholder.com/200"}
              alt={product.name}
              onError={(e) => (e.currentTarget.src = fallbackImage)}
            />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialShop;
