import { auth } from './firebase.js';

function DropDown({ user }) {

  const handleLogout = () => {
    auth.signOut();
  };

  console.log(user?.displayName)
  
  return (
      <div className="dropdown">
      <button className="profile-btn" type="button" aria-expanded="false">
      <img src={user?.photoURL} alt="profile" referrerPolicy="no-referrer" />
      </button>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="!#">My Profile</a>
        <a className="dropdown-item" href="!#" onClick={handleLogout}>Log Out</a>
      </div>
      </div>
    );
  }

export default DropDown;