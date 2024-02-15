import './App.css';
import './navbar.css';
import './login.css';
import './saveExe.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login.js';
import useToken from './components/useToken.js';
import DashBoard from './components/dashboard.js';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <LoginPage setToken={setToken} />
  }

  return (
    <div className="login">
      <BrowserRouter>
      <Routes>
      <Route path='/CypherSoldier/Fitness-Workout-app' element={<DashBoard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    /*<div>
      <NavBar />
    </div>*/
  );
};

export default App;

// only up to 7 days can be added, id="day1" is there by default, user can add more days and delete
/*function Days() {
  return (
    <div className="days">
      <div id="day1"></div>
      <div>
        <button id="add"></button>
        <button id="delete"></button>
      </div>
    </div>
  );
}*/