import './App.css';
import NavBar from './components/navbar.js'
import Days from './components/days.js'
import DropDown from './components/dropdown.js';
import LoginPage from './components/login.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//main header
function Body() {
  return (
    <div className='fitness'>
      <header id="colorChange" className='fitness-header'>
      <DropDown />
      <img className="icon" src="https://www.svgrepo.com/show/475044/dumbbell.svg" alt='logo'></img>
      <NavBar />
      </header>
      <Main />
    </div>
    /*<div>
      <LoginPage />
    </div>*/
  );
}

function Main() {
  return (
    <div className="main-board">
      <body className="days">
        <Days />
      </body>
    </div>
  );
}

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

export default Body;
