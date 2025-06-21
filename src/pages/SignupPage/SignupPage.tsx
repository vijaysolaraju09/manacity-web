import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SignupPage.scss';
import logo from '../../assets/logo.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ Normally send signup data to backend here
    // 🚀 Redirect to OTP verification screen
    navigate('/verify-otp', { state: { phone: form.phone } });
  };

  return (
    <div className="signup-page">
      <motion.div
        className="form-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <img src={logo} alt="Manacity Logo" className="logo" />
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" required value={form.name} onChange={handleChange} />
          </label>

          <label>
            Phone Number
            <input type="tel" name="phone" required value={form.phone} onChange={handleChange} />
          </label>

          <label>
            Password
            <input type="password" name="password" required value={form.password} onChange={handleChange} />
          </label>

          <label>
            Location
            <select name="location" required value={form.location} onChange={handleChange}>
              <option value="">Select Area</option>
              <option value="Town Center">Town Center</option>
              <option value="Main Road">Main Road</option>
              <option value="North Market">North Market</option>
              <option value="Old Street">Old Street</option>
            </select>
          </label>

          <motion.button
            type="submit"
            className="signup-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Continue
          </motion.button>
        </form>

        <div className="links">
          <span onClick={() => navigate('/login')}>Already have an account?</span>
        </div>
        <div className="back" onClick={() => navigate('/')}>
          ← Back to Landing
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
