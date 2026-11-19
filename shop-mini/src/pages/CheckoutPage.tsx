import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
} from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  const handleOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearCart());
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="status-box success-box">
        <h2>🎉 Đặt hàng thành công!</h2>
        <p>
          Cảm ơn <strong>{user?.username}</strong> đã mua sắm tại ShopMini.
          Giỏ hàng của bạn đã được làm trống.
        </p>
        <Link to="/" className="btn btn-primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="status-box">
        <h2>Không có sản phẩm để thanh toán</h2>
        <Link to="/" className="btn btn-primary">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <section className="checkout-grid">
      <div className="checkout-card">
        <h1>Thông tin giao hàng</h1>
        <form onSubmit={handleOrder} className="form-stack">
          <div className="form-group">
            <label htmlFor="customerName">Người nhận</label>
            <input
              id="customerName"
              type="text"
              value={user?.username ?? ''}
              disabled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0912345678"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ nhận hàng</label>
            <input
              id="address"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố"
              className="form-input"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Đặt hàng
          </button>
        </form>
      </div>

      <div className="checkout-card">
        <h2>Đơn hàng ({totalQuantity} sản phẩm)</h2>
        <ul className="checkout-list">
          {cartItems.map((item) => (
            <li key={item.id} className="checkout-item">
              <span>
                {item.title} × {item.quantity}
              </span>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          <span>Tổng thanh toán:</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
      </div>
    </section>
  );
}