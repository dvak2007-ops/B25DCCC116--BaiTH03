import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="status-box">
      <h1>404 - Không tìm thấy trang</h1>
      <p>Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.</p>
      <Link to="/" className="btn btn-primary">
        Về trang chủ
      </Link>
    </div>
  );
}