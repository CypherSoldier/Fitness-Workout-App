import DropDown from './dropdown.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config.js';
import { Link } from "react-router-dom";

function NavBar() {
  const [user] = useAuthState(auth);
    return (
        <div className="nav-bar">
          <div className="nav-content">
            <div className="nav-left">
              <div className="logo">
              <img className="icon" src="https://www.svgrepo.com/show/475044/dumbbell.svg" alt='logo'></img>
              </div>
            </div>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/CypherSoldier/Trending">Trending</Link></li>
            </ul>
            <div className="nav-right">
              <div className="profile-menu">
                <DropDown user={user}/>
              </div>
            </div>
          </div>
        </div>
    );
  }

export default NavBar;