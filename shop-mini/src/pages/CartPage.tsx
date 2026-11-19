import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
  updateQuantity,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  if (cartItems.length === 0) {
    return (
      <div className="status-box">
        <h2>Giỏ hàng của bạn đang trống</h2>
        <p>Hãy chọn thêm sản phẩm từ cửa hàng nhé.</p>
        <Link to="/" className="btn btn-primary">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <section>
      <div className="cart-header">
        <h1>Giỏ hàng ({totalQuantity} sản phẩm)</h1>
        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="btn btn-danger btn-sm"
        >
          Xoá toàn bộ giỏ
        </button>
      </div>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />

            <div className="cart-item-info">
              <Link to={`/products/${item.id}`} className="cart-item-title">
                {item.title}
              </Link>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-controls">
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                  )
                }
                className="btn btn-outline btn-sm"
              >
                -
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                  )
                }
                className="btn btn-outline btn-sm"
              >
                +
              </button>
            </div>

            <div className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              type="button"
              onClick={() => dispatch(removeFromCart(item.id))}
              className="btn btn-danger btn-sm"
            >
              Xoá
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>
          Tổng số lượng: <strong>{totalQuantity}</strong>
        </p>
        <p className="total-price">
          Tổng tiền: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
        <Link to="/checkout" className="btn btn-primary">
          Tiến hành thanh toán
        </Link>
      </div>
    </section>
  );
}