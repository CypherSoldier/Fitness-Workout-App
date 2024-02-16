import './App.css';
import './navbar.css';
import './login.css';
import './saveExe.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login.js';
import useToken from './components/useToken.js';
import DashBoard from './components/dashboard.js';

function App() {
  /*
  const { token, setToken } = useToken();

  if(!token) {
    return <LoginPage setToken={setToken} />
  }
  */

  return (
    <div>
      <DashBoard />
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