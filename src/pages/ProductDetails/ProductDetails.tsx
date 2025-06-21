import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/client";
import "../ProductDetails.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

interface Product {
  _id: string;
  name: string;
  image?: string;
  price: number;
  description: string;
  category: string;
  shopName?: string;
  discount?: number;
}

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="product-details">Loading...</div>;

  return (
    <div className="product-details">
      <img
        src={
          product.image || "https://via.placeholder.com/600x300?text=Product"
        }
        alt={product.name}
        className="product-img"
      />

      <div className="info">
        <h1>{product.name}</h1>
        <p className="meta">
          {product.category} {product.shopName ? `• ${product.shopName}` : ""}
        </p>

        <p className="price">
          ₹{product.price}
          {product.discount && (
            <span className="discount"> -{product.discount}%</span>
          )}
        </p>

        <p className="desc">{product.description}</p>

        <button
          className="add-cart-btn"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
