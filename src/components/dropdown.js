import { auth } from './config.js';
//import { useAuthState } from 'react-firebase-hooks/auth';

function DropDown({ user }) {
  //const [user] = useAuthState(auth);
  const handleLogout = () => {
    auth.signOut();
  };

  return (
      <div className="dropdown">
      <button className="profile-btn" type="button" aria-expanded="false">
      <img src={user.photoURL} alt='logo'></img>
      </button>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="!#">My Profile</a>
        <a className="dropdown-item" href="!#" onClick={handleLogout}>Log Out</a>
      </div>
      </div>
    );
  }

export default DropDown;