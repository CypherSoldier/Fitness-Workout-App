import './App.css';
import './styles/navbar.css';
import './styles/login.css';
import './styles/saveExe.css';
import './styles/searchbar.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/newLogin.js';
import useToken from './components/useToken.js';
import Body from './components/dashboard.js';
import TrendingPage from './components/trending.js';
import ModernSidebar from './components/sidebar.js';
import Layout from './components/layout.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from './components/config.js';

function App() {
  // const { token, setToken } = useToken();

  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <div className="login">
        {!user ? (
          <LoginPage />
        ) : (           
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Body/>}/>
              <Route path='/CypherSoldier/Trending' element={<TrendingPage/>}/>
              <Route path='/CypherSoldier/Analytics' element={<ModernSidebar/>}/>
            </Route>
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;