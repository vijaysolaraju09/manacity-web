import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../api/auth';
import { setUser } from '../../store/slices/userSlice';
import type { AppDispatch } from '../../store';
import './LoginPage.scss';
import logo from '../../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({ phone: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(form);
      dispatch(setUser(user));
      navigate('/profile');
    } catch (err) {
      /* eslint no-console: off */
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="form-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <img src={logo} alt="Manacity Logo" className="logo" />

        <h2>Login to Your Account</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Login
          </motion.button>
        </form>

        <div className="links">
          <span onClick={() => navigate('/signup')}>Create Account</span>
          <span onClick={() => navigate('/reset-password')}>Forgot Password?</span>
        </div>

        <div className="back" onClick={() => navigate('/')}>
          ← Back to Landing
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
