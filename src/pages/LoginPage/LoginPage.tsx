import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';
import logo from '../../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API login logic
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
            <input type="tel" placeholder="Enter your phone" required />
          </label>

          <label>
            Password
            <input type="password" placeholder="Enter your password" required />
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
