import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import BrandDetail from './pages/BrandDetail';
import VerifyIdentity from './pages/VerifyIdentity';
import VerifyCode from './pages/VerifyCode';
import Verified from './pages/Verified';
import Onboarding from './pages/Onboarding';
import AddPhone from './pages/AddPhone';
import BrandAdmin from './pages/BrandAdmin';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/claim/:slug" element={<BrandDetail />} />
            <Route path="/verify/:slug" element={<VerifyIdentity />} />
            <Route path="/verify-code/:slug" element={<VerifyCode />} />
            <Route path="/verified/:slug" element={<Verified />} />
            <Route path="/onboarding/:slug" element={<Onboarding />} />
            <Route path="/onboarding-phone/:slug" element={<AddPhone />} />
            <Route path="/brand/:slug" element={<BrandAdmin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
} 