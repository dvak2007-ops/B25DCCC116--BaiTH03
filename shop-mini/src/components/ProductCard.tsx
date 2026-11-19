import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </Link>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <div className="product-actions">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline btn-sm"
          >
            Chi tiết
          </Link>
          <button
            type="button"
            onClick={() => dispatch(addToCart(product))}
            className="btn btn-primary btn-sm"
          >
            + Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}