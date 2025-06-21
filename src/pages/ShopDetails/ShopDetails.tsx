import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import "../ShopDetails.scss";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

interface Shop {
  _id: string;
  name: string;
  category: string;
  location: string;
  address: string;
  image?: string;
  products: Product[];
}

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {
    axios.get(`/api/shops/${id}`).then((res) => setShop(res.data));
  }, [id]);

  if (!shop) return <div className="shop-details">Loading...</div>;

  return (
    <div className="shop-details">
      <div className="header">
        <img
          src={shop.image || "https://via.placeholder.com/500x250"}
          alt={shop.name}
        />
        <div className="info">
          <h2>{shop.name}</h2>
          <p>{shop.category}</p>
          <p>{shop.location}</p>
          <p>{shop.address}</p>
        </div>
      </div>

      <h3 className="section-title">Products</h3>
      <div className="product-list">
        {shop.products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image || "https://via.placeholder.com/200"}
              alt={product.name}
            />
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopDetails;
