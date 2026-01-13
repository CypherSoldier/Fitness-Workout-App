import './App.css';
import './styles/navbar.css';
import './styles/login.css';
import './styles/saveExe.css';
import './styles/searchbar.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login_page';
//import useToken from './components/useToken';
import Body from './pages/dashboard.js';
import TrendingPage from './pages/trending';
import ModernSidebar from './components/sidebar';
import Layout from './components/layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './components/firebase';

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