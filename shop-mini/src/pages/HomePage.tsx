import { useEffect, useState, type ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <section>
      <div className="home-toolbar">
        <h1>Danh sách sản phẩm</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm sản phẩm theo tên..."
          className="search-input"
        />
      </div>

      {status === 'loading' && (
        <div className="status-box">Đang tải danh sách sản phẩm...</div>
      )}

      {status === 'failed' && (
        <div className="status-box error">
          <p>Lỗi tải dữ liệu: {error}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchProducts())}
            className="btn btn-primary"
          >
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="status-box">
              Không tìm thấy sản phẩm phù hợp với từ khóa "{searchTerm}".
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}