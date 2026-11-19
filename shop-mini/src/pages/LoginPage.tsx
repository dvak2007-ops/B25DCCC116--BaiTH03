import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const fromPath = state?.from?.pathname || '/';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg('Vui lòng nhập tên đăng nhập.');
      return;
    }

    const isSuccess = login(username, password);
    if (isSuccess) {
      navigate(fromPath, { replace: true });
    } else {
      setErrorMsg('Mật khẩu không chính xác! (Gợi ý: 123456)');
    }
  };

  return (
    <section className="auth-card">
      <h1>Đăng nhập</h1>
      <p className="auth-hint">Nhập tên bất kỳ và mật khẩu là 123456</p>

      <form onSubmit={handleSubmit} className="form-stack">
        <div className="form-group">
          <label htmlFor="username">Tên người dùng</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ví dụ: quocviet"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            className="form-input"
          />
        </div>

        {errorMsg && <p className="form-error">{errorMsg}</p>}

        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
    </section>
  );
}