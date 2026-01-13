import DropDown from './dropdown';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import dumbbell from '../assets/dumbbell.svg';
import { Link } from "react-router-dom";

function NavBar() {
  // https://www.svgrepo.com/show/475044/dumbbell.svg
  const [user] = useAuthState(auth);
    return (
        <div className="nav-bar">
          <div className="nav-content">
            <div className="nav-left">
              <div className="logo">
              <img className="icon" src={dumbbell} alt='logo'></img>
              </div>
            </div>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/CypherSoldier/Trending">Trending</Link></li>
              <li><Link to="/CypherSoldier/Analytics">Analytics</Link></li>
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