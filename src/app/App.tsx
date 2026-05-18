import { BrowserRouter, Routes, Route } from 'react-router';
import LandingPage from './pages/LandingPage';
import PrintFlowPoster from './components/poster/PrintFlowPoster';
import PrintFlowLogo from './components/poster/PrintFlowLogo';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/poster" element={<PrintFlowPoster />} />
        <Route path="/logo" element={<PrintFlowLogo />} />
        <Route path="/login" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002E2C] to-[#005550]"><div className="text-white text-2xl font-bold">Login Page - Coming Soon</div></div>} />
        <Route path="/signup" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002E2C] to-[#005550]"><div className="text-white text-2xl font-bold">Sign Up Page - Coming Soon</div></div>} />
      </Routes>
    </BrowserRouter>
  );
}