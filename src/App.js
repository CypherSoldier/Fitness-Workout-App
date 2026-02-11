import './App.css';
import './styles/navbar.css';
import './styles/login.css';
import './styles/saveExe.css';
import './styles/searchbar.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login_page';
//import useToken from './components/useToken';
import Body from './pages/dashboard.js';
import TrendingPage from './pages/trending';
import ModernSidebar from './components/sidebar';
import Layout from './components/layout';
import ProfilePage from './pages/profile'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './components/firebase';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
<BrowserRouter>
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<LoginPage />} />
    
    {/* Protected routes – only show when logged in */}
    <Route 
      element={
        loading ? <div>Loading...</div> : user ? <Layout /> : <Navigate to="/" replace />
      }
    >
      <Route path="/" element={<Body />} />
      <Route path="/CypherSoldier/Trending" element={<TrendingPage />} />
      <Route path="/CypherSoldier/Analytics" element={<ModernSidebar />} />
      <Route path="/CypherSoldier/Profile" element={<ProfilePage />} />
      
      {/* Catch-all redirect for logged-in users */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
</BrowserRouter>
  );
}

export default App;