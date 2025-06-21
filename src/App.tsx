import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import "./styles/main.scss";
// import OtpPage from "./pages/OTPPage/OTPPage";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/verify-otp" element={<OtpPage />} /> */}
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/verified-users" element={<VerifiedUsers />} /> */}
        {/* <Route path="/special-shop" element={<SpecialShop />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
