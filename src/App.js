import './App.css';
import './styling/navbar.css';
import './styling/login.css';
import './styling/saveExe.css';
import './styling/searchbar.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/newLogin.js';
import useToken from './components/useToken.js';
import DashBoard from './components/dashboard.js';
import TrendingPage from './components/trending.js';
import NavBar from './components/navbar.js';

function App() {
  /*
  const { token, setToken } = useToken();

  if(!token) {
    return <LoginPage setToken={setToken} />
  }
  */

  return (
    <div className="login">
      <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path='/' element={<DashBoard/>}/>
      <Route path='/CypherSoldier/Trending' element={<TrendingPage/>}/>
      </Routes>
      </BrowserRouter>
      </div>
  );
};

export default App;

/* 
<div className="login">
      <BrowserRouter>
      <Routes>
      <Route path='/CypherSoldier/Fitness-Workout-app' element={<DashBoard/>}/>
      </Routes>
      </BrowserRouter>
</div>
*/