import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const productId = Number(id);
  const product = items.find((item) => item.id === productId);

  if (status === 'loading') {
    return <div className="status-box">Đang tải thông tin sản phẩm...</div>;
  }

  if (status === 'failed') {
    return <div className="status-box error">Lỗi: {error}</div>;
  }

  if (!product) {
    return (
      <div className="status-box">
        <h2>Không tìm thấy sản phẩm</h2>
        <Link to="/" className="btn btn-primary">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <section className="detail-card">
      <div className="detail-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="detail-image"
        />
      </div>

      <div className="detail-info">
        <span className="product-category">{product.category}</span>
        <h1 className="detail-title">{product.title}</h1>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <p className="detail-desc">{product.description}</p>

        <div className="detail-actions">
          <button
            type="button"
            onClick={() => dispatch(addToCart(product))}
            className="btn btn-primary"
          >
            Thêm vào giỏ hàng
          </button>
          <Link to="/cart" className="btn btn-outline">
            Đi tới giỏ hàng
          </Link>
          <Link to="/" className="btn btn-outline">
            ← Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </section>
  );
}