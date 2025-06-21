import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './OtpPage.scss';

const OtpPage = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const navigate = useNavigate();
  const location = useLocation();
  const phone = (location.state as { phone?: string })?.phone || '';

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);

      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (value && nextInput) nextInput.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 4) {
      // TODO: Send OTP to server for verification
      navigate('/profile'); // Example: Redirect to profile after verification
    }
  };

  const resendOtp = () => {
    // TODO: Resend OTP to the phone number
    alert(`OTP resent to ${phone}`);
  };

  return (
    <div className="otp-page">
      <motion.div
        className="form-box"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Verify OTP</h2>
        <p>Enter the 4-digit code sent to <strong>{phone}</strong></p>

        <div className="otp-inputs">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          ))}
        </div>

        <motion.button
          className="verify-btn"
          onClick={handleVerify}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Verify
        </motion.button>

        <div className="resend" onClick={resendOtp}>
          Resend OTP
        </div>

        <div className="back" onClick={() => navigate('/signup')}>
          ← Back to Signup
        </div>
      </motion.div>
    </div>
  );
};

export default OtpPage;
